// Navigation Menu: horizontal nav where items reveal a content panel on
// hover/focus/click. Plain links (no panel) just navigate.
const store = new WeakMap();

class NavigationMenu {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new NavigationMenu(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    this._build();
  }

  _build() {
    this.el.classList.add('bootcn-navmenu');
    this.items = Array.from(this.el.querySelectorAll('.bootcn-navmenu-item'));
    this.items.forEach((item) => {
      const trigger = item.querySelector('.bootcn-navmenu-trigger');
      const content = item.querySelector('.bootcn-navmenu-content');
      if (!trigger || !content) return;
      trigger.setAttribute('aria-expanded', 'false');

      const open = () => { clearTimeout(this._t); this._closeOthers(item); item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
      const close = () => { this._t = setTimeout(() => { item.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }, 130); };

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      trigger.addEventListener('click', (e) => { e.preventDefault(); item.classList.contains('is-open') ? this._closeAll() : open(); });
      trigger.addEventListener('keydown', (e) => { if (e.key === 'Escape') this._closeAll(); });
    });
    document.addEventListener('click', (e) => { if (!this.el.contains(e.target)) this._closeAll(); });
  }

  _closeOthers(except) { this.items.forEach((i) => { if (i !== except) this._reset(i); }); }
  _closeAll() { this.items.forEach((i) => this._reset(i)); }
  _reset(item) {
    item.classList.remove('is-open');
    const t = item.querySelector('.bootcn-navmenu-trigger');
    if (t) t.setAttribute('aria-expanded', 'false');
  }
}

export { NavigationMenu };
