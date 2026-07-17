// Resizable: draggable split panes. Handles are auto-inserted between panels.
const store = new WeakMap();

class Resizable {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new Resizable(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    this.horizontal = (el.dataset.direction || 'horizontal') !== 'vertical';
    this.min = parseInt(el.dataset.min || '48', 10);
    this._build();
  }

  _build() {
    this.el.classList.add('bootcn-resizable');
    this.el.classList.toggle('is-vertical', !this.horizontal);
    this.panels = Array.from(this.el.querySelectorAll(':scope > [data-bootcn-panel]'));
    this.panels.forEach((p) => { if (!p.style.flex) p.style.flex = '1 1 0'; });
    for (let i = 0; i < this.panels.length - 1; i++) {
      const h = document.createElement('div');
      h.className = 'bootcn-resizable-handle';
      h.setAttribute('role', 'separator');
      h.setAttribute('aria-orientation', this.horizontal ? 'vertical' : 'horizontal');
      h.tabIndex = 0;
      h.innerHTML = '<span class="bootcn-resizable-grip"></span>';
      this.panels[i].after(h);
      this._bind(h, this.panels[i], this.panels[i + 1]);
    }
  }

  _measure(a, b) {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const sa = this.horizontal ? ra.width : ra.height;
    const sb = this.horizontal ? rb.width : rb.height;
    return { sa, sb, total: sa + sb };
  }

  _apply(a, b, newA, total) {
    const na = Math.min(Math.max(newA, this.min), total - this.min);
    a.style.flex = `0 0 ${na}px`;
    b.style.flex = `0 0 ${total - na}px`;
  }

  _bind(handle, a, b) {
    handle.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
      const start = this.horizontal ? e.clientX : e.clientY;
      const { sa, total } = this._measure(a, b);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = this.horizontal ? 'col-resize' : 'row-resize';
      handle.classList.add('is-dragging');
      const move = (ev) => {
        const cur = this.horizontal ? ev.clientX : ev.clientY;
        this._apply(a, b, sa + (cur - start), total);
      };
      const up = () => {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', up);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        handle.classList.remove('is-dragging');
      };
      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up);
    });

    handle.addEventListener('keydown', (e) => {
      const step = 24;
      let d = 0;
      if (this.horizontal) { if (e.key === 'ArrowLeft') d = -step; else if (e.key === 'ArrowRight') d = step; }
      else { if (e.key === 'ArrowUp') d = -step; else if (e.key === 'ArrowDown') d = step; }
      if (!d) return;
      e.preventDefault();
      const { sa, total } = this._measure(a, b);
      this._apply(a, b, sa + d, total);
    });
  }
}

export { Resizable };
