---
name: build
description: Generate production-ready code for a feature or endpoint. Use when implementing new functionality.
argument-hint: <what to implement, e.g. "POST /api/webhooks/orders with HMAC validation">
disable-model-invocation: true
---

Implement the following as production-ready code: $ARGUMENTS

## Before Writing Code
1. Read relevant existing files to match patterns, conventions, error handling style.
2. Identify the stack, framework, and existing validation approach.
3. If anything is ambiguous, ask me before generating code.

## Requirements
1. Production-ready. No placeholders, no TODOs, no simplified examples.
2. Input validation with meaningful error messages matching existing project patterns.
3. Full error handling: catch specific errors, log appropriately, structured responses.
4. Types/interfaces for all signatures, request bodies, response shapes.
5. Comments only where the WHY is non-obvious. Never comment WHAT.
6. List external dependencies with install commands.
7. List required environment variables with descriptions.

## After the Code
- **How to test**: exact curl commands or steps to verify.
- **Not handled**: explicitly state edge cases not implemented (rate limiting, caching, etc.).

## Avoid
- No `any` types in TypeScript.
- No silently swallowed errors.
- No hardcoded config — use environment variables.
- No god functions over ~30 lines — decompose.
