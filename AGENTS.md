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

1. Make and commit your source changes on a branch; get them merged to `main`.
2. On `main`, bump `version` in `package.json` (and the token schema version in
   `tokens.json` + `js/src/index.js` if tokens changed). Commit and push.
3. Tag the release **matching `package.json`** and push the tag:

   ```bash
   git tag vX.Y.Z        # must equal package.json version (the Action enforces this)
   git push origin vX.Y.Z
   ```

4. The Action builds, attaches `dist/`, re-points the tag, and prints the
   jsDelivr URLs in its run summary. Verify success:

   ```bash
   gh run list --workflow release.yml --limit 1
   # then check an asset resolves:
   curl -sI "https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/css/bootstrap-shadcn.min.css"
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

Pure HTML/PHP (no build tooling), version-pinned:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/css/bootstrap-shadcn.min.css">
<script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/vicalop/framework-bootstrapcn@vX.Y.Z/dist/js/bootcn.min.js"></script>
```

Load order is always: theme CSS → Bootstrap JS bundle → `bootcn` JS. Dark mode is
`data-bs-theme="dark"`. See `README.md` for npm/Sass consumption and `TOKENS.md`
for branding.
