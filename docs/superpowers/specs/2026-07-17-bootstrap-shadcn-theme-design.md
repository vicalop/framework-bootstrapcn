# Bootstrap 5 → shadcn/ui Theme — Design

**Date:** 2026-07-17
**Status:** Approved (Phase 1: Theme Only)

## Goal

Produce a Bootstrap 5.3 theme that makes Bootstrap's existing components render
in the shadcn/ui visual language. Target consumer is a PHP/HTML project using
Bootstrap's vanilla JS bundle. No React, no Radix.

Phase 1 scope is **theme only**: restyle every component Bootstrap already
ships. Net-new shadcn components (Combobox, Command, Sidebar, Data Table,
Calendar, etc.) are explicitly out of scope for Phase 1 and are designed to slot
in later against the same token layer with no rework.

## Approach (Hybrid / "Approach C")

Vendor the Bootstrap 5.3 Sass source in the repo and compile our own build.
Three layers, in order of preference (map a variable → regenerate the Sass map →
hand-write an override only when neither reaches):

1. **Runtime token layer** — shadcn's HSL tokens authored as CSS custom
   properties. Single source of truth.
2. **Variable remapping** — Bootstrap's `--bs-*` CSS variables retargeted to
   reference the shadcn tokens. Handles the bulk of the restyle with no CSS
   rule overrides.
3. **Compile-time Sass + surgical overrides** — regenerate Bootstrap's
   `$theme-colors` map so utility classes and component internals inherit the
   palette; add small CSS overrides for the shadcn details Bootstrap does not
   expose as variables.

Everything compiles to a single CSS file. The PHP app links that one file. No
styling in template files, no inline `<style>`, no per-page CSS.

## Token System (single source of truth)

shadcn's default token set, authored as CSS variables. Values are HSL channels
(shadcn convention), consumed as `hsl(var(--token))`.

Light (`:root`):

```css
:root {
  --background: 0 0% 100%;      --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;            --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;         --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;      --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;      --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;     --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%; --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;       --input: 240 5.9% 90%;
  --ring: 240 5% 64.9%;         --radius: 0.5rem;
}
```

Dark (`[data-bs-theme="dark"]`) redefines the same token names.

**Design note:** shadcn's default `--primary` is a neutral near-black, not a
blue. Buttons and links go monochrome-neutral — this is the authentic shadcn
look and is the default. Switching to a colored accent later is a one-line
token change.

## Variable Remapping (shadcn → Bootstrap)

| Bootstrap variable | Points at |
|---|---|
| `--bs-body-bg` | `hsl(var(--background))` |
| `--bs-body-color` | `hsl(var(--foreground))` |
| `--bs-primary` (+ RGB) | `hsl(var(--primary))` |
| `--bs-secondary` | `hsl(var(--secondary))` |
| `--bs-danger` | `hsl(var(--destructive))` |
| `--bs-border-color` | `hsl(var(--border))` |
| `--bs-border-radius` (+ sm/lg) | `calc()` off `var(--radius)` |
| `--bs-secondary-bg` / `--bs-tertiary-bg` | `hsl(var(--muted))` |
| `--bs-emphasis-color`, link colors | foreground / primary |

## Compile-time Sass + Overrides

- Regenerate `$theme-colors` and add `muted` / `accent` entries so `.bg-muted`,
  `.text-muted-foreground`, `.border`, etc. resolve to the palette.
- Surgical overrides in `_shadcn-overrides.scss`:
  - shadcn focus ring (ring + offset via `box-shadow`)
  - flatter / softer shadows
  - subtle button hover states
  - input / select / switch / checkbox restyle
  - card border + radius
  - muted table styling

## File Structure

```
/scss
  theme.scss                 ← entry: vars → bootstrap → tokens → overrides
  _tokens-light.scss         ← :root shadcn tokens
  _tokens-dark.scss          ← [data-bs-theme="dark"] tokens
  _bs-variable-map.scss      ← --bs-* remapping
  _bootstrap-overrides.scss  ← Sass $variable + $theme-colors overrides (pre-import)
  _shadcn-overrides.scss     ← surgical CSS rules (post-import)
/vendor/bootstrap/…          ← vendored Bootstrap 5.3 Sass source
/dist/css/bootstrap-shadcn.css       ← compiled output (what PHP links)
/dist/css/bootstrap-shadcn.min.css
package.json                 ← sass devDependency + build scripts
demo/index.php               ← kitchen-sink page to verify every component
```

`theme.scss` import order: Sass variable overrides → Bootstrap functions/
variables/mixins → Bootstrap components → token layers → `--bs-*` remapping →
surgical overrides.

## Build

`package.json` with `sass` (dart-sass) as a build-time-only devDependency:

- `npm run build` → compile + autoprefix + minify to `dist/css/`.
- `npm run watch` → live recompile during development.

Node is never a runtime dependency; the PHP app only serves the compiled CSS.

## Dark Mode

Native Bootstrap 5.3 `data-bs-theme`. Setting `data-bs-theme="dark"` on `<html>`
(or any container) swaps the token layer — no recompile, no duplicated component
CSS. The demo page includes a small JS snippet that persists the choice to
`localStorage`.

## Verification

A kitchen-sink `demo/index.php` exercises every Bootstrap component (buttons,
forms, cards, modals, dropdowns, nav/tabs, alerts, badges, tables, toasts,
tooltips, popovers, accordions, offcanvas, pagination, progress, etc.) in both
light and dark. Phase 1 is done when every shipped Bootstrap component reads as
shadcn in both modes.

## Out of Scope (Phase 1)

Net-new components with no Bootstrap equivalent — Avatar, Calendar, Date Picker,
Combobox, Command palette, Context Menu, Data Table, Hover Card, Input OTP,
Menubar, Navigation Menu, Resizable, Scroll Area, Sidebar, Sonner-style toasts.
These are additive later and consume the same token layer.
