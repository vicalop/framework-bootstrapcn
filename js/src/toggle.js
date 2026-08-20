// Toggle / Toggle Group — shadcn pressed-state buttons. CSS-only look;
// JS keeps aria-pressed in sync and enforces single vs multiple selection.
const store = new WeakMap();
const groupStore = new WeakMap();

class Toggle {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new Toggle(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    el.classList.add('bootcn-toggle');
    if (!el.hasAttribute('aria-pressed')) el.setAttribute('aria-pressed', 'false');
    el.addEventListener('click', () => this.toggle());
  }

  get pressed() { return this.el.getAttribute('aria-pressed') === 'true'; }

  setPressed(on) {
    this.el.setAttribute('aria-pressed', on ? 'true' : 'false');
    this.el.dispatchEvent(new CustomEvent('bootcn:toggle', {
      detail: { pressed: !!on, value: this.el.dataset.value },
      bubbles: true,
    }));
  }

  toggle() { this.setPressed(!this.pressed); }
}

class ToggleGroup {
  static getOrCreate(el) {
    let inst = groupStore.get(el);
    if (!inst) { inst = new ToggleGroup(el); groupStore.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    this.type = el.dataset.type === 'multiple' ? 'multiple' : 'single';
    el.classList.add('bootcn-toggle-group');
    this.items = Array.from(el.querySelectorAll('.bootcn-toggle, [data-bootcn-toggle], :scope > button'));
    this.items.forEach((btn) => {
      btn.classList.add('bootcn-toggle');
      if (!btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this._onClick(btn);
      });
    });
    // Honour a pre-pressed button as the default for single groups.
    if (this.type === 'single' && !this.items.some((b) => b.getAttribute('aria-pressed') === 'true')) {
      const def = this.items.find((b) => b.hasAttribute('data-default')) || null;
      if (def) def.setAttribute('aria-pressed', 'true');
    }
  }

  _onClick(btn) {
    if (this.type === 'single') {
      this.items.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
    } else {
      const next = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', next ? 'true' : 'false');
    }
    this.el.dispatchEvent(new CustomEvent('bootcn:change', {
      detail: { value: this.value },
      bubbles: true,
    }));
  }

  get value() {
    const pressed = this.items.filter((b) => b.getAttribute('aria-pressed') === 'true');
    if (this.type === 'single') return pressed[0] ? pressed[0].dataset.value : null;
    return pressed.map((b) => b.dataset.value);
  }
}

export { Toggle, ToggleGroup };
