# Architecture

Source of truth: `docs/architecture.md`. This file lists only the rules agents must follow.

## Layers

`app` → `pages` → `widgets` → `features` → `shared`

- A layer imports only from layers below it.
- `shared` must not import from any upper layer.
- Slices within one layer do not import from each other. Compose them in the layer above.

## Where code goes

- `pages` only assemble widgets and features. No business logic.
- `widgets` are what the user sees (header, hero, tasks, benefits, multiply, background, preloader).
- `features` are user interactions (snap-scroll, contact-form, locale-switch).
- `shared` holds api, i18n, ui, assets.

## Conventions

- Import from a slice only through its public API (`index.ts`), never from its internal files.
- Inside a slice, group code by segment: `ui`, `model`, `api`, `lib`. Create only the segments the slice needs.
- Follow the structure and naming of neighboring slices.
- Do not create new top-level folders in `src/` without team approval.