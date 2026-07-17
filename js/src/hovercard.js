// Hover card: rich preview shown on hover/focus of a trigger, after a delay.
const store = new WeakMap();

class HoverCard {
  static getOrCreate(root) {
    let inst = store.get(root);
    if (!inst) { inst = new HoverCard(root); store.set(root, inst); }
    return inst;
  }

  constructor(root) {
    this.root = root;
    this.trigger = root.querySelector('[data-bootcn-hovercard-trigger]') || root.firstElementChild;
    this.source = root.querySelector('[data-bootcn-hovercard-content]');
    this.openDelay = parseInt(root.dataset.openDelay || '250', 10);
    this.closeDelay = parseInt(root.dataset.closeDelay || '150', 10);
    this._build();
  }

  _build() {
    this.card = document.createElement('div');
    this.card.className = 'bootcn-hovercard-pop';
    this.card.hidden = true;
    if (this.source) { this.card.innerHTML = this.source.innerHTML; this.source.remove(); }
    document.body.appendChild(this.card);

    const enter = () => { clearTimeout(this.closeT); this.openT = setTimeout(() => this.show(), this.openDelay); };
    const leave = () => { clearTimeout(this.openT); this.closeT = setTimeout(() => this.hide(), this.closeDelay); };
    this.trigger.addEventListener('mouseenter', enter);
    this.trigger.addEventListener('mouseleave', leave);
    this.trigger.addEventListener('focus', enter);
    this.trigger.addEventListener('blur', leave);
    this.card.addEventListener('mouseenter', () => clearTimeout(this.closeT));
    this.card.addEventListener('mouseleave', leave);
  }

  show() {
    const t = this.trigger.getBoundingClientRect();
    this.card.hidden = false;
    this.card.style.position = 'absolute';
    const r = this.card.getBoundingClientRect();
    let left = window.scrollX + t.left;
    let top = window.scrollY + t.bottom + 8;
    if (left + r.width > window.scrollX + window.innerWidth - 8) {
      left = window.scrollX + window.innerWidth - r.width - 8;
    }
    if (t.bottom + 8 + r.height > window.innerHeight && t.top - 8 - r.height > 0) {
      top = window.scrollY + t.top - r.height - 8;
    }
    this.card.style.left = Math.max(8, left) + 'px';
    this.card.style.top = top + 'px';
    void this.card.offsetWidth; // force reflow so the transition runs from hidden
    this.card.classList.add('is-visible');
  }

  hide() {
    this.card.classList.remove('is-visible');
    setTimeout(() => { if (!this.card.classList.contains('is-visible')) this.card.hidden = true; }, 160);
  }
}

export { HoverCard };
