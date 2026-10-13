# AGENTS.md

Shared instructions for all AI agents (Claude Code, Codex, Cursor) working in this repository.
Claude Code reads this file through `CLAUDE.md` (`@AGENTS.md`).

---

## 1. Project Identity

MultiCPA landing: a React 19 + React Router + TypeScript + Vite 8 SPA.

- Stack: React, TypeScript, Vite, React Router, native `fetch`, i18n, React Hook Form, SCSS Modules, GSAP
- Requirements: `docs/task.md`
- Architecture: `docs/architecture.md`
- Design: [Figma](https://www.figma.com/design/U9mPOGl2XWFWVq5Uttc1JK/CPA-F?node-id=4134-4449&t=b7MonnoULUrJ9Sev-1)

## 2. Commands

- `npm run dev` — dev server
- `npm run build` — typecheck (`tsc -b`) and production build
- `npm run preview` — preview the production build
- `npm run typecheck` — TypeScript check (`tsc -b`)
- `npm run check` — Biome lint, format and import checks (no writes)
- `npm run check:fix` — same, applying safe fixes
- `npm run lint` — Biome lint only
- `npm run format` — Biome format, writes files

## 3. Project Architecture

Light FSD: `app` → `pages` → `widgets` → `features` → `shared`. A layer imports only from layers below it; `shared` knows nothing about upper layers. Details: `docs/architecture.md`.

## 4. Hard Constraints

- TypeScript strict. No `any`, no `@ts-ignore`, no `as` to silence type errors.
- No comments in the final code. `console.*` is allowed in source: Vite strips it at build (`dropConsole`).
- No secrets in the repo. The API key comes from env (`VITE_API_KEY`), never hardcoded.
- Do not add dependencies without team approval.
- Keep diffs minimal. Do not refactor unrelated code.

### Approval for changes

- Do not change project requirements, architecture, approved tech stack, or established conventions without explicit developer approval.
- If a task appears to require such a change, explain why and ask for approval before proceeding.
- Do not introduce architectural changes, new layers, dependencies, or alternative implementation approaches that conflict with the existing rules without approval.
- If requirements are unclear or conflicting, ask the developer for clarification instead of making assumptions.
- Implement the requested task within the existing requirements and architecture unless approval for a change has been explicitly given.

## 5. Rules

Detailed rules live in `.agents/rules/`. Read the relevant file before working in its area:

- `architecture.md` — before creating or moving files, or adding imports between layers
- `typescript.md` — before writing or changing TypeScript code
- `coding-style.md` — before writing or changing React components, hooks, or `.tsx` files (extends `typescript.md`)
- `quality.md` — before finishing any task

## 6. Skills

Skills live in `.agents/skills/` (exposed to Claude Code via the `.claude/skills` symlink).
