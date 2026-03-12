---
name: architect
description: Design complete technical architecture for a project or feature. Use when planning a new system, service, or major feature.
argument-hint: <project description in 2-3 sentences>
disable-model-invocation: true
---

Design the complete technical architecture for: $ARGUMENTS

Before starting, read relevant existing files in this project to understand the current stack and patterns.

Ask me for any of these I haven't provided:
- Expected users and growth rate
- Application type (web / mobile / API / CLI)
- Required stack or "Open — recommend"
- Latency budget, availability target, cost constraints
- Existing systems to integrate with

## Deliverables

Explain **tradeoffs** — not just what you picked, but what you rejected and why.

1. **Tech stack**: frontend, backend, database, infra, CI/CD. For each, state the rejected alternative and why.
2. **Project structure**: file tree with one-line annotation per folder.
3. **Data model**: entities, fields with types, relationships, indexes. Flag frequently queried fields.
4. **Core flows**: 2-3 critical journeys as `Actor → Action → Response → Side Effect`. Include error paths.
5. **ADRs**: 3-5 decisions using Decision / Context / Alternatives rejected / Consequences.
6. **Risk register**: 3-5 risks with likelihood, impact, mitigation.
7. **Integration notes**: if connecting to existing systems, describe integration points, data flow, failure modes.

## Rules
- Every sentence specific to THIS project. No generic advice.
- If vague, state your assumption explicitly.
- Prefer boring, proven tech unless there's a measurable benefit.
