import * as vscode from "vscode";
import { execSync } from "child_process";
import { existsSync, mkdtempSync, writeFileSync, rmSync } from "fs";
import { join, dirname, basename } from "path";
import { tmpdir } from "os";

interface Finding {
  rule: string;
  severity: string;
  file: string;
  line?: number;
  message: string;
  evidence?: string;
  possibleFalsePositive?: boolean;
}

interface ScanResult {
  target: string;
  filesScanned: number;
  linesScanned: number;
  findings: Finding[];
  score: number;
  duration: number;
}

let diagnosticCollection: vscode.DiagnosticCollection;
let statusBarItem: vscode.StatusBarItem;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  diagnosticCollection = vscode.languages.createDiagnosticCollection("agentShield");
  outputChannel = vscode.window.createOutputChannel("AgentShield");

  // Status bar
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.command = "agentShield.scanWorkspace";
  statusBarItem.text = "🛡️ AgentShield";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand("agentShield.scanFile", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) scanFile(editor.document);
    }),
    vscode.commands.registerCommand("agentShield.scanWorkspace", scanWorkspace)
  );

  // Auto-scan on save
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      const config = vscode.workspace.getConfiguration("agentShield");
      if (config.get<boolean>("autoScan", true)) {
        scanFile(doc);
      }
    })
  );

  // Scan open file on activation
  if (vscode.window.activeTextEditor) {
    scanFile(vscode.window.activeTextEditor.document);
  }

  context.subscriptions.push(diagnosticCollection, outputChannel);
}

function scanFile(document: vscode.TextDocument) {
  const filePath = document.uri.fsPath;
  const supportedExts = [".js", ".ts", ".py", ".sh", ".json", ".yaml", ".yml", ".md", ".go", ".rs"];
  const ext = "." + basename(filePath).split(".").pop()?.toLowerCase();

  if (!supportedExts.includes(ext)) return;

  // Create temp dir with just this file to scan
  const tempDir = mkdtempSync(join(tmpdir(), "as-vsc-"));
  try {
    const content = document.getText();
    const tempFile = join(tempDir, basename(filePath));
    writeFileSync(tempFile, content);

    const result = runScan(tempDir);
    if (result) {
      updateDiagnostics(document, result);
      updateStatusBar(result.score);
    }
  } catch (e: any) {
    outputChannel.appendLine(`Error scanning ${filePath}: ${e.message}`);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function scanWorkspace() {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    vscode.window.showWarningMessage("No workspace folder open");
    return;
  }

  const folder = folders[0]!.uri.fsPath;
  outputChannel.appendLine(`Scanning workspace: ${folder}`);

  vscode.window.withProgress(
    { location: vscode.ProgressLocation.Notification, title: "AgentShield: Scanning workspace..." },
    async () => {
      const result = runScan(folder);
      if (result) {
        updateStatusBar(result.score);
        outputChannel.appendLine(`Score: ${result.score}/100 | ${result.findings.length} findings`);

        // Show summary
        const high = result.findings.filter(f => f.severity === "high" && !f.possibleFalsePositive).length;
        const medium = result.findings.filter(f => f.severity === "medium" && !f.possibleFalsePositive).length;
        const msg = `AgentShield: Score ${result.score}/100 — ${high} high, ${medium} medium risk`;
        if (result.score >= 90) {
          vscode.window.showInformationMessage(msg);
        } else if (result.score >= 70) {
          vscode.window.showWarningMessage(msg);
        } else {
          vscode.window.showErrorMessage(msg);
        }
      }
    }
  );
}

function runScan(target: string): ScanResult | null {
  try {
    const output = execSync(`npx -y @elliotllliu/agent-shield scan "${target}" --json`, {
      stdio: "pipe",
      timeout: 60000,
    }).toString();
    return JSON.parse(output);
  } catch (e: any) {
    if (e.stdout) {
      try { return JSON.parse(e.stdout.toString()); } catch {}
    }
    outputChannel.appendLine(`Scan error: ${e.message}`);
    return null;
  }
}

function updateDiagnostics(document: vscode.TextDocument, result: ScanResult) {
  const diagnostics: vscode.Diagnostic[] = [];

  for (const finding of result.findings) {
    if (finding.possibleFalsePositive) continue;

    const line = Math.max(0, (finding.line || 1) - 1);
    const range = new vscode.Range(line, 0, line, document.lineAt(Math.min(line, document.lineCount - 1)).text.length);

    const severity = finding.severity === "high"
      ? vscode.DiagnosticSeverity.Error
      : finding.severity === "medium"
        ? vscode.DiagnosticSeverity.Warning
        : vscode.DiagnosticSeverity.Information;

    const diag = new vscode.Diagnostic(range, `[${finding.rule}] ${finding.message}`, severity);
    diag.source = "AgentShield";
    diagnostics.push(diag);
  }

  diagnosticCollection.set(document.uri, diagnostics);
}

function updateStatusBar(score: number) {
  const config = vscode.workspace.getConfiguration("agentShield");
  const threshold = config.get<number>("failUnder", 70);
  const icon = score >= 90 ? "✅" : score >= threshold ? "🟡" : "🔴";
  statusBarItem.text = `🛡️ ${icon} ${score}/100`;
  statusBarItem.tooltip = `AgentShield Security Score: ${score}/100\nClick to scan workspace`;
}

export function deactivate() {
  diagnosticCollection?.dispose();
  statusBarItem?.dispose();
  outputChannel?.dispose();
}
