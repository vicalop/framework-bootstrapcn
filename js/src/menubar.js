// Menubar: desktop-app menu bar. Each top-level item is a Bootstrap Dropdown;
// hovering another item while one is open switches to it, and ←/→ move between.
import { bs } from './util.js';

const store = new WeakMap();

class Menubar {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new Menubar(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    this._build();
  }

  _build() {
    this.el.classList.add('bootcn-menubar');
    this.triggers = Array.from(this.el.querySelectorAll('.bootcn-menubar-trigger, [data-bs-toggle="dropdown"]'));
    this.triggers.forEach((t, i) => {
      t.classList.add('bootcn-menubar-trigger');
      if (!t.getAttribute('data-bs-toggle')) t.setAttribute('data-bs-toggle', 'dropdown');
      const dd = bs().Dropdown.getOrCreateInstance(t);
      t.addEventListener('mouseenter', () => {
        if (this._anyOpen() && t.getAttribute('aria-expanded') !== 'true') {
          this._closeAll();
          dd.show();
        }
      });
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); this._move(i, 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); this._move(i, -1); }
      });
    });
  }

  _anyOpen() { return this.triggers.some((t) => t.getAttribute('aria-expanded') === 'true'); }
  _closeAll() { this.triggers.forEach((t) => { const dd = bs().Dropdown.getInstance(t); if (dd) dd.hide(); }); }

  _move(i, dir) {
    const n = this.triggers.length;
    const wasOpen = this._anyOpen();
    const t = this.triggers[(i + dir + n) % n];
    if (wasOpen) { this._closeAll(); bs().Dropdown.getOrCreateInstance(t).show(); }
    t.focus();
  }
}

export { Menubar };
