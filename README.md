# Bootstrap shadcn Theme

Give [Bootstrap 5.3](https://getbootstrap.com/) the clean, modern look of
[shadcn/ui](https://ui.shadcn.com/) — without adopting React or Tailwind. Drop in
one stylesheet and your existing Bootstrap markup renders with shadcn's neutral
palette, soft radii, subtle borders and focus rings, the Inter font, and
first-class light/dark mode.

It also ships **`bootcn`**: a small, dependency-light set of vanilla-JS
components (toasts, command palette, combobox, data table, and more) that shadcn
has but Bootstrap doesn't — all themed from the same design tokens.

**Who it's for:** anyone building server-rendered (PHP/HTML), Rails, Django,
Laravel, or plain-HTML apps on Bootstrap who wants the shadcn aesthetic with zero
build tooling in their project.

> **Note — this is an agentic-led project.** The design, code, and this
> documentation are developed primarily by AI coding agents working from a human's
> direction. If something looks unusually thorough (or unusually opinionated),
> that's why. Contributions and issues are welcome all the same.

---

## Quick start

No build step required. Add three tags to your page — theme CSS, Bootstrap's JS
bundle, then `bootcn` — served straight from jsDelivr with `@latest` so every
project picks up new releases automatically:

```html
<!doctype html>
<html lang="en" data-bs-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/css/bootstrap-shadcn.min.css"
    />
  </head>
  <body>
    <div class="container py-5">
      <button class="btn btn-primary">Primary</button>

      <!-- A bootcn component: just markup, auto-initialized -->
      <select class="form-select mt-3" data-bootcn-combobox data-placeholder="Select a framework…">
        <option value="next">Next.js</option>
        <option value="svelte">SvelteKit</option>
        <option value="astro">Astro</option>
      </select>
    </div>

    <script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/js/bootcn.min.js"></script>
  </body>
</html>
```

That's it. Your Bootstrap components are now shadcn-styled, and `bootcn`
components initialize automatically from their `data-bootcn-*` attributes.

**Dark mode:** set `data-bs-theme="dark"` on `<html>` (or any container). Toggle
it in JS:

```js
const html = document.documentElement;
html.dataset.bsTheme = html.dataset.bsTheme === "dark" ? "light" : "dark";
```

**Load order matters:** theme CSS → Bootstrap JS bundle → `bootcn` JS. `bootcn`
reuses Bootstrap's JavaScript for positioning and dismissal, so Bootstrap's
bundle must load first.

> `@latest` resolves to the newest release tag. jsDelivr may cache it for up to
> ~12 hours at the edge, so a new tag can take a little while to propagate. Pin
> `@vX.Y.Z` instead if you need immutable caching or strict version control.
> `@main` does **not** work — `dist/` is only attached to release tags.

---

## Components (`bootcn`)

Every component reads from the runtime design tokens, so they all theme in light
and dark automatically. Most auto-initialize from `data-bootcn-*` markup; a few
have an imperative API on the global `bootcn` object.

**Toasts** (Sonner-style):

```js
bootcn.toast("Link copied");
bootcn.toast.success("Changes saved", { description: "You're all set." });
bootcn.toast.error("Could not save", { action: { label: "Retry", onClick() {} } });
```

**Avatar** — image with an automatic initials fallback:

```html
<span class="bootcn-avatar"><img src="…" alt="Sofia"><span>SC</span></span>
```

**Combobox** — progressively enhances a native `<select>` (works without JS, and
writes back + fires `change`, so forms just work):

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

**And more** — see the kitchen-sink `demo/index.php` for live markup:

| Component | Markup / API |
|---|---|
| Input OTP | `<input data-bootcn-otp data-length="6">` (keeps full value in the input) |
| Calendar | `<div data-bootcn-calendar data-selected="2026-07-15">` |
| Date Picker | `<input data-bootcn-datepicker>` → button + popover calendar |
| Context Menu | `<div data-bootcn-context-menu>` with a `-trigger` and hidden `-content` |
| Hover Card | `data-bootcn-hovercard` + a `-trigger`; content in a `<template data-bootcn-hovercard-content>` |
| Scroll Area | `class="bootcn-scroll-area"` (CSS-only, thin token scrollbars) |
| Resizable | `<div data-bootcn-resizable>` with `[data-bootcn-panel]` children (`data-direction="vertical"` for rows) |
| Menubar | `<div data-bootcn-menubar>` of Bootstrap dropdowns; hover-switch + arrow nav |
| Navigation Menu | `<nav data-bootcn-navmenu>` with `.bootcn-navmenu-item` (trigger + content panel) |
| Data Table | `<table data-bootcn-datatable data-page-size="10">`, `<th data-sortable>` — adds filter, sort, pagination |
| Sidebar | `<aside data-bootcn-sidebar>` + a `[data-bootcn-sidebar-toggle]` button — collapsible rail, persisted; mobile overlay |

---

## Theming & branding

Colors are driven by [shadcn design tokens](./TOKENS.md) — CSS custom properties
like `--primary`, `--background`, and `--radius`. Override only the ones you want;
the rest keep the shadcn defaults.

The simplest way (no build): copy [`brand.template.css`](./brand.template.css),
edit the values, and load it **after** the theme:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/css/bootstrap-shadcn.min.css" />
<link rel="stylesheet" href="/css/brand.css" /> <!-- your edited copy -->
```

```css
/* /css/brand.css — values are shadcn HSL channels: "H S% L%" */
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --radius: 0.5rem;
}
[data-bs-theme="dark"] {
  --primary: 217.2 91.2% 59.8%;
}
```

See [`TOKENS.md`](./TOKENS.md) for the full token reference and versioning policy.

---

## Other ways to install

The CDN quick start above is the easiest path. If you use a bundler or Sass
toolchain, you can consume it as a package instead.

**npm** (needs a one-time `npm publish`; also enables the `cdn.jsdelivr.net/npm/…`
URLs):

```bash
npm install @vicalop/bootstrap-shadcn-theme bootstrap
```

```js
import "@vicalop/bootstrap-shadcn-theme/css/min"; // compiled theme
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@vicalop/bootstrap-shadcn-theme";         // bootcn (auto-inits)
```

**Sass** — compile the theme yourself and override tokens:

```scss
@use "@vicalop/bootstrap-shadcn-theme/scss" as *;
:root { --primary: 221.2 83.2% 53.3%; }
```

**Directly from GitHub** (no registry; builds on install):

```bash
npm install github:vicalop/framework-bootstrapcn#v0.1.0
```

---

## Local development

```bash
npm install          # first time only
npm run build        # -> dist/ (CSS expanded + min, bootcn JS iife/esm/min, fonts)
npm run watch        # recompile CSS on change
```

Open `demo/index.php` (any PHP server, e.g. `php -S localhost:8000`) for a
kitchen-sink of every component in light and dark. The built `dist/` folder is
gitignored — it's generated on demand and attached to release tags (see below).

To bump the vendored Bootstrap version: change `bootstrap` in `package.json`,
then `npm install && npm run vendor:refresh && npm run build`.

---

## Releasing new versions

Distribution uses jsDelivr's GitHub route, served from version tags. Because
jsDelivr serves files as committed (and `dist/` is gitignored on `main`), a
GitHub Action ([`.github/workflows/release.yml`](.github/workflows/release.yml))
builds `dist/` and attaches it to the tag on release.

```bash
# 1. bump "version" in package.json on main, commit, push
# 2. tag it (must match package.json) and push the tag:
git tag v0.1.1
git push origin v0.1.1
```

The Action builds, attaches `dist/` to the tag, and prints the ready-to-use
jsDelivr URLs in its run summary. Projects on `@latest` pick up the new release
once jsDelivr's cache refreshes. Tags are **immutable** — never move or recreate
a published tag; bump to a new version instead. Full contributor guidance lives
in [`AGENTS.md`](./AGENTS.md).

---

## Known limitations

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

These follow the same one-line override pattern in `scss/_shadcn-overrides.scss`
and can be retargeted as needed.

**One intentional static color:** the dark-mode checkbox/switch/radio
checked-glyph is baked into an SVG data URI (`#18181b`) because a data URI can't
interpolate a CSS variable. This mirrors Bootstrap's own approach (it bakes
`#fff` into the same icon).

---

## About this project

This is an **agentic-led effort**: an experiment in having AI coding agents build
and maintain a real, reusable design-system package end to end — from the Sass
token architecture and the `bootcn` components to the packaging, CI release
pipeline, and these docs. A human sets direction and reviews; the agents do the
implementation. See [`AGENTS.md`](./AGENTS.md) for how that workflow is
structured.

## License

[MIT](./LICENSE).
