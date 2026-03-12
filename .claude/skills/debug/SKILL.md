---
name: debug
description: Systematically debug an issue with hypothesis-driven analysis. Use when encountering bugs, errors, or unexpected behavior.
argument-hint: <describe the bug or paste the error message>
disable-model-invocation: true
---

Analyze this bug systematically. Don't jump to conclusions.

## The Bug
$ARGUMENTS

## Before Diagnosing
1. Read the relevant source files.
2. Check recent git changes: !`git log --oneline -10`
3. Look for related test files to understand expected behavior.

## Process
1. **Hypotheses**: rank possible causes by probability. State supporting/contradicting evidence.
2. **Elimination**: for each hypothesis, what test confirms or rules it out?
3. **Root cause**: explain the causal chain: trigger → internal failure → observed behavior.
4. **Fix**: corrected code with inline comments on every changed line.
5. **Verification**: how to verify + test cases that catch regression.
6. **Prevention**: pattern, lint rule, or test that would catch this pre-production.

## Rules
- If code is insufficient to diagnose, tell me what you need. Don't guess.
- If multiple causes equally likely, give diagnostic steps to differentiate.
- Don't suggest things already ruled out by the error or context.
