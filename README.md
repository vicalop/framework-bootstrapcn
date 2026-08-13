# bootstrap-shadcn-theme

A shadcn/ui theme for Bootstrap 5.3, compiled from vendored Bootstrap Sass
source — plus `bootcn`, a set of net-new vanilla-JS components. It's
**token-driven**: the shadcn [design tokens](./TOKENS.md) are the reusable
contract, consumed by both the Bootstrap adapter and every `bootcn` component,
so the whole system rebrands and themes (light/dark) from a handful of
variables. Built to be published once and reused across projects.

## Install & reuse across projects

Pick whichever consumption path fits a project; all of them resolve to the same
token-driven CSS + JS. Always **pin a version** so projects upgrade on purpose.

**npm (bundler or Sass toolchain):**

```bash
npm install @vicalop/bootstrap-shadcn-theme bootstrap
```

```js
import "@vicalop/bootstrap-shadcn-theme/css/min"; // compiled theme
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@vicalop/bootstrap-shadcn-theme";         // bootcn (auto-inits data-bootcn-*)
```

```scss
@use "@vicalop/bootstrap-shadcn-theme/scss" as *; // scss/theme.scss (compile yourself)
```

**git tag (no registry needed — builds on install via the `prepare` hook):**

```bash
npm install github:vicalop/framework-bootstrapcn#v0.1.0
```

**CDN / plain HTML (served from the published package, version-pinned):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vicalop/bootstrap-shadcn-theme@0.1.0/dist/css/bootstrap-shadcn.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@vicalop/bootstrap-shadcn-theme@0.1.0/dist/js/bootcn.min.js"></script>
```

The published package ships prebuilt `dist/` plus the `scss/` sources,
`tokens.json`, and `brand.template.css`. Build artifacts are produced
automatically on `npm publish`/`npm pack` and on git installs (`prepare` hook),
so they are intentionally not committed to the repo.

### Per-project branding

Override only the tokens you need; unset tokens keep the shadcn defaults. See
[`TOKENS.md`](./TOKENS.md) for the full reference and versioning policy.

- **Prebuilt CSS:** copy [`brand.template.css`](./brand.template.css), edit it,
  and load it **after** the theme bundle.
- **Sass:** override `scss/_tokens-brand.scss`, or re-declare tokens after
  importing the theme.

## Build (local development)

```bash
npm install          # first time only
npm run build        # -> dist/css/bootstrap-shadcn.css (+ .min.css), dist/js/bootcn.js (+ .esm/.min), fonts
npm run watch        # recompile CSS on change during development
```

## Use in a PHP/HTML page (local `dist/`)

```html
<link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
<script src="/dist/js/bootstrap.bundle.min.js"></script>
```

Toggle dark mode by setting `data-bs-theme="dark"` on `<html>` (or any container).

## `bootcn` — JavaScript components (phase 2)

Net-new shadcn components that Bootstrap doesn't ship. Load `bootcn.js` **after**
Bootstrap's bundle; it auto-inits `data-bootcn-*` markup and exposes a `bootcn`
global.

```html
<script src="/dist/js/bootstrap.bundle.min.js"></script>
<script src="/dist/js/bootcn.min.js"></script>
```

**Toasts** (Sonner-style) — imperative:
```js
bootcn.toast("Link copied");
bootcn.toast.success("Changes saved", { description: "You're all set." });
bootcn.toast.error("Could not save", { action: { label: "Retry", onClick() {} } });
```

**Avatar** — CSS + initials fallback when the image is missing/broken:
```html
<span class="bootcn-avatar"><img src="…" alt="Sofia"><span>SC</span></span>
```

**Combobox** — progressively enhances a native `<select>` (falls back to it with
JS off; writes back and fires `change`, so forms just work):
```html
<select class="form-select" data-bootcn-combobox data-placeholder="Select framework…">
  <option value="next">Next.js</option> …
</select>
```

**Command palette** — opens on ⌘K / Ctrl+K (or `bootcn.command.open()`):
```html
<div data-bootcn-command hidden>
  <div data-bootcn-command-group="Navigation">
    <button data-bootcn-command-item data-href="/dashboard" data-shortcut="G D">Dashboard</button>
  </div>
</div>
```
Items with `data-href` navigate; otherwise set `bootcn.command.onSelect = item => {…}`.

**More components** (all auto-init from `data-bootcn-*`; see the kitchen-sink
`demo/index.php` for live markup):

| Component | Markup / API |
|---|---|
| Input OTP | `<input data-bootcn-otp data-length="6">` (keeps full value in the input) |
| Calendar | `<div data-bootcn-calendar data-selected="2026-07-15">` |
| Date Picker | `<input data-bootcn-datepicker>` → button + popover calendar |
| Context Menu | `<div data-bootcn-context-menu>` with a `-trigger` and hidden `-content` |
| Hover Card | `data-bootcn-hovercard` + a `-trigger`; put content in a `<template data-bootcn-hovercard-content>` |
| Scroll Area | `class="bootcn-scroll-area"` (CSS-only, thin token scrollbars) |
| Resizable | `<div data-bootcn-resizable>` with `[data-bootcn-panel]` children (`data-direction="vertical"` for rows) |
| Menubar | `<div data-bootcn-menubar>` of Bootstrap dropdowns; hover-switch + arrow nav |
| Navigation Menu | `<nav data-bootcn-navmenu>` with `.bootcn-navmenu-item` (trigger + content panel) |
| Data Table | `<table data-bootcn-datatable data-page-size="10">`, `<th data-sortable>` (`data-sort="number"`) — adds filter, sort, pagination |
| Sidebar | `<aside data-bootcn-sidebar>` + a `[data-bootcn-sidebar-toggle]` button — collapsible rail, persisted; mobile overlay |

Every component reads from the runtime tokens, so all of them theme in light and
dark automatically.

## Updating Bootstrap

Bump `bootstrap` in `package.json`, then `npm install && npm run vendor:refresh && npm run build`.

## Known limitations (Phase 1: theme only)

The theme drives colors through shadcn design tokens (HSL *channels*, e.g.
`--primary: 240 5.9% 10%`), consumed as `hsl(var(--token))`. Bootstrap 5.3,
however, colors some elements through **`--bs-*-rgb` companion variables** (RGB
triplets used inside `rgba(...)`), which HSL-channel tokens cannot populate.
Where that matters for common elements, the theme overrides the rule directly
(bare links, `.text-primary` / `.bg-primary` / `.border-primary` /
`.link-primary`, `.text-danger` / `.bg-danger` / `.border-danger`,
`.text-bg-primary` / `.text-bg-secondary`, and the focus ring are all retargeted
to tokens).

Less-common contextual utilities that also read `-rgb` companions are **not yet
retargeted** and will render stock Bootstrap colors if used, including:

- `.alert-primary`, `.alert-danger`, … (contextual alert variants — the plain
  `.alert` is themed)
- `.list-group-item-primary`, … (contextual list-group variants)
- `.text-secondary` / `.bg-secondary` are intentionally left alone: shadcn's
  `--secondary` is a light **surface** color, not a text color, so mapping text
  onto it would be unreadable. Use `.text-body-secondary` for muted text.

These are additive to retarget later and follow the same one-line override
pattern in `scss/_shadcn-overrides.scss`.

## One intentional static color

Every color in the theme is token-driven except one documented exception: the
dark-mode checkbox/switch/radio **checked-glyph** color is baked into an SVG data
URI (`#18181b`), because a data URI cannot interpolate a CSS variable. This
mirrors Bootstrap's own approach (it bakes `#fff` into the same icon) and is
commented as such in `scss/_shadcn-overrides.scss`.
