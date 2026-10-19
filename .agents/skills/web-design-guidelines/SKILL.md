---
name: web-design-guidelines
description: Review UI code for accessibility, focus, forms, animation, images, touch behavior and layout against a fixed checklist. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check this component against best practices".
---

# Web Design Guidelines

Review the given files against `guidelines.md` in this folder.

## Steps

1. Take the files or glob pattern from the user. If none are given, ask which files to review.
2. Read `guidelines.md` and the specified files.
3. Check the files against every rule in `guidelines.md`.
4. Output findings in the format defined at the end of `guidelines.md`.

## Notes

- `guidelines.md` is a pinned, trimmed snapshot of the Vercel Web Interface Guidelines (MIT, `vercel-labs/web-interface-guidelines`, taken 2026-10-12). Do not fetch the rules from the network.
- Project requirements in `docs/task.md` and the Figma design take precedence over the checklist. If a rule conflicts with them, mention it as a note instead of a defect.
