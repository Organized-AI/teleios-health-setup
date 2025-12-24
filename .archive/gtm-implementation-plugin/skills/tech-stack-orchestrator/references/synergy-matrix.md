# Component Synergy Matrix

Reference for identifying components that work well together and those that conflict.

---

## Synergy Types

| Type | Score Boost | Description |
|------|-------------|-------------|
| **Enhanced** | +2 | Components amplify each other |
| **Compatible** | +1 | Work well together |
| **Neutral** | 0 | No interaction |
| **Redundant** | -1 | Overlapping functionality |
| **Conflicting** | -2 | May cause issues |

---

## High-Synergy Combinations

### Development Workflow Stack
```
agent:dev-team/code-reviewer + hook:git/smart-commit + command:git/commit
```
**Synergy:** Code review → Auto-staged changes → Conventional commits

### Context Management Stack
```
setting:statusline/context-monitor + agent:ai/context-manager + mcp:integration/memory
```
**Synergy:** Visual monitoring + Smart truncation + Persistent memory

### Testing Stack
```
agent:dev-tools/test-engineer + command:testing/generate-tests + hook:post-tool/run-tests-after-changes
```
**Synergy:** Test strategy → Test generation → Auto-run on changes

### Documentation Stack
```
agent:dev-team/code-reviewer + command:docs/create-architecture-documentation + command:docs/update-docs
```
**Synergy:** Review docs → Generate architecture → Keep in sync

---

## Anti-Patterns (Conflicts)

### Formatting Conflicts
```
hook:dev-tools/lint-on-save + hook:post-tool/format-python-files
```
**Issue:** May format twice, causing conflicts

**Solution:** Use one or the other based on project type

### Git Conflicts
```
hook:git/smart-commit + hook:git/auto-git-add
```
**Issue:** Both try to manage git staging

**Solution:** Use Smart Commit alone (handles staging)

### Context Overload
```
mcp:devtools/context7 + mcp:integration/memory + agent:ai/context-manager
```
**Issue:** Too much context management overhead

**Solution:** Pick one primary context source

---

## Recommended Stacks by Project Type

### GTM/Analytics Implementation
```yaml
agents:
  - dev-team/backend-architect
  - dev-tools/debugger
commands:
  - utilities/ultra-think
  - docs/create-architecture-documentation
settings:
  - statusline/context-monitor
  - environment/performance-optimization
hooks:
  - automation/simple-notifications
mcps:
  - devtools/context7
skills:
  - data-audit
  - meta-capi-setup
```
**Score:** 9/10 (High synergy, low redundancy)

### Full-Stack Web App
```yaml
agents:
  - dev-team/frontend-developer
  - dev-team/backend-architect
  - dev-team/code-reviewer
commands:
  - utilities/ultra-think
  - git/commit
  - testing/generate-tests
settings:
  - statusline/context-monitor
  - permissions/development-mode
hooks:
  - dev-tools/lint-on-save
  - git/smart-commit
mcps:
  - devtools/context7
  - integration/github
  - database/postgresql-integration
skills:
  - frontend-design
  - webapp-testing
```
**Score:** 8.5/10

### CLI Tool Development
```yaml
agents:
  - languages/python-pro
  - dev-tools/debugger
commands:
  - project/init-project
  - testing/generate-tests
settings:
  - environment/bash-timeouts
  - statusline/context-monitor
hooks:
  - automation/simple-notifications
mcps:
  - filesystem/filesystem-access
skills:
  - skill-creator
```
**Score:** 8/10

---

## Scoring Rubric

When evaluating a stack:

| Criteria | Weight | Description |
|----------|--------|-------------|
| Coverage | 40% | Does it cover all project needs? |
| Synergy | 35% | Do components enhance each other? |
| Efficiency | 25% | Minimal redundancy? |

### Score Calculation

```
Score = (Coverage × 0.4) + (Synergy × 0.35) + (Efficiency × 0.25)

Coverage: 1-10 based on % of needs addressed
Synergy: Count enhanced pairs (+2 each) vs conflicts (-2 each)
Efficiency: 10 - (redundant components × 1.5)
```

---

## Quick Reference: Common Pairs

| First Component | Pairs Well With |
|-----------------|-----------------|
| code-reviewer | smart-commit, commit, generate-tests |
| ultra-think | context-monitor, memory-integration |
| frontend-developer | ui-ux-designer, lint-on-save |
| backend-architect | database-architect, postgresql-integration |
| debugger | error-detective, simple-notifications |
| context7 | memory-integration, context-monitor |
