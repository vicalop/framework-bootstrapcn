# Icons (Lucide)

bootcn uses **[Lucide](https://lucide.dev/)** as its official icon system: 24×24 viewBox,
`stroke-width: 2`, `fill: none`, `stroke: currentColor`. Icons inherit color from their
parent (buttons, links, sidebar) — no per-app CSS required.

Lucide is [ISC licensed](https://github.com/lucide-icons/lucide/blob/main/LICENSE);
see [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Inline SVG (recommended)

Paste Lucide paths into this shell. **Primary integration for SSR / no-build apps.**

```html
<svg
  class="bootcn-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <!-- Lucide path(s) here -->
</svg>
```

### Size modifiers

| Class | Size |
|---|---|
| *(default)* | `1rem` |
| `bootcn-icon-sm` | `0.875rem` |
| `bootcn-icon-lg` | `1.25rem` |

```html
<button class="btn btn-primary">
  <svg class="bootcn-icon bootcn-icon-sm" …>…</svg>
  Save
</button>
```

### Accessibility

| Case | Markup |
|---|---|
| Decorative (next to visible text) | `aria-hidden="true"` on the `<svg>` |
| Icon-only button | `aria-label="…"` on the **button**, `aria-hidden="true"` on the SVG |
| Meaningful standalone icon | Visible text nearby, or `aria-label` on the interactive parent |

```html
<button type="button" class="icon-btn" aria-label="Open menu">
  <svg class="bootcn-icon" aria-hidden="true" …>…</svg>
</button>
```

### Sidebar

Put `class="bootcn-icon"` on nav icons inside `.bootcn-sidebar-link`. The sidebar
styles muted/default and accent colors on hover / `aria-current="page"`. Labels go in
`.bootcn-sidebar-label` — they hide automatically when the rail is collapsed; icons
stay visible in the 3.5rem rail.

```html
<a class="bootcn-sidebar-link" href="/" aria-current="page">
  <svg class="bootcn-icon" …><!-- layout-dashboard --></svg>
  <span class="bootcn-sidebar-label">Dashboard</span>
</a>
```

`.bootcn-sidebar-icon` is a legacy alias with identical sidebar behavior.

## Curated icon set

bootcn blesses a small vocabulary for cross-app consistency. Copy the full SVG from
[`icons/lucide-curated.md`](./icons/lucide-curated.md) — do **not** vendor all ~1500
Lucide icons. Need something else? Copy a single icon from [lucide.dev/icons](https://lucide.dev/icons)
using the same `<svg class="bootcn-icon">` shell.

| Name | Use for |
|---|---|
| `menu` | Mobile nav toggle, hamburger |
| `x` | Close, dismiss |
| `chevron-down` / `chevron-up` / `chevron-left` / `chevron-right` | Dropdowns, pagination, carousels |
| `plus` | Create, add |
| `pencil` | Edit |
| `trash-2` | Delete |
| `log-out` | Sign out |
| `settings` | Settings |
| `list` | List view |
| `search` | Search fields |
| `layout-dashboard` | Dashboard nav |
| `users` | Users / team |
| `credit-card` | Billing |
| `bell` | Notifications |
| `sun` / `moon` | Theme toggle |
| `ellipsis` | More actions |
| `check` | Confirm, success |
| `activity` | Metrics, pulse |
| `arrow-up` | Export, upload emphasis |

## What we do **not** support

- **CDN SVG sprites** (`<use href="https://…#icon">`) — cross-origin `<use>` fails
  silently when the app and sprite are on different domains.
- **Runtime icon fonts** — not part of the bootcn CDN bundle; inline SVG keeps SSR
  apps flash-free with zero JS.

## Demo helper (PHP only)

This repo's demo includes `demo/partials/icons.php` — a local `icon('name')` helper
for the blessed set. Copy that pattern into your app or paste SVGs directly; it is
**not** shipped in `dist/`.
