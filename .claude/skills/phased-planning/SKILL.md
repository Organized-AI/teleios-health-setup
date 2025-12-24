---
name: phased-planning
description: Creates structured implementation plans with phase prompts for Claude Code execution. Use when building complex projects, creating implementation roadmaps, breaking work into phases, or generating Claude Code prompts for multi-step development. Triggers include "create implementation plan", "phase this project", "create phases for", "plan the build", "phased implementation", "break this into phases".
---

# Phased Planning Skill

Creates comprehensive phased implementation plans that generate copy-paste ready prompts for Claude Code execution, with success criteria and completion templates for each phase.

## Triggers

- "create implementation plan"
- "phase this project"
- "create phases for"
- "plan the build"
- "phased implementation"
- "create Claude Code prompts"
- "break this into phases"
- "implementation roadmap"

---

## Workflow

### Phase 1: Project Analysis

Before creating phases, gather information:

```
1. Identify all components to build
2. Map dependencies between components
3. Determine optimal build order
4. Estimate phase complexity (3-12 tasks each)
```

### Phase 2: Create Master Plan

Generate `PLANNING/IMPLEMENTATION-MASTER-PLAN.md`:

```markdown
# [PROJECT NAME] - Implementation Master Plan

**Created:** [DATE]
**Project Path:** [PATH]
**Runtime:** [TECHNOLOGY]

---

## Pre-Implementation Checklist

### ✅ Documentation (Complete)
| Component | Location | Status |
|-----------|----------|--------|
| [Doc 1] | [path] | ✅ |

### ⏳ Code Implementation (To Build)
| Component | Location | Status |
|-----------|----------|--------|
| [Component 1] | [path] | ⏳ |

---

## Implementation Phases Overview

| Phase | Name | Files | Dependencies |
|-------|------|-------|--------------|
| 0 | Project Setup | package.json, tsconfig | None |
| 1 | Core Infrastructure | src/lib/* | Phase 0 |
| ... | ... | ... | ... |
```

### Phase 3: Write Phase Prompts

For each phase, create `PLANNING/implementation-phases/PHASE-X-PROMPT.md`.

### Phase 4: Create Quick-Start Prompt

Generate `CLAUDE-CODE-PHASE-0.md` at project root.

---

## Standard Phase Types

| Phase | Name | Purpose |
|-------|------|---------|
| 0 | Project Setup | package.json, tsconfig, dependencies |
| 1 | Core Infrastructure | Config, logging, utilities |
| 2 | Framework | Base classes, types, patterns |
| 3 | Core Logic | Main business logic |
| 4-N | Feature Phases | Individual components |
| Final | Integration | CLI, tests, end-to-end |

---

## Phase Sizing Guidelines

| Complexity | Tasks |
|------------|-------|
| Simple | 3-5 tasks |
| Medium | 5-8 tasks |
| Complex | 8-12 tasks |

**Rule:** If >12 tasks, split into sub-phases.

---

## Execution Protocol

### Starting a Phase

```bash
cd [project]
claude --dangerously-skip-permissions

# In Claude Code:
"Read PLANNING/implementation-phases/PHASE-X-PROMPT.md and execute all tasks"
```

### Completing a Phase

1. Verify all success criteria
2. Create `PHASE-X-COMPLETE.md`
3. Git commit with phase message
4. Move to next phase

---

## Best Practices

1. **Complete code in prompts** - Don't leave to inference
2. **Explicit success criteria** - Verifiable checkboxes
3. **Clear dependencies** - State prerequisites
4. **Git commits per phase** - Clean history
5. **No time estimates** - Use phase order only
6. **Context files** - Specify what to read first
