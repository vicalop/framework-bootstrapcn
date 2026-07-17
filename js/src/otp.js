// Input OTP: segmented one-time-code input. Enhances a single <input>, keeping
// the full value in it (form submit / no-JS fallback) while showing N cells.
const store = new WeakMap();

class InputOTP {
  static getOrCreate(input) {
    let inst = store.get(input);
    if (!inst) { inst = new InputOTP(input); store.set(input, inst); }
    return inst;
  }

  constructor(input) {
    this.input = input;
    this.length = parseInt(input.dataset.length || input.getAttribute('maxlength') || '6', 10);
    this._build();
  }

  _build() {
    const input = this.input;
    const seed = (input.value || '').replace(/\D/g, '').slice(0, this.length);
    input.type = 'hidden';

    const wrap = document.createElement('div');
    wrap.className = 'bootcn-otp';
    this.cells = [];
    for (let i = 0; i < this.length; i++) {
      const c = document.createElement('input');
      c.type = 'text';
      c.inputMode = 'numeric';
      c.autocomplete = i === 0 ? 'one-time-code' : 'off';
      c.className = 'bootcn-otp-cell';
      c.maxLength = 1;
      c.value = seed[i] || '';
      c.setAttribute('aria-label', `Digit ${i + 1}`);
      c.addEventListener('input', (e) => this._onInput(i, e));
      c.addEventListener('keydown', (e) => this._onKey(i, e));
      c.addEventListener('focus', () => c.select());
      c.addEventListener('paste', (e) => this._onPaste(i, e));
      wrap.appendChild(c);
      this.cells.push(c);
    }
    input.parentNode.insertBefore(wrap, input.nextSibling);
    this.wrap = wrap;
    this._sync();
  }

  _sync() {
    const v = this.cells.map((c) => c.value).join('');
    this.input.value = v;
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
    if (v.length === this.length) {
      this.wrap.dispatchEvent(new CustomEvent('bootcn:complete', { detail: { value: v }, bubbles: true }));
    }
  }

  _onInput(i, e) {
    const v = e.target.value.replace(/\D/g, '');
    e.target.value = v.slice(-1);
    if (e.target.value && i < this.length - 1) this.cells[i + 1].focus();
    this._sync();
  }

  _onKey(i, e) {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      e.preventDefault();
      this.cells[i - 1].focus();
      this.cells[i - 1].value = '';
      this._sync();
    } else if (e.key === 'ArrowLeft' && i > 0) { this.cells[i - 1].focus(); }
    else if (e.key === 'ArrowRight' && i < this.length - 1) { this.cells[i + 1].focus(); }
  }

  _onPaste(i, e) {
    e.preventDefault();
    const txt = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/\D/g, '');
    for (let j = 0; j < txt.length && i + j < this.length; j++) this.cells[i + j].value = txt[j];
    this.cells[Math.min(i + txt.length, this.length - 1)].focus();
    this._sync();
  }

  get value() { return this.input.value; }
}

export { InputOTP };
