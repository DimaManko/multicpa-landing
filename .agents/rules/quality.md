# Quality

## Code

- TypeScript strict. No `any` (use `unknown` and narrow). No `@ts-ignore`. No `as` to silence type errors.
- Handle errors explicitly. No empty `catch`.
- No comments and no commented-out code in the final code.
- `console.*` is allowed in source: Vite strips it at build (`dropConsole`).
- Follow existing patterns in the repository. Keep diffs minimal.

## Performance

Lighthouse, mobile and desktop:

- Performance: 75 or higher
- Accessibility, Best Practices, SEO: 90 or higher

Animations are the main Performance cost. Keep them on `transform` and `opacity`.

## Before finishing a task

- `npm run build` passes.
- `npm run typecheck` passes.
- `npm run check` passes (Biome).
- Say explicitly what was not verified.
