# AgentShield Scoring System v2.0

## 设计原则

1. **分数要有意义** —— 不能动不动就 0 分或 100 分
2. **维度清晰** —— 用户看到分数知道扣在哪里
3. **同类问题递减** —— 第 1 个 eval() 扣 20 分，第 5 个不应该再扣 20
4. **有正向加分** —— 安全实践好的项目应该体现出来
5. **宁可漏报不要误报** —— 标记为可能误报的不扣分

---

## 评分架构

### 总分 = 基础分(100) - 扣分 + 加分，限制在 [5, 100]

最低 5 分而不是 0 分 —— 0 分意味着"完全没有扫描到任何代码"，5 分意味着"扫了但全是问题"。

---

## 一、扣分体系（五个维度）

### 维度 1：代码执行安全（权重最高）
后门、动态执行、命令注入等 —— 直接威胁到宿主系统

| 发现类型 | 首次扣分 | 同类递减 | 上限 |
|----------|----------|----------|------|
| eval()/exec() 动态输入 | -20 | ×0.5 | -35 |
| 命令注入 (os.system, child_process.exec) | -20 | ×0.5 | -35 |
| 反序列化漏洞 | -15 | ×0.5 | -25 |
| 反弹 Shell | -25 | ×0.5 | -40 |
| 加密货币挖矿 | -20 | ×0.5 | -30 |

**递减示例**：3 个 eval()
- 第 1 个: -20
- 第 2 个: -10 (×0.5)
- 第 3 个: -5 (×0.25)
- 总扣: -35 (达到上限)

### 维度 2：数据安全
数据泄露、凭证窃取、敏感文件读取

| 发现类型 | 首次扣分 | 同类递减 | 上限 |
|----------|----------|----------|------|
| 跨文件数据外泄路径 (读凭证→发HTTP) | -18 | ×0.5 | -30 |
| 硬编码凭证/密钥 | -10 | ×0.5 | -20 |
| 敏感文件读取 (SSH key, .env) | -12 | ×0.5 | -20 |
| 环境变量泄露 | -8 | ×0.5 | -15 |
| Phone-home 行为 (启动时回传数据) | -15 | ×0.5 | -25 |

### 维度 3：供应链安全
依赖安全、混淆、隐藏文件

| 发现类型 | 首次扣分 | 同类递减 | 上限 |
|----------|----------|----------|------|
| Typosquatting (仿冒包名) | -15 | ×0.5 | -25 |
| 代码混淆 | -10 | ×0.5 | -18 |
| 隐藏文件/目录 | -6 | ×0.5 | -12 |
| 可疑的 postinstall 脚本 | -12 | ×0.5 | -20 |

### 维度 4：提示注入 & 工具投毒
Agent 层面的攻击

| 发现类型 | 首次扣分 | 同类递减 | 上限 |
|----------|----------|----------|------|
| 描述-代码不一致 (Tool Poisoning) | -15 | ×0.5 | -25 |
| 提示注入模式 | -8 | ×0.6 | -18 |
| 工具影子覆盖 (Tool Shadowing) | -15 | ×0.5 | -25 |
| 过度权限请求 | -6 | ×0.6 | -12 |
| MCP manifest 异常 | -8 | ×0.5 | -15 |

### 维度 5：代码质量 & 弱安全
不直接构成攻击，但降低安全基线

| 发现类型 | 首次扣分 | 同类递减 | 上限 |
|----------|----------|----------|------|
| 弱加密算法 (MD5/DES) | -3 | ×0.5 | -6 |
| 不安全网络请求 (HTTP非HTTPS) | -3 | ×0.5 | -6 |
| 缺少输入验证 | -2 | ×0.5 | -5 |
| SSRF 风险 | -6 | ×0.5 | -12 |

---

## 二、加分体系（正向激励）

| 安全实践 | 加分 |
|----------|------|
| 有 SECURITY.md 文件 | +3 |
| 有 LICENSE 文件 | +2 |
| 使用 TypeScript（类型安全） | +2 |
| 无任何 high severity 发现 | +5 |
| 无任何网络外发请求 | +3 |
| 代码行数 < 500（攻击面小） | +2 |
| 文件数 < 10（结构简单） | +1 |

**加分上限**: +10（不能靠加分凑到高分）

---

## 三、等级定义

| 分数区间 | 等级 | 含义 | 颜色 |
|----------|------|------|------|
| 90-100 | A · Safe | 未发现安全问题，可以安心使用 | 🟢 |
| 75-89 | B · Caution | 存在低风险问题，建议关注 | 🟡 |
| 60-74 | C · Warning | 存在中等风险，使用前需要审查 | 🟠 |
| 40-59 | D · Danger | 存在较高风险，不建议在生产环境使用 | 🔴 |
| 5-39 | F · Critical | 存在严重安全威胁，强烈建议不要安装 | ⛔ |

---

## 四、维度雷达图

每个扫描结果输出五个维度的子分数（各 100 分制），用于雷达图展示：

```
代码执行安全: 85/100
数据安全:     92/100
供应链安全:   100/100
提示注入:     70/100
代码质量:     95/100
──────────────────
综合得分:     82/100 (B · Caution)
```

用户一看就知道：**代码执行还行，但提示注入这块有问题**。

---

## 五、评分计算伪代码

```typescript
function computeScoreV2(findings: Finding[]): ScoreResult {
  const dimensions = {
    codeExec:    { base: 100, deductions: [] },
    dataSafety:  { base: 100, deductions: [] },
    supplyChain: { base: 100, deductions: [] },
    promptInj:   { base: 100, deductions: [] },
    codeQuality: { base: 100, deductions: [] },
  };
  
  // 1. 按规则分类，归入对应维度
  for (const f of findings) {
    if (f.possibleFalsePositive) continue;
    const dim = getDimension(f.rule);
    const config = getDeductionConfig(f.rule);
    dim.deductions.push({ rule: f.rule, config });
  }
  
  // 2. 每个维度内，同类规则递减扣分
  for (const dim of Object.values(dimensions)) {
    const grouped = groupBy(dim.deductions, 'rule');
    for (const [rule, items] of grouped) {
      let totalDeduction = 0;
      let multiplier = 1;
      for (const item of items) {
        const deduct = item.config.firstPenalty * multiplier;
        totalDeduction += deduct;
        multiplier *= item.config.decayRate;
        if (totalDeduction >= item.config.cap) {
          totalDeduction = item.config.cap;
          break;
        }
      }
      dim.base -= totalDeduction;
    }
    dim.base = Math.max(0, dim.base);
  }
  
  // 3. 计算加分
  const bonus = computeBonus(projectMeta);
  
  // 4. 加权综合
  const weights = {
    codeExec:    0.30,  // 最重要
    dataSafety:  0.25,
    supplyChain: 0.15,
    promptInj:   0.20,
    codeQuality: 0.10,
  };
  
  let overall = 0;
  for (const [key, weight] of Object.entries(weights)) {
    overall += dimensions[key].base * weight;
  }
  overall = Math.min(100, Math.max(5, Math.round(overall + bonus)));
  
  return { overall, dimensions, bonus, grade: getGrade(overall) };
}
```

---

## 六、与 V1 的对比

| | V1 (现在) | V2 (新方案) |
|---|---|---|
| 扣分方式 | 固定扣分，无上限 | 递减扣分，有上限 |
| 维度 | 无 | 5 个维度 + 权重 |
| 最低分 | 0 | 5 |
| 加分 | 无 | 有（安全实践） |
| 同类问题 | 每个扣一样 | 递减（第 1 个最重） |
| 展示 | 单一数字 | 总分 + 维度雷达图 |
| 意义 | "这东西多危险" | "哪个方面有问题、严重到什么程度" |

---

## 七、实际效果预估

用 V2 重新算 Dify 493 插件：

| 等级 | 预估数量 | 占比 |
|------|----------|------|
| A (90-100) | ~350 | 71% |
| B (75-89) | ~80 | 16% |
| C (60-74) | ~45 | 9% |
| D (40-59) | ~12 | 2.4% |
| F (5-39) | ~6 | 1.2% |

分布更合理——不再是"要么满分要么零分"。
