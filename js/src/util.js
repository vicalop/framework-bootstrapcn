// Shared helpers for the bootcn component library.
export function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
}

export function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

// Bootstrap's JS is a peer dependency loaded on the page before bootcn.
export function bs() {
  return window.bootstrap;
}
