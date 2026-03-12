# 🛡️ AgentShield

AI Agent 技能/插件安全扫描器

在安装第三方 AI 技能之前，扫描数据窃取、后门、权限越界和供应链漏洞。

## 快速开始

```bash
npx @elliotllliu/agentshield scan ./my-skill/
```

## 检测能力

| 规则 | 级别 | 说明 |
|------|------|------|
| `data-exfil` | 🔴 严重 | 读取敏感文件 + 发送 HTTP 请求（数据外泄） |
| `backdoor` | 🔴 严重 | `eval()`、`exec()`、动态代码执行 |
| `reverse-shell` | 🔴 严重 | Socket 外连 + Shell 管道（反弹 Shell） |
| `crypto-mining` | 🔴 严重 | 挖矿池连接、已知挖矿程序 |
| `credential-hardcode` | 🔴 严重 | 硬编码 AWS Key、GitHub PAT、Stripe Key |
| `env-leak` | 🔴 严重 | 环境变量读取 + HTTP 外发 |
| `obfuscation` | 🔴 严重 | base64+eval 混淆、十六进制编码 |
| `typosquatting` | 🔴 严重 | npm 包名拼写仿冒（如 `1odash`） |
| `hidden-files` | 🔴 严重 | `.env` 文件包含明文密钥 |
| `network-ssrf` | 🟡 警告 | 用户可控 URL、SSRF、AWS 元数据端点 |
| `privilege` | 🟡 警告 | SKILL.md 声明权限 vs 代码实际行为不匹配 |
| `supply-chain` | 🟡 警告 | npm 依赖已知 CVE 漏洞 |
| `sensitive-read` | 🟡 警告 | 读取 SSH 密钥、AWS 凭证等 |
| `excessive-perms` | 🟡 警告 | 权限声明过多或过于危险 |
| `phone-home` | 🟡 警告 | 定时器 + HTTP 请求（心跳/信标模式） |

## 使用方法

```bash
# 扫描目录
npx @elliotllliu/agentshield scan ./path/to/skill/

# JSON 输出（适用于 CI/CD）
npx @elliotllliu/agentshield scan ./skill/ --json

# CI 门禁：分数低于阈值则失败
npx @elliotllliu/agentshield scan ./skill/ --fail-under 70
```

## GitHub Actions 集成

```yaml
- uses: elliotllliu/agentshield@main
  with:
    path: './skills/'
    fail-under: '70'
```

## 安全评分

| 分数 | 风险等级 |
|------|----------|
| 90-100 | 低风险 ✅ |
| 70-89 | 中等风险 🟡 |
| 40-69 | 高风险 🟠 |
| 0-39 | 严重风险 🔴 |

## 许可证

MIT
