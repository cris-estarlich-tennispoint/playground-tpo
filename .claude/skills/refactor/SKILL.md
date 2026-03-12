---
name: refactor
description: Safe refactoring for performance, readability, or extensibility without changing behavior. Use when code works but needs improvement.
argument-hint: <file path and concern, e.g. "src/services/catalog.ts — slow with large datasets">
disable-model-invocation: true
---

Refactor this code. Do NOT change external behavior — same inputs, same outputs.

## Target
$ARGUMENTS

## Before Refactoring
1. Read the target files and understand current behavior.
2. Check if tests exist. If not, **write tests FIRST** before touching anything.
3. Run existing tests to confirm they pass: !`git status`

## Rules
1. Tests first — no tests, no refactoring.
2. One change at a time — each modification reviewable in isolation.
3. Preserve the contract — public API and return types unchanged.
4. No mystery changes — explain every modification.

## After Refactoring

### Change Log
| # | What Changed | Why | Impact | Risk |
|---|---|---|---|---|

### Complexity (if performance-related)
- Before: [complexity + reasoning]
- After: [complexity + reasoning]
- Real-world estimate for the reported workload

### Verification
Run the tests and show results.
