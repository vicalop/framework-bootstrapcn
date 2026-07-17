// Sidebar: a collapsible sidebar primitive. Toggles between full and an
// icon-rail (persisted); on small screens it slides in as an overlay.
const store = new WeakMap();

class Sidebar {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new Sidebar(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    this.key = el.dataset.bootcnSidebar || 'bootcn-sidebar';
    this.el.classList.add('bootcn-sidebar');
    if (localStorage.getItem(this.key) === 'collapsed') this.el.classList.add('is-collapsed');

    document.querySelectorAll('[data-bootcn-sidebar-toggle]').forEach((btn) => {
      const target = btn.getAttribute('data-bootcn-sidebar-toggle');
      if (!target || el.id === target) btn.addEventListener('click', () => this.toggle());
    });
    // dismiss the mobile overlay on outside click
    document.addEventListener('click', (e) => {
      if (this.el.classList.contains('is-open') &&
          !this.el.contains(e.target) &&
          !e.target.closest('[data-bootcn-sidebar-toggle]')) {
        this.el.classList.remove('is-open');
      }
    });
  }

  _isMobile() { return window.matchMedia('(max-width: 768px)').matches; }

  toggle() {
    if (this._isMobile()) { this.el.classList.toggle('is-open'); return; }
    const collapsed = this.el.classList.toggle('is-collapsed');
    localStorage.setItem(this.key, collapsed ? 'collapsed' : 'expanded');
  }

  collapse() { this.el.classList.add('is-collapsed'); localStorage.setItem(this.key, 'collapsed'); }
  expand() { this.el.classList.remove('is-collapsed'); localStorage.setItem(this.key, 'expanded'); }
}

export { Sidebar };
