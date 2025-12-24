---
name: phase-0-template
description: Generates ready-to-use Phase 0 (Project Setup) prompts for Claude Code. Use when initializing new TypeScript/Node.js projects, bootstrapping project structure, or creating the first phase of an implementation plan. Triggers include "create phase 0", "project setup prompt", "initialize typescript project", "bootstrap project", "init project".
---

# Phase 0 Template Skill

Generates ready-to-use Phase 0 (Project Setup) prompts for Claude Code, including package.json, tsconfig.json, dependencies, and directory structure customized by project type.

## Triggers

- "create phase 0"
- "project setup prompt"
- "initialize typescript project"
- "phase 0 for"
- "create setup phase"
- "bootstrap project"
- "init project"

---

## Workflow

### Step 1: Gather Project Info

| Field | Example |
|-------|---------|
| Project Name | `meta-media-buyer` |
| Description | "AI agent system for Meta Ads" |
| Project Type | CLI / API / Agent System / MCP Server / Library |

### Step 2: Select Preset

**CLI Application:**
```
Core deps: commander, chalk, ora, dotenv, zod
Directories: src/commands, src/lib, src/utils
```

**API Server:**
```
Core deps: fastify, zod, dotenv, pino
Directories: src/routes, src/lib, src/middleware
```

**Agent System:**
```
Core deps: zod, dotenv, commander, chalk, ora
Directories: src/agents, src/lib, src/mcp
```

**MCP Server:**
```
Core deps: @modelcontextprotocol/sdk, zod, dotenv
Directories: src/tools, src/lib, src/types
```

### Step 3: Generate Phase 0 Prompt

Create `PLANNING/implementation-phases/PHASE-0-PROMPT.md` and `CLAUDE-CODE-PHASE-0.md`.

---

## Template Tasks

1. **Create package.json** - With scripts: build, dev, test, typecheck
2. **Create tsconfig.json** - ES2022, NodeNext modules
3. **Install dependencies** - Core + dev deps
4. **Create .env.example** - Environment template
5. **Create directory structure** - src/, tests/, logs/
6. **Create entry point** - src/index.ts placeholder

---

## Success Criteria

- [ ] `npm install` completes without errors
- [ ] `npm run build` compiles successfully
- [ ] `npm run typecheck` passes
- [ ] `npx tsx src/index.ts` shows welcome message

---

## Quick Command for Claude Code

```bash
cd [project]
claude --dangerously-skip-permissions

# Paste:
"Read CLAUDE-CODE-PHASE-0.md and execute all tasks"
```

---

## Integration

Works with:
- **phased-planning** - For complete multi-phase plans
- **organized-codebase-applicator** - For project structure
