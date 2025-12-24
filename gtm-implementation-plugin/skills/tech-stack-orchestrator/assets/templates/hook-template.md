# Hook Template

Use this template to create custom hooks for Claude Code.

---

## File Location

```
.claude/hooks/[hook-name].md
```

---

## Hook Types

| Type | Trigger | Use Case |
|------|---------|----------|
| PreToolUse | Before any tool runs | Validation, logging |
| PostToolUse | After any tool runs | Formatting, notifications |
| PreMessage | Before Claude responds | Context injection |
| PostMessage | After Claude responds | Cleanup, commits |

---

## Template

```markdown
---
name: [hook-name]
type: [PreToolUse|PostToolUse|PreMessage|PostMessage]
tools: [list of tools this applies to, or "*" for all]
---

# [Hook Name]

[Description of what this hook does and when it triggers]

## Trigger Conditions

- [When this hook should fire]
- [Additional conditions]

## Actions

1. [What the hook does first]
2. [What the hook does second]

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| [setting1] | [value] | [What it controls] |

## Example

When: [Trigger scenario]
Result: [What happens]
```

---

## Example: GTM Commit Hook

```markdown
---
name: gtm-commit-hook
type: PostToolUse
tools: ["Write", "Edit", "MultiEdit"]
---

# GTM Commit Hook

Automatically creates git commits with conventional commit messages after GTM configuration files are modified.

## Trigger Conditions

- File modified matches: `*.json` in gtm directories
- File modified matches: `*dataLayer*.js`
- File modified matches: `PLANNING/implementation-phases/*.md`

## Actions

1. Detect file type (container, script, phase doc)
2. Generate appropriate commit message
3. Stage changed files
4. Create commit

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| autoCommit | true | Whether to auto-commit |
| messagePrefix | "gtm:" | Prefix for commit messages |

## Example

When: `gtm-web-container.json` is updated
Result: Creates commit "gtm: update web container configuration"
```

---

## Installation

```bash
# Copy to project
cp hook-template.md .claude/hooks/my-hook.md

# Edit with your content
vim .claude/hooks/my-hook.md
```
