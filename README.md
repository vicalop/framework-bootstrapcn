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

## Updating Bootstrap

Bump `bootstrap` in `package.json`, then `npm install && npm run vendor:refresh && npm run build`.
