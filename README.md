# The Prompts Warehouse — Claude Code Skills

7 slash commands for the full development lifecycle, ready to use in Claude Code.

## Installation

### Option A: Global (available in ALL your projects)

```bash
# Copy skills to your global Claude config
cp -r .claude/skills/* ~/.claude/skills/
```

### Option B: Per-project (shared with your team via git)

```bash
# From the root of your project
cp -r .claude/skills/ /path/to/your-project/.claude/skills/
```

Then `git add .claude/skills/` to share with your team.

## Usage

Open Claude Code in your project and type `/`:

```
/architect A centralized OAuth token manager for multi-brand Shopify stores on Cloudflare Workers
/build POST /api/webhooks/orders endpoint that validates HMAC and queues events to Cloudflare Queue
/debug "TypeError: Cannot read properties of undefined" when fetching token from KV store
/review src/workers/token-forge/**
/refactor src/services/catalog.ts — slow with 90K products
/test src/services/auth.ts
/document src/workers/token-forge
```

Everything you type after the command name becomes `$ARGUMENTS` and is injected into the prompt.

## What Each Command Does

| Command | Phase | Description |
|---|---|---|
| `/architect` | Design | Tech stack, data model, ADRs, risk register |
| `/build` | Code | Production-ready implementation with validation |
| `/debug` | Debug | Hypothesis → elimination → root cause → fix |
| `/review` | Review | 6-dimension PR review with ship/no-ship verdict |
| `/refactor` | Optimize | Tests-first refactoring with change log |
| `/test` | Test | Full test suite: happy, edge, errors, integration |
| `/document` | Docs | README, inline docs, API guide |

## Why Skills > Pasting Prompts

These aren't generic prompts — they're designed for Claude Code specifically:

- **They read your project files first.** Each skill instructs Claude to look at your existing code, patterns, and tests before generating anything. A pasted prompt can't do that.
- **`!` backtick commands** inject live data (git diff, git log) directly into the prompt context.
- **`allowed-tools`** in the review skill restricts Claude to read-only tools so it can't accidentally modify code during a review.
- **`disable-model-invocation: true`** on most skills means Claude won't auto-trigger them — you invoke them when YOU want.

## Customizing

Edit any `SKILL.md` to add project-specific rules. Examples:

```yaml
# Force a cheaper model for simple commands
model: haiku

# Let Claude auto-invoke the review skill after code changes
disable-model-invocation: false

# Restrict tools
allowed-tools: Read, Grep, Glob
```

## File Structure

```
.claude/skills/
├── architect/SKILL.md    → /architect
├── build/SKILL.md        → /build
├── debug/SKILL.md        → /debug
├── review/SKILL.md       → /review
├── refactor/SKILL.md     → /refactor
├── test/SKILL.md         → /test
└── document/SKILL.md     → /document
```
