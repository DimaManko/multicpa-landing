---
name: figma-implement-design
description: Implements a Figma frame or component as code in this repository (React + SCSS Modules, Light FSD). Use when the user provides a Figma URL or asks to implement, build, or match a design from the MultiCPA Figma file. Static markup and styles only; animations and scroll go through the GSAP skills and `features/snap-scroll`.
---

# Implement Figma Design

Adapted from the `figma-implement-design` skill in `openai/skills` (Figma Developer Terms apply to the original materials). Project rules always win: if this skill conflicts with `AGENTS.md` or `.agents/rules/`, follow the project rules.

## Scope

- This skill produces markup, styles and assets only.
- Do not add animation, scroll or transition logic from the design. Animations live on the Figma "Animations" page and are implemented through the `gsap-*` skills; paged scrolling belongs to `features/snap-scroll`.
- Do not create or edit nodes inside Figma. This skill only reads from it.

## Prerequisites

- Figma MCP server is connected.
- The user gave a URL `https://figma.com/design/:fileKey/:fileName?node-id=1-2`. File key is the segment after `/design/`, node ID is `node-id` with `-` kept as in the URL.
- If the URL or node is missing, ask. Do not guess.

## Workflow

Follow in order.

1. **Context.** Run `get_design_context(fileKey, nodeId)`. If the response is truncated, run `get_metadata`, pick child nodes, and fetch them one by one.
2. **Reference.** Run `get_screenshot(fileKey, nodeId)`. This is the source of truth for validation.
3. **Assets.** Use assets returned by the Figma MCP payload. Do not add icon packages or placeholders. Save them into `src/shared/assets/` (`icons`, `img`, `fonts`) following the existing naming (`icon-telegram.svg`, `hero-snake.png`). Reuse an existing asset when one matches.
4. **Survey the repo.** Before writing code read `.agents/rules/architecture.md`, `typescript.md`, `coding-style.md`, the neighboring slices, `src/shared/ui`, and the global styles in `src/app/styles`. Reuse what exists.
5. **Translate.** Treat Figma MCP output (React + Tailwind) as a description of design, not as code to paste.
6. **Validate.** See the checklist below.

## Translation rules

### Architecture

- Place files by Light FSD: `app` → `pages` → `widgets` → `features` → `shared`.
- A screen of the landing is a slice in `widgets`. Reusable primitives (button, input, modal shell) go to `shared/ui`. Interactions (form, locale switch, snap-scroll) are `features`.
- Slices do not import from each other inside one layer. Import from a slice only through its `index.ts`.
- Group code inside a slice by segment (`ui`, `model`, `lib`). Create only the segments needed. Do not create new top-level folders in `src/`.

### Styles

- SCSS Modules only: `Component.module.scss` next to the component. No Tailwind, CSS-in-JS, or inline styles (except dynamic values that cannot be expressed in SCSS).
- Replace every Tailwind utility from the Figma output with SCSS.
- Use the project's existing variables, mixins and global styles. Do not hardcode colors, font sizes, spacing or font families when a project token exists. If a needed token is missing, say so and propose where to add it instead of inventing a parallel set.
- Fonts are already in `src/shared/assets/fonts` (Halvar Breit, Stolzl). Do not import other fonts.
- The page has a fixed-width container. Use the existing container, do not recreate it per widget.

### Components and TypeScript

- Function components, `PascalCase` file and symbol, `type Props = {}`, props destructured in the parameter list.
- Reuse an existing component and extend it when one matches. Do not duplicate.
- TypeScript strict: no `any`, no `@ts-ignore`, no `as` to silence errors.
- User-visible text comes from i18n (`shared/i18n`) or the API, never hardcoded in markup.
- No comments, no JSDoc, no commented-out code. `console.*` is not needed.
- Semantic HTML first (`button`, `a`, `nav`, `h1`–`h3`), alt text for meaningful images, visible focus states.

## Fidelity

Pixel perfect placement is not required by the task. Sizes of text and elements must match the Figma frame. Layout may adapt so the content fits a 100% height screen on desktop, including 13-inch displays. Button and link states are on the Figma "Components" page.

## Validation checklist

- [ ] Text and element sizes match the screenshot (font, size, weight, line height)
- [ ] Colors match
- [ ] Hover, active and disabled states match the "Components" page
- [ ] Desktop: content fits one screen height, checked at a 13-inch viewport
- [ ] Mobile: layout works, no animation logic is added
- [ ] Assets render
- [ ] Compared against the screenshot in a real browser (Chrome DevTools MCP), not just by reading code
- [ ] `npm run typecheck`, `npm run check`, `npm run build` pass
- [ ] No comments in the code

If a step could not be verified (for example the dev server was not running), say so explicitly.

## TODO

- [ ] Add paths to the SCSS variables (colors, typography, spacing) in `src/app/styles` once they exist
- [ ] Add the desktop/mobile breakpoint value used by the project
- [ ] Add the list of existing `shared/ui` components (button, input, modal) once they exist
- [ ] Add the path or import of the shared container
- [ ] Update the skill after the first real run on a Figma frame

## Deviations

If the design cannot be matched because of a project rule, technical limit or accessibility, do not leave a comment in the code. Report the deviation and the reason in the reply.
