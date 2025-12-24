# Command Template

Use this template to create custom slash commands for Claude Code.

---

## File Location

```
.claude/commands/[command-name].md
```

---

## Template

```markdown
---
name: [command-name]
description: [Brief description shown in command list]
---

# /[command-name]

[Description of what this command does]

## Usage

```
/[command-name] [arguments]
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `[arg1]` | Yes/No | [What this argument does] |
| `[arg2]` | Yes/No | [What this argument does] |

## Workflow

1. [First step]
2. [Second step]
3. [Third step]

## Output

[What the command produces]

## Examples

```
/[command-name] example-arg
```

Result: [What happens]
```

---

## Example: GTM Setup Command

```markdown
---
name: gtm-setup
description: Initialize GTM tracking architecture for a new project
---

# /gtm-setup

Generates complete GTM implementation files including web container configuration, server-side setup, and dataLayer scripts.

## Usage

```
/gtm-setup [project-name]
```

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `project-name` | Yes | Name of the project (used in file naming) |

## Workflow

1. Prompt for account IDs (Meta Pixel, GA4, Google Ads)
2. Generate customer journey template
3. Create web container configuration
4. Create server-side container configuration
5. Generate dataLayer scripts
6. Create testing checklist

## Output

- `PLANNING/customer-journey.md`
- `gtm-web-container.json`
- `gtm-sgtm-container.json`
- `scripts/dataLayer.js`
- `DOCUMENTATION/testing-checklist.md`

## Examples

```
/gtm-setup teleios-health
```

Creates full GTM architecture for Teleios Health project.
```

---

## Installation

```bash
# Copy to project
cp command-template.md .claude/commands/my-command.md

# Edit with your content
vim .claude/commands/my-command.md
```
