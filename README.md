# bootstrap-shadcn-theme

A shadcn/ui theme for Bootstrap 5.3, compiled from vendored Bootstrap Sass source.

## Build

```bash
npm install          # first time only
npm run build        # -> dist/css/bootstrap-shadcn.css (+ .min.css), dist/js/bootstrap.bundle.min.js
npm run watch        # recompile on change during development
```

## Use in a PHP/HTML page

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

Batch 1 covers Avatar, Toasts, Combobox, Command. Later batches (Calendar, Date
Picker, Data Table, Context Menu, Hover Card, Input OTP, Menubar, Navigation
Menu, Resizable, Scroll Area, Sidebar) build on the same `bootcn` foundation.

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
