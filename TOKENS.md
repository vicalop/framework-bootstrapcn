# Design tokens — the reuse contract

The design tokens are the actual product of this project. The Bootstrap adapter
(`scss/_bs-variable-map.scss`) and every `bootcn` component read from them, so a
project that adopts the tokens gets a consistent shadcn look in light and dark
automatically. Tokens are the stable API you couple to across projects.

- **Machine-readable source of truth:** [`tokens.json`](./tokens.json)
- **Compiled defaults:** `scss/_tokens-light.scss`, `scss/_tokens-dark.scss`
- **Runtime schema version:** exposed as `bootcn.tokensVersion` and
  `tokens.json#/schemaVersion`

## Format

Colors are **shadcn/ui HSL channels** — `H S% L%` with no `hsl()` wrapper — and
are consumed on the page as `hsl(var(--token))`:

```css
:root { --primary: 240 5.9% 10%; }
.btn-primary { background: hsl(var(--primary)); }
```

This is why a raw HSL-channel token cannot populate Bootstrap's `--bs-*-rgb`
companion variables directly; see the "Known limitations" note in the README.

## Token reference

| Token | Purpose |
|---|---|
| `--background` / `--foreground` | Page surface and body text |
| `--card` / `--card-foreground` | Card surface and its text |
| `--popover` / `--popover-foreground` | Floating surfaces (menus, popovers) |
| `--primary` / `--primary-foreground` | Primary action color and its text |
| `--secondary` / `--secondary-foreground` | Secondary **surface** and its text |
| `--muted` / `--muted-foreground` | Muted surface and muted text |
| `--accent` / `--accent-foreground` | Hover/active surface and its text |
| `--destructive` / `--destructive-foreground` | Danger color and its text |
| `--border` | Default border color |
| `--input` | Form control border color |
| `--ring` | Focus ring color |
| `--radius` | Base corner radius (drives the Bootstrap radius scale) |

> `--secondary` is a light **surface** color, not a text color. Use
> `.text-body-secondary` (mapped to `--muted-foreground`) for muted text.

## Overriding tokens per project

Only override what you need — unset tokens keep the shadcn defaults. Precedence
follows normal CSS load order, so brand overrides must come **after** the theme.

### Prebuilt CSS consumers (recommended)

Copy [`brand.template.css`](./brand.template.css), edit it, and load it after the
theme bundle:

```html
<link rel="stylesheet" href="/dist/css/bootstrap-shadcn.min.css">
<link rel="stylesheet" href="/css/brand.css"> <!-- your edited copy -->
```

### Sass-source consumers

Override `scss/_tokens-brand.scss` (imported last among the token layers), or
re-declare tokens after importing the theme:

```scss
@import "bootstrap-shadcn-theme/scss"; // scss/theme.scss
:root { --primary: 221.2 83.2% 53.3%; }
[data-bs-theme="dark"] { --primary: 217.2 91.2% 59.8%; }
```

## Versioning policy (semver on the schema)

`schemaVersion` / `bootcn.tokensVersion` describe the **token contract**,
independent of the package `version`:

- **Patch** — default value tweaks only (no name changes).
- **Minor** — new tokens added (existing tokens unchanged).
- **Major** — a token is renamed or removed (breaking for consumers).

When you change tokens, update all of: `tokens.json`, the two `_tokens-*.scss`
files, and `bootcn.tokensVersion` in `js/src/index.js`, keeping them in sync.
