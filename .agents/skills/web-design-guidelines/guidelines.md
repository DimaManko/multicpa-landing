# Web Interface Guidelines (trimmed snapshot)

Source: https://github.com/vercel-labs/web-interface-guidelines (MIT License, Copyright (c) 2025 Vercel Labs). Snapshot of 2026-10-12, trimmed for this project: SSR, URL-state, copywriting, typography and theming sections removed.

Review the given files for compliance with the rules below. Output concise findings. High signal-to-noise.

## Rules

### Accessibility

- Icon-only buttons need `aria-label`
- Form controls need `<label>` or `aria-label`
- Interactive elements need keyboard handlers (`onKeyDown`/`onKeyUp`)
- `<button>` for actions, `<a>`/`<Link>` for navigation (not `<div onClick>`)
- Images need `alt` (or `alt=""` if decorative)
- Decorative icons need `aria-hidden="true"`
- Async updates (toasts, validation) need `aria-live="polite"`
- Use semantic HTML (`<button>`, `<a>`, `<label>`, `<table>`) before ARIA
- Headings hierarchical `<h1>`–`<h6>`; include skip link for main content
- `scroll-margin-top` on heading anchors
- Meaningful media needs captions, transcripts, or descriptions as applicable
- Media controls need keyboard support; decorative media needs assistive-tech hiding

### Focus States

- Interactive elements need visible focus
- Never `outline: none` without a focus replacement
- Use `:focus-visible` over `:focus` (avoid focus ring on click)
- Group focus with `:focus-within` for compound controls
- Sticky headers/footers/overlays must not cover the focused element

### Forms

- Inputs need `autocomplete` and meaningful `name`
- Use correct `type` (`email`, `tel`, `url`, `number`) and `inputmode`
- Never block paste (`onPaste` + `preventDefault`)
- Labels clickable (`htmlFor` or wrapping control)
- Disable spellcheck on emails, codes, usernames (`spellCheck={false}`)
- Checkboxes/radios: label + control share single hit target (no dead zones)
- Submit button stays enabled until request starts; spinner during request
- Errors inline next to fields; focus first error on submit

### Animation

- Honor `prefers-reduced-motion` (provide reduced variant or disable)
- Animate `transform`/`opacity` only (compositor-friendly)
- Never `transition: all`; list properties explicitly
- Set correct `transform-origin`
- SVG: transforms on `<g>` wrapper with `transform-box: fill-box; transform-origin: center`
- Animations interruptible: respond to user input mid-animation
- Autoplay motion longer than 5 seconds alongside other content needs pause, stop, or hide controls
- Muted decorative loops must stop under `prefers-reduced-motion`
- Project note: the continuous background animation and the looping marquee are required by `docs/task.md`. Report them as notes, not defects.

### Content Handling

- Text containers handle long content: truncation, line clamping, or `overflow-wrap`
- Flex children need `min-width: 0` to allow text truncation
- Handle empty states; do not render broken UI for empty strings/arrays
- Content from the API: anticipate short, average, and very long text

### Images

- `<img>` needs explicit `width` and `height` (prevents CLS)
- Below-fold images: `loading="lazy"`
- Above-fold critical images: `fetchpriority="high"`

### Performance

- No layout reads in render (`getBoundingClientRect`, `offsetHeight`, `offsetWidth`, `scrollTop`)
- Batch DOM reads/writes; avoid interleaving
- Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke
- Add `<link rel="preconnect">` for CDN/asset domains
- Critical fonts: `<link rel="preload" as="font">` with `font-display: swap`
- Prefer `<video autoplay muted loop playsinline>` over animated GIF; provide a still alternative

### Touch & Interaction

- `touch-action: manipulation` (prevents double-tap zoom delay)
- `overscroll-behavior: contain` in modals/drawers/sheets
- During drag: disable text selection, `inert` on dragged elements
- Drag/swipe/pinch/path gestures need tap/click and keyboard alternatives unless essential
- `autoFocus` sparingly: desktop only, single primary input; avoid on mobile

### Safe Areas & Layout

- Full-bleed layouts need `env(safe-area-inset-*)` for notches
- Avoid unwanted scrollbars: fix content overflow instead of hiding it
- Flex/grid over JS measurement for layout

### Hover & Interactive States

- Buttons/links need a hover state (visual feedback)
- Interactive states increase contrast: hover/active/focus more prominent than rest

### Locale & i18n

- Dates/times: use `Intl.DateTimeFormat`, not hardcoded formats
- Numbers/currency: use `Intl.NumberFormat`, not hardcoded formats
- Brand names, code tokens, identifiers: `translate="no"` to prevent garbled auto-translation

### Anti-patterns (flag these)

- `user-scalable=no` or `maximum-scale=1` disabling zoom
- `onPaste` with `preventDefault`
- `transition: all`
- `outline: none` without a `:focus-visible` replacement
- Inline `onClick` navigation without `<a>`
- `<div>` or `<span>` with click handlers (should be `<button>`)
- Images without dimensions
- Form inputs without labels
- Icon buttons without `aria-label`
- Hardcoded date/number formats (use `Intl.*`)
- `autoFocus` without clear justification
- Animated GIF when compressed video is suitable
- Gesture-only action without tap/click and keyboard alternative

## Output Format

Group by file. Use `file:line` format. Terse findings.

```text
## src/widgets/hero/ui/Hero.tsx

src/widgets/hero/ui/Hero.tsx:42 - icon button missing aria-label
src/widgets/hero/ui/Hero.tsx:18 - input lacks label
src/widgets/hero/ui/Hero.tsx:55 - animation missing prefers-reduced-motion
src/widgets/hero/ui/Hero.module.scss:67 - transition: all, list properties

## src/widgets/tasks/ui/Tasks.tsx

✓ pass
```

State issue + location. Skip explanation unless the fix is non-obvious. No preamble.
