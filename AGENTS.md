# AGENTS.md

Guidance for AI agents and contributors working in this repo. Read this before
making changes, and follow the release workflow below to version changes.

## What this is

`@vicalop/bootstrap-shadcn-theme` — a shadcn/ui theme for Bootstrap 5.3 (compiled
from vendored Bootstrap Sass) plus `bootcn`, a set of net-new vanilla-JS
components. It is **token-driven**: the shadcn design tokens are the reusable
contract, consumed by both the Bootstrap adapter and every `bootcn` component.

- Sass sources: `scss/` (entry point `scss/theme.scss`)
- JS sources: `js/src/` (entry point `js/src/index.js`, bundled to `bootcn`)
- Tokens: `scss/_tokens-light.scss`, `scss/_tokens-dark.scss`, mirrored in
  `tokens.json` (machine-readable contract). See `TOKENS.md`.
- Build output: `dist/` — **gitignored on `main`**, produced by `npm run build`.

The consumer-facing map (shadcn name → Bootstrap / `bootcn` markup) lives in
`README.md`. The live catalog is `demo/index.html`.

## Project status

Parity here means **token-colored Bootstrap 5.3 markup or a `bootcn` equivalent
for every official shadcn/ui component** — not a React/Radix/Tailwind port.
Do not rebuild the catalog from scratch; extend it when shadcn adds a new
official primitive, or when the human asks for deeper fidelity.

### Done

- **Phase 1 — Bootstrap theme.** Vendored Bootstrap 5.3 Sass, runtime HSL
  tokens, `--bs-*` remap, surgical overrides, Inter, light/dark via
  `data-bs-theme`.
- **Phase 2 — bootcn.** Vanilla-JS / CSS-only components Bootstrap does not
  ship: toasts (Sonner-style), avatar, combobox, command, OTP, calendar, date
  picker, context menu, hover card, resizable, menubar, navigation menu, data
  table, sidebar/app shell, scroll area, icons.
- **Catalog parity (on `main`, Aug 2026).** Every official shadcn/ui component
  listed at ui.shadcn.com now has a themed Bootstrap widget or a `bootcn`
  counterpart, plus a kitchen-sink section. Added in that pass:
  - Token schema **1.2.0**: `--chart-1` … `--chart-5`
  - CSS: Field, Separator, Kbd, Skeleton, Empty, Item, Toggle look, Alert Dialog
    layout, ghost button, outline/destructive badges
  - JS: Toggle / Toggle Group, Chart (`bar` / `line` / `area` / `donut`),
    Select (`data-bootcn-select` = combobox without search), tooltip/popover
    auto-init
  - Restyles: accordion, breadcrumb, pagination, progress, spinner, slider,
    popover/tooltip, input group, carousel, alerts
- **Packaging.** jsDelivr GitHub-tag CDN, release Action, Lucide as the icon
  system. Example pages: dashboard, users, settings, login, signup.

### Current versions

| | Value | Notes |
|---|---|---|
| `package.json` `version` | `0.3.0` | CDN tag `v0.3.0` (catalog parity). Do not retag `v0.2.3`. |
| Token schema | `1.2.0` | `tokens.json` + `bootcn.tokensVersion` |

### Left to do

**Catalog maintenance.** When shadcn publishes a new official component, add a
Bootstrap restyle or `bootcn` equivalent, a `demo/index.html` section, and a
README row. Re-check [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)
(or `https://ui.shadcn.com/llms.txt`) rather than assuming the Aug 2026 list is
frozen.

**Fidelity gaps (components exist; these are depth, not missing names):**

- Chart is a token-colored SVG, not Recharts (no stacked/composed charts).
- Slider is single-thumb `.form-range`; no dual-thumb range.
- Select has no option groups / separators like Radix Select.
- Direction is `dir="rtl"`, not a JS direction provider.
- Form is `.bootcn-field` + native `<form>`, not React Hook Form.
- Bootstrap `-rgb` utilities still use stock colors: `.alert-primary`,
  `.alert-success`, `.list-group-item-*`. Use `.alert` / `.alert-danger` for
  shadcn default + destructive. `.text-secondary` / `.bg-secondary` stay
  unmapped on purpose (see README Known limitations).
- Original design mentioned regenerating `$theme-colors` at Sass compile time;
  theming is runtime CSS-var remap + overrides instead. Only revisit if
  `-rgb` coverage becomes a real consumer problem.
- Demo app pages (dashboard/users/…) do not yet use every new primitive.

**Optional / out of band.** `npm publish` for the npm/jsDelivr-npm URLs (README
notes this is still a one-time unpublished step). Pixel-level visual QA of the
kitchen sink in light and dark. Do not invent extra docs files unless asked.

## Git workflow (repo owner's preference)

- **Commit directly to `main` and push to `main`.** Do not create feature
  branches, and do not open pull requests.
- Make small, logical commits with clear messages; push them straight to `main`.
- Never leave `main` for day-to-day work. The only other refs that exist are
  release tags (`v*`), which are created only when explicitly requested (see the
  release workflow below).
- Do not force-push or rewrite `main` history.

## Build & verify

```bash
npm install      # first time
npm run build    # -> dist/css/*.css, dist/js/bootcn.{js,esm.js,min.js}, fonts, brand template
```

Always run `npm run build` after changing anything in `scss/`, `js/src/`, or
`assets/` and confirm it completes without errors before releasing.

## Versioning policy (semver)

Two independent versions:

- **Package version** (`package.json` `version`) — the release version used for
  tags and CDN URLs. Bump it for any shipped change.
- **Token schema version** (`tokens.json` `schemaVersion` and
  `bootcn.tokensVersion` in `js/src/index.js`) — describes the token *contract*:
  - patch = default value tweaks, minor = tokens added, major = token
    renamed/removed.

When you change tokens, keep these in sync: `tokens.json`, both
`scss/_tokens-*.scss` files, and `bootcn.tokensVersion`. Do not change token
values without bumping the token schema version accordingly.

## Release workflow (how changes get versioned & distributed)

Distribution is via jsDelivr's GitHub route, served from a version tag:

```
https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/...
```

The [`.github/workflows/release.yml`](.github/workflows/release.yml) Action
(triggered on `v*` tags) builds `dist/` and attaches it to the tag (jsDelivr does
not run builds, and `dist/` is gitignored on `main`, so the Action bridges that).
The build commit is reachable only via the tag, keeping `main` history clean.

**A normal commit/push does NOT publish to the CDN.** Only pushing a `v*` tag
does. Pushing source or docs changes to a branch or to `main` updates GitHub
only — jsDelivr keeps serving existing tags unchanged. Do not create a release
tag unless the human explicitly asks for one. Docs-only or source-only changes
should ride along in `main` without a version bump; a new CDN version is
warranted only when the built `dist/` actually changes (README/docs never ship
in the CDN assets — only `dist/` does).

To cut a release (only when explicitly requested):

1. Make and commit your source changes directly on `main` and push them.
2. On `main`, bump `version` in `package.json` (and the token schema version in
   `tokens.json` + `js/src/index.js` if tokens changed). Commit and push.
3. Tag the release **matching `package.json`** and push the tag:

   ```bash
   git tag vX.Y.Z        # must equal package.json version (the Action enforces this)
   git push origin vX.Y.Z
   ```

4. The Action builds, attaches `dist/`, re-points the tag, purges jsDelivr's
   `@latest` cache (`https://purge.jsdelivr.net/gh/<owner>/<repo>@latest/...`),
   and prints the jsDelivr URLs in its run summary. Verify success:

   ```bash
   gh run list --workflow release.yml --limit 1
   # pinned tag resolves:
   curl -sI "https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/css/bootstrap-shadcn.min.css"
   # @latest points at the new release (after purge):
   curl -sI "https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/css/bootstrap-shadcn.min.css" | grep -i x-jsd-version
   ```

### Release rules (important)

- **Only a `v*` tag publishes.** Branch/`main` pushes never version the CDN; a
  README-only or docs-only change never needs (and should not get) a release.
- **Tags are immutable.** Never move, delete, or recreate a tag that has already
  been published/consumed — jsDelivr caches by tag. To fix or change a release,
  bump to a new version and tag that instead.
- **The tag must match `package.json`.** The Action fails otherwise.
- **The repo must stay public** for the jsDelivr `/gh` route to serve files.
- **Do not commit `dist/` to `main`.** Only the release Action attaches it to
  tags. Keep `dist/` in `.gitignore`.

## Consuming in projects

Pure HTML/PHP (no build tooling), `@latest` (auto-updates on each release):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/css/bootstrap-shadcn.min.css">
<script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@latest/dist/js/bootcn.min.js"></script>
```

Pin `@vX.Y.Z` instead when you need a fixed version or immutable CDN caching.

Load order is always: theme CSS → Bootstrap JS bundle → `bootcn` JS. Dark mode is
`data-bs-theme="dark"`. See `README.md` for npm/Sass consumption and `TOKENS.md`
for branding.
