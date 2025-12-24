---
name: organized-codebase-applicator
description: Applies Organized Codebase template structure to existing projects and cleans up unused/redundant directories. Use when user wants to organize an existing project, apply the Organized Codebase template, clean up a messy codebase, remove iteration folders, standardize project structure, or mentions "organized codebase", "clean up codebase", "apply template", "remove unused folders", "standardize project", or "clean up directories".
---

# Organized Codebase Applicator

Applies the Organized Codebase template to existing projects and performs intelligent cleanup of unused or redundant directories.

## Workflow

### Phase 1: Analysis

Analyze target project before making changes:

1. List current structure with `find . -type d -maxdepth 3`
2. Identify redundancy patterns: `-v[0-9]`, `-old`, `-backup`, `-pwa`, `-app` suffixes
3. Detect regenerable directories: `node_modules/`, `dist/`, `build/`, `.next/`
4. Check for existing Organized Codebase directories

### Phase 2: Cleanup

Archive iteration directories to `.archive/` (never delete):

```bash
# Patterns to archive
*-pwa/           # PWA variants
*-app/           # App variants  
*-v[0-9]*/       # Version iterations
*-old/           # Old versions
*-backup/        # Backups
```

**Safety rules**:
- Never delete `.git/`
- Always archive (don't delete)
- Confirm before making changes

### Phase 3: Template Application

Create these directories if they don't exist:

```
.claude/           # Claude Code configuration
├── agents/        # Agent definitions
├── commands/      # Slash commands
├── hooks/         # Pre/post hooks
└── skills/        # Local skills

PLANNING/          # Project planning docs
ARCHITECTURE/      # System architecture docs
DOCUMENTATION/     # General documentation
SPECIFICATIONS/    # Functional/technical specs
AGENT-HANDOFF/     # Agent handoff instructions
CONFIG/            # Configuration docs
scripts/           # Automation scripts
.archive/          # Archived iterations
```

### Phase 4: Migration

Move existing content to new locations:

| Old Location | New Location |
|--------------|--------------|
| `docs/` | `DOCUMENTATION/` |
| `experiments/` | `PLANNING/experiments/` |
| `SUBAGENT-FRAMEWORK/agents/` | `.claude/agents/` |

### Phase 5: Finalize

1. Update references in all documentation files
2. Git commit with descriptive message
3. Confirm structure with user

## Cleanup Patterns

| Pattern | Action | Confidence |
|---------|--------|------------|
| `*-v[0-9]*/` | Archive to `.archive/` | High |
| `*-old/`, `*-backup/` | Archive to `.archive/` | High |
| `*-pwa/`, `*-app/` | Archive to `.archive/` | Medium |
| `node_modules/` | Can delete (regenerable) | High |
| `dist/`, `build/` | Can delete (regenerable) | High |
| `.next/`, `.cache/` | Can delete (regenerable) | High |

## Example Commands

```bash
# Create standard directories
mkdir -p .claude/{agents,commands,hooks,skills}
mkdir -p PLANNING ARCHITECTURE DOCUMENTATION SPECIFICATIONS
mkdir -p AGENT-HANDOFF CONFIG scripts .archive

# Move docs to DOCUMENTATION
mv docs/* DOCUMENTATION/ 2>/dev/null
rmdir docs 2>/dev/null

# Archive old iterations
mv *-old .archive/ 2>/dev/null
mv *-backup .archive/ 2>/dev/null

# Git commit
git add -A && git commit -m "Apply Organized Codebase template structure"
```

## Template Files to Create

### AGENT-HANDOFF/HANDOFF.md

```markdown
# Agent Handoff Document

## Project: [PROJECT_NAME]

### Quick Context
[Brief description]

### Key Files to Read
1. `CLAUDE.md` - Project overview
2. `DOCUMENTATION/` - Technical docs

### Current State
- Framework: ✅/⏳
- Implementation: ✅/⏳

### Next Steps
1. [Next task]
```

## Default Template Path (macOS)

```
~/Library/Mobile Documents/com~apple~CloudDocs/BHT Promo iCloud/Organized AI/Windsurf/Organized Codebase
```
