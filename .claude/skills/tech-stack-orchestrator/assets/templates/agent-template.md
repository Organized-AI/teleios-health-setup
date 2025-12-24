# Agent Template

Use this template to create custom agents for Claude Code.

---

## File Location

```
.claude/agents/[agent-name].md
```

---

## Template

```markdown
---
name: [agent-name]
description: [One-line description of what this agent does]
model: [opus|sonnet|haiku] - optional, defaults to project setting
---

# [Agent Name]

[2-3 sentence description of the agent's purpose and when to use it]

## Responsibilities

- [Primary responsibility 1]
- [Primary responsibility 2]
- [Primary responsibility 3]

## Workflow

### Step 1: [First Step Name]
[Description of what to do first]

### Step 2: [Second Step Name]
[Description of what to do second]

### Step 3: [Third Step Name]
[Description of what to do third]

## Output Format

[Describe expected output format]

## Example Prompt

> "[Example prompt that would trigger this agent]"

## Integration

Works well with:
- [Related agent 1]
- [Related command 1]
```

---

## Example: GTM Architect Agent

```markdown
---
name: gtm-architect
description: Designs GTM tracking architectures and creates implementation plans
model: opus
---

# GTM Architect Agent

Specializes in designing comprehensive Google Tag Manager implementations with server-side tracking, Meta CAPI integration, and CRM webhook configurations.

## Responsibilities

- Analyze customer journey and identify tracking requirements
- Design data layer schema and event taxonomy
- Create container architecture (web + server-side)
- Document implementation specifications

## Workflow

### Step 1: Discovery
Gather requirements: business model, conversion types, platforms to track

### Step 2: Journey Mapping
Map customer journey from awareness to conversion

### Step 3: Architecture Design
Design GTM container structure and event flow

### Step 4: Documentation
Create implementation guides and phase prompts

## Output Format

- Customer journey diagram (ASCII)
- Event tracking specification table
- Container architecture diagram
- Implementation phase breakdown

## Example Prompt

> "Design GTM tracking for my e-commerce store with Meta Ads and Google Ads"

## Integration

Works well with:
- gtm-debugger agent
- data-audit skill
- meta-capi-setup skill
```

---

## Installation

```bash
# Copy to project
cp agent-template.md .claude/agents/my-agent.md

# Edit with your content
vim .claude/agents/my-agent.md
```
