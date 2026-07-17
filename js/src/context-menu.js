// Context menu: right-click a trigger to open a cursor-positioned menu.
// Reuses Bootstrap's .dropdown-menu / .dropdown-item styling.
const store = new WeakMap();

class ContextMenu {
  static getOrCreate(root) {
    let inst = store.get(root);
    if (!inst) { inst = new ContextMenu(root); store.set(root, inst); }
    return inst;
  }

  constructor(root) {
    this.root = root;
    this.trigger = root.querySelector('[data-bootcn-context-trigger]') || root;
    this.source = root.querySelector('[data-bootcn-context-content]');
    this._build();
  }

  _build() {
    this.pop = document.createElement('div');
    this.pop.className = 'dropdown-menu bootcn-context-menu';

    const nodes = this.source ? Array.from(this.source.children) : [];
    nodes.forEach((node) => {
      if (node.tagName === 'HR' || node.hasAttribute('data-bootcn-context-sep')) {
        const hr = document.createElement('hr');
        hr.className = 'dropdown-divider';
        this.pop.appendChild(hr);
        return;
      }
      const disabled = node.hasAttribute('data-disabled') || node.hasAttribute('disabled');
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'dropdown-item';
      if (disabled) item.classList.add('disabled');
      if (node.dataset.variant === 'danger' || node.classList.contains('text-danger')) item.classList.add('text-danger');
      if (node.dataset.shortcut) {
        item.innerHTML = `<span>${node.innerHTML}</span><kbd class="bootcn-context-kbd">${node.dataset.shortcut}</kbd>`;
        item.classList.add('d-flex', 'justify-content-between', 'align-items-center');
      } else {
        item.innerHTML = node.innerHTML;
      }
      if (!disabled) item.addEventListener('click', () => { this.hide(); node.click(); });
      this.pop.appendChild(item);
    });

    document.body.appendChild(this.pop);
    if (this.source) this.source.setAttribute('hidden', '');

    this.trigger.addEventListener('contextmenu', (e) => { e.preventDefault(); this.show(e.clientX, e.clientY); });
    document.addEventListener('click', () => this.hide());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });
    window.addEventListener('resize', () => this.hide());
    window.addEventListener('scroll', () => this.hide(), true);
  }

  show(x, y) {
    const p = this.pop;
    p.style.position = 'fixed';
    p.style.display = 'block';
    p.classList.add('show');
    p.style.left = '0px';
    p.style.top = '0px';
    const r = p.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let nx = x;
    let ny = y;
    if (x + r.width > vw - 8) nx = Math.max(8, x - r.width);
    if (y + r.height > vh - 8) ny = Math.max(8, y - r.height);
    p.style.left = nx + 'px';
    p.style.top = ny + 'px';
  }

  hide() {
    this.pop.classList.remove('show');
    this.pop.style.display = 'none';
  }
}

export { ContextMenu };
