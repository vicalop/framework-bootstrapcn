// Command palette (⌘K). Built on Bootstrap Modal; adds search filter, keyboard
// navigation, and run-on-enter. Reads its items from data-bootcn markup.
import { escapeHtml, bs } from './util.js';
import { SEARCH } from './icons.js';

const store = new WeakMap();

class Command {
  static getOrCreate(source) {
    let inst = store.get(source);
    if (!inst) { inst = new Command(source); store.set(source, inst); }
    return inst;
  }

  constructor(source) {
    this.source = source;
    this.onSelect = null;
    this.active = 0;
    this._build();
    this._bindHotkey();
  }

  _build() {
    const groups = [];
    this.source.querySelectorAll('[data-bootcn-command-group]').forEach((g) => {
      const items = Array.from(g.querySelectorAll('[data-bootcn-command-item]')).map((it) => ({
        label: it.textContent.trim(),
        href: it.dataset.href || null,
        shortcut: it.dataset.shortcut || null,
        id: it.dataset.id || null,
      }));
      groups.push({ name: g.getAttribute('data-bootcn-command-group'), items });
    });

    const modal = document.createElement('div');
    modal.className = 'modal fade bootcn-command-modal';
    modal.tabIndex = -1;
    modal.setAttribute('aria-label', 'Command menu');
    modal.innerHTML =
      `<div class="modal-dialog modal-dialog-scrollable"><div class="modal-content bootcn-command">` +
      `<div class="bootcn-command-search-wrap">${SEARCH}` +
      `<input type="text" class="bootcn-command-input" placeholder="Type a command or search…" autocomplete="off" spellcheck="false" aria-label="Search commands"></div>` +
      `<div class="bootcn-command-list"></div>` +
      `<div class="bootcn-command-empty" hidden>No results found.</div>` +
      `</div></div>`;
    document.body.appendChild(modal);

    const list = modal.querySelector('.bootcn-command-list');
    this.entries = [];
    groups.forEach((g) => {
      const gEl = document.createElement('div');
      gEl.className = 'bootcn-command-group';
      gEl.innerHTML = `<div class="bootcn-command-group-label">${escapeHtml(g.name)}</div>`;
      g.items.forEach((item) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'bootcn-command-item';
        b.innerHTML =
          `<span class="bootcn-command-item-label">${escapeHtml(item.label)}</span>` +
          (item.shortcut ? `<kbd class="bootcn-command-kbd">${escapeHtml(item.shortcut)}</kbd>` : '');
        b.addEventListener('click', () => this._run(item));
        b.addEventListener('mousemove', () => this._setActiveEl(b));
        gEl.appendChild(b);
        this.entries.push({ item, el: b, group: gEl, text: item.label.toLowerCase() });
      });
      list.appendChild(gEl);
    });

    this.modalEl = modal;
    this.inputEl = modal.querySelector('.bootcn-command-input');
    this.emptyEl = modal.querySelector('.bootcn-command-empty');
    this.modal = new (bs().Modal)(modal);

    modal.addEventListener('shown.bs.modal', () => {
      this.inputEl.value = '';
      this._filter('');
      this.inputEl.focus();
    });
    this.inputEl.addEventListener('input', () => this._filter(this.inputEl.value));
    this.inputEl.addEventListener('keydown', (e) => this._onKey(e));

    this.source.setAttribute('hidden', '');
  }

  _bindHotkey() {
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.open();
      }
    });
  }

  open() { this.modal.show(); }
  close() { this.modal.hide(); }

  _filter(query) {
    const q = query.toLowerCase().trim();
    let any = false;
    this.entries.forEach((en) => {
      const match = !q || en.text.indexOf(q) !== -1;
      en.el.hidden = !match;
      if (match) any = true;
    });
    this.modalEl.querySelectorAll('.bootcn-command-group').forEach((g) => {
      g.hidden = g.querySelectorAll('.bootcn-command-item:not([hidden])').length === 0;
    });
    this.emptyEl.hidden = any;
    this._setActive(0);
  }

  _visible() { return this.entries.filter((en) => !en.el.hidden); }

  _setActive(i) {
    const vis = this._visible();
    this.entries.forEach((en) => en.el.classList.remove('is-active'));
    if (!vis.length) { this.active = -1; return; }
    this.active = Math.max(0, Math.min(i, vis.length - 1));
    const el = vis[this.active].el;
    el.classList.add('is-active');
    el.scrollIntoView({ block: 'nearest' });
  }

  _setActiveEl(el) {
    const vis = this._visible();
    const idx = vis.findIndex((en) => en.el === el);
    if (idx >= 0) this._setActive(idx);
  }

  _onKey(e) {
    const vis = this._visible();
    if (e.key === 'ArrowDown') { e.preventDefault(); this._setActive(this.active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); this._setActive(this.active - 1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (vis[this.active]) this._run(vis[this.active].item); }
  }

  _run(item) {
    this.close();
    if (typeof this.onSelect === 'function') this.onSelect(item);
    this.modalEl.dispatchEvent(new CustomEvent('bootcn:select', { detail: item }));
    if (item.href) window.location.href = item.href;
  }
}

export { Command };
