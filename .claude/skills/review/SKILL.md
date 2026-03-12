---
name: review
description: PR-style code review covering security, correctness, performance, and maintainability. Use after code changes or before merging.
argument-hint: <file path or glob to review, e.g. "src/auth/**">
allowed-tools: Read, Grep, Glob, Bash(git diff:*), Bash(git log:*)
---

Review the following code as a Pull Request. Be direct — no generic praise, no filler.

## Target
Read and review: $ARGUMENTS

Check recent changes: !`git diff HEAD~1 --stat`

## Dimensions
For each, verdict: **Ship** / **Nitpick** (non-blocking) / **Must fix** (blocks merge).

1. **Security**: injection, auth gaps, data exposure, hardcoded secrets, SSRF, missing rate limiting.
2. **Correctness**: logic errors, off-by-one, race conditions, null handling, unhandled rejections.
3. **Performance**: N+1 queries, O(n²) on large data, missing indexes, unbounded fetching, leaks.
4. **Maintainability**: functions doing too much, misleading names, magic numbers, tribal knowledge.
5. **Error handling**: swallowed errors, generic catch-all, missing retry, unhelpful messages.
6. **Testability**: tight coupling, hidden side effects, non-deterministic, missing coverage.

## Per Finding
- **Location**: file:line or snippet
- **Severity**: Must fix / Nitpick
- **Issue**: one sentence
- **Fix**: corrected code

## Summary
1. **Verdict**: Ship / Ship with comments / Needs rework
2. **Top 3 highest-impact changes**
3. **One thing done well** (specific)
