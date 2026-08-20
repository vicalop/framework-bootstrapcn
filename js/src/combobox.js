// Combobox: progressive enhancement of a native <select>. Uses Bootstrap's
// Dropdown for positioning + outside-click; adds search, keyboard nav, selection.
import { escapeHtml, escapeAttr, bs } from './util.js';
import { CHECK, CHEVRON, SEARCH } from './icons.js';

const store = new WeakMap();

class Combobox {
  static getOrCreate(select) {
    let inst = store.get(select);
    if (!inst) { inst = new Combobox(select); store.set(select, inst); }
    return inst;
  }

  constructor(select) {
    this.select = select;
    this.placeholder = select.dataset.placeholder || 'Select…';
    this.searchPlaceholder = select.dataset.searchPlaceholder || 'Search…';
    this.emptyText = select.dataset.empty || 'No results found.';
    // data-bootcn-select (or data-search="false") is shadcn Select: no search field.
    this.searchable = select.hasAttribute('data-bootcn-select')
      ? false
      : select.dataset.search !== 'false';
    this.active = -1;
    this._build();
  }

  _build() {
    const select = this.select;
    select.classList.add('bootcn-combobox-native');
    select.setAttribute('tabindex', '-1');
    select.setAttribute('aria-hidden', 'true');

    const wrap = document.createElement('div');
    wrap.className = 'dropdown bootcn-combobox';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'btn btn-outline-secondary bootcn-combobox-trigger';
    trigger.setAttribute('data-bs-toggle', 'dropdown');
    trigger.setAttribute('data-bs-auto-close', 'outside');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = `<span class="bootcn-combobox-label"></span>${CHEVRON}`;

    if (!this.searchable) wrap.classList.add('is-select');

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu bootcn-combobox-menu';
    const search = this.searchable
      ? `<div class="bootcn-combobox-search-wrap">${SEARCH}` +
        `<input type="text" class="bootcn-combobox-search" placeholder="${escapeAttr(this.searchPlaceholder)}" autocomplete="off" spellcheck="false"></div>`
      : '';
    menu.innerHTML =
      search +
      `<ul class="bootcn-combobox-list" role="listbox"></ul>` +
      `<div class="bootcn-combobox-empty" hidden>${escapeHtml(this.emptyText)}</div>`;

    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    select.parentNode.insertBefore(wrap, select.nextSibling);

    this.wrap = wrap;
    this.trigger = trigger;
    this.menu = menu;
    this.labelEl = trigger.querySelector('.bootcn-combobox-label');
    this.searchEl = menu.querySelector('.bootcn-combobox-search');
    this.listEl = menu.querySelector('.bootcn-combobox-list');
    this.emptyEl = menu.querySelector('.bootcn-combobox-empty');

    this._renderOptions();
    this._syncLabel();
    this.dropdown = bs().Dropdown.getOrCreateInstance(trigger);

    trigger.parentNode.addEventListener('shown.bs.dropdown', () => {
      if (this.searchEl) {
        this.searchEl.value = '';
        this._filter('');
        this.searchEl.focus();
      } else {
        this.trigger.focus();
      }
      const sel = this.items.findIndex((it) => it.value === this.select.value);
      this._setActive(sel >= 0 ? this._visibleIndexOf(sel) : 0);
    });

    if (this.searchEl) {
      this.searchEl.addEventListener('input', () => this._filter(this.searchEl.value));
      this.searchEl.addEventListener('keydown', (e) => this._onKey(e));
    } else {
      trigger.addEventListener('keydown', (e) => {
        if (this.trigger.getAttribute('aria-expanded') === 'true') this._onKey(e);
      });
    }
  }

  _renderOptions() {
    this.listEl.innerHTML = '';
    this.items = [];
    Array.from(this.select.options).forEach((opt) => {
      if (opt.value === '' && (opt.disabled || opt.hidden)) return;
      const li = document.createElement('li');
      li.className = 'bootcn-combobox-item';
      li.setAttribute('role', 'option');
      li.dataset.value = opt.value;
      li.innerHTML =
        `<span class="bootcn-combobox-check">${CHECK}</span>` +
        `<span class="bootcn-combobox-text">${escapeHtml(opt.textContent)}</span>`;
      li.addEventListener('click', () => this._choose(opt.value));
      li.addEventListener('mousemove', () => this._setActive(this._visibleIndexOf(this.items.findIndex((i) => i.li === li))));
      this.listEl.appendChild(li);
      this.items.push({ li, value: opt.value, text: opt.textContent.toLowerCase() });
    });
    this._markSelected();
  }

  _markSelected() {
    const value = this.select.value;
    this.items.forEach((it) => it.li.setAttribute('aria-selected', it.value === value ? 'true' : 'false'));
  }

  _syncLabel() {
    const opt = this.select.selectedOptions[0];
    const hasValue = opt && opt.value !== '';
    this.labelEl.textContent = hasValue ? opt.textContent : this.placeholder;
    this.trigger.dataset.empty = hasValue ? 'false' : 'true';
  }

  _filter(query) {
    const q = query.toLowerCase().trim();
    let any = false;
    this.items.forEach((it) => {
      const match = !q || it.text.indexOf(q) !== -1;
      it.li.hidden = !match;
      if (match) any = true;
    });
    this.emptyEl.hidden = any;
    this._setActive(0);
  }

  _visible() { return this.items.filter((it) => !it.li.hidden); }
  _visibleIndexOf(itemIndex) {
    if (itemIndex < 0) return 0;
    const target = this.items[itemIndex];
    return Math.max(0, this._visible().indexOf(target));
  }

  _setActive(i) {
    const vis = this._visible();
    this.items.forEach((it) => it.li.classList.remove('is-active'));
    if (!vis.length) { this.active = -1; return; }
    this.active = Math.max(0, Math.min(i, vis.length - 1));
    const el = vis[this.active].li;
    el.classList.add('is-active');
    el.scrollIntoView({ block: 'nearest' });
  }

  _onKey(e) {
    const vis = this._visible();
    if (e.key === 'ArrowDown') { e.preventDefault(); this._setActive(this.active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this._setActive(this.active - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (vis[this.active]) this._choose(vis[this.active].value); }
    else if (e.key === 'Escape') { e.preventDefault(); this.dropdown.hide(); this.trigger.focus(); }
  }

  _choose(value) {
    this.select.value = value;
    this.select.dispatchEvent(new Event('change', { bubbles: true }));
    this._markSelected();
    this._syncLabel();
    this.dropdown.hide();
    this.trigger.focus();
  }

  get value() { return this.select.value; }
  set value(v) { this._choose(v); }
}

export { Combobox };
