---
name: document
description: Generate technical documentation — README, inline docs, API guide. Use when documenting a project or module.
argument-hint: <project path or module, e.g. "." or "src/workers/token-forge">
disable-model-invocation: true
---

Generate technical documentation for: $ARGUMENTS

## Before Writing
1. Read project structure, package.json, key source files.
2. Identify stack, entry points, public API surface.
3. Check existing docs — update, don't overwrite.

## 1. README.md
Goal: zero to running in under 60 seconds.
- One sentence: what it does and who it's for
- **Quick Start**: 3-5 commands that WORK when copy-pasted
- Prerequisites: Requirement | Version | Install
- Env variables: Variable | Required | Description | Example
- Project structure with one-line annotations
- Commands: Command | What it does
- Architecture: 2-3 paragraphs on HOW it works and where to look when things break
- Testing: how to run, how to add
- Deployment: how to deploy, env differences

## 2. Inline Docs
Per public function: what (verb), params with types/constraints, return, exceptions, realistic example. Skip obvious private functions and getters.

## 3. API Guide (if applicable)
Per endpoint: method, route, auth, realistic request, realistic response, error table (status | code | when), rate limits/pagination notes.

## Rules
- Present tense, second person
- Call out gotchas explicitly
- Never write "This is self-explanatory"
