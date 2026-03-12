---
name: test
description: Generate a complete test suite with happy path, edge cases, error handling, and mocks. Use when adding tests to existing code.
argument-hint: <file path to test, e.g. "src/services/auth.ts">
disable-model-invocation: true
---

Write a complete, runnable test suite for: $ARGUMENTS

## Before Writing Tests
1. Read the source file — all code paths, dependencies, edge cases.
2. Check if a test file exists — extend it, don't rewrite.
3. Check the test framework in package.json and match existing test style.
4. Read an existing test file to match conventions.

## Categories

### Happy Path (min 3)
Primary flows with valid inputs.

### Edge Cases (min 4)
Empty/null/undefined, max length strings, huge numbers, special characters, empty collections.

### Error Handling (min 3)
Invalid types, external service failures (timeout, 500, network), missing config. Verify error messages help debugging.

### Integration Points (if applicable)
Mocks called with correct args, operation order, cleanup on failure.

## Format
- Arrange → Act → Assert pattern
- Names: `should_[expected]_when_[condition]`
- Group with describe/context matching project style

## After Tests
1. Run the suite and show results.
2. List what ISN'T tested and why.
