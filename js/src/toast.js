// Sonner-style toaster. Lightweight, stacked, auto-dismiss, token-styled.
import { escapeHtml } from './util.js';
import { CHECKCIRCLE, XCIRCLE, ALERT, INFO } from './icons.js';

const ICONS = { success: CHECKCIRCLE, error: XCIRCLE, warning: ALERT, info: INFO };

class Toaster {
  constructor(options = {}) {
    this.position = options.position || 'bottom-right';
    this.container = null;
  }

  _ensure() {
    if (this.container && document.body.contains(this.container)) return this.container;
    const c = document.createElement('div');
    c.className = 'bootcn-toaster';
    c.dataset.position = this.position;
    c.setAttribute('role', 'region');
    c.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(c);
    this.container = c;
    return c;
  }

  show(message, options = {}) {
    const c = this._ensure();
    if (options.position && options.position !== this.position) {
      this.position = options.position;
      c.dataset.position = this.position;
    }
    const variant = options.variant || 'default';
    const duration = options.duration == null ? 4000 : options.duration;

    const el = document.createElement('div');
    el.className = 'bootcn-toast';
    el.dataset.variant = variant;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');

    const icon = variant !== 'default' && ICONS[variant]
      ? `<span class="bootcn-toast-icon">${ICONS[variant]}</span>` : '';
    const desc = options.description
      ? `<div class="bootcn-toast-desc">${escapeHtml(options.description)}</div>` : '';
    const action = options.action
      ? `<button type="button" class="bootcn-toast-action">${escapeHtml(options.action.label)}</button>` : '';
    el.innerHTML =
      `${icon}<div class="bootcn-toast-content">` +
      `<div class="bootcn-toast-title">${escapeHtml(message)}</div>${desc}</div>` +
      `${action}<button type="button" class="bootcn-toast-close" aria-label="Dismiss">&times;</button>`;

    const top = this.position.indexOf('top') === 0;
    if (top) c.appendChild(el); else c.prepend(el);
    requestAnimationFrame(() => el.classList.add('is-visible'));

    let timer;
    const dismiss = () => {
      if (el.dataset.dismissing) return;
      el.dataset.dismissing = '1';
      clearTimeout(timer);
      el.classList.remove('is-visible');
      el.classList.add('is-leaving');
      const done = () => el.remove();
      el.addEventListener('transitionend', done, { once: true });
      setTimeout(done, 400);
    };
    const start = () => { if (duration > 0) timer = setTimeout(dismiss, duration); };
    const stop = () => clearTimeout(timer);

    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', start);
    el.querySelector('.bootcn-toast-close').addEventListener('click', dismiss);
    const actionBtn = el.querySelector('.bootcn-toast-action');
    if (actionBtn) actionBtn.addEventListener('click', () => {
      try { if (options.action.onClick) options.action.onClick(); } finally { dismiss(); }
    });

    start();
    return { dismiss, el };
  }
}

const toaster = new Toaster();
function toast(message, options) { return toaster.show(message, options); }
toast.success = (m, o) => toast(m, Object.assign({}, o, { variant: 'success' }));
toast.error = (m, o) => toast(m, Object.assign({}, o, { variant: 'error' }));
toast.warning = (m, o) => toast(m, Object.assign({}, o, { variant: 'warning' }));
toast.info = (m, o) => toast(m, Object.assign({}, o, { variant: 'info' }));
toast.message = (m, o) => toast(m, o);

export { toast, Toaster };
