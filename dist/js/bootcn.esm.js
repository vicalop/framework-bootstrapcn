// js/src/util.js
function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}
function bs() {
  return window.bootstrap;
}

// js/src/icons.js
var svg = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
var CHECK = svg('<path d="M20 6 9 17l-5-5"/>');
var CHEVRON = svg('<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>');
var SEARCH = svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
var CHECKCIRCLE = svg('<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>');
var XCIRCLE = svg('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>');
var ALERT = svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>');
var INFO = svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>');
var CHEVLEFT = svg('<path d="m15 18-6-6 6-6"/>');
var CHEVRIGHT = svg('<path d="m9 18 6-6-6-6"/>');
var CALENDAR = svg('<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>');

// js/src/toast.js
var ICONS = { success: CHECKCIRCLE, error: XCIRCLE, warning: ALERT, info: INFO };
var Toaster = class {
  constructor(options = {}) {
    this.position = options.position || "bottom-right";
    this.container = null;
  }
  _ensure() {
    if (this.container && document.body.contains(this.container)) return this.container;
    const c = document.createElement("div");
    c.className = "bootcn-toaster";
    c.dataset.position = this.position;
    c.setAttribute("role", "region");
    c.setAttribute("aria-label", "Notifications");
    document.body.appendChild(c);
    this.container = c;
    return c;
  }
  show(message, options = {}) {
    const c = this._ensure();
    if (options.position && options.position !== this.position) {
      this.position = options.position;
      c.dataset.position = this.position;
    }
    const variant = options.variant || "default";
    const duration = options.duration == null ? 4e3 : options.duration;
    const el = document.createElement("div");
    el.className = "bootcn-toast";
    el.dataset.variant = variant;
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    const icon = variant !== "default" && ICONS[variant] ? `<span class="bootcn-toast-icon">${ICONS[variant]}</span>` : "";
    const desc = options.description ? `<div class="bootcn-toast-desc">${escapeHtml(options.description)}</div>` : "";
    const action = options.action ? `<button type="button" class="bootcn-toast-action">${escapeHtml(options.action.label)}</button>` : "";
    el.innerHTML = `${icon}<div class="bootcn-toast-content"><div class="bootcn-toast-title">${escapeHtml(message)}</div>${desc}</div>${action}<button type="button" class="bootcn-toast-close" aria-label="Dismiss">&times;</button>`;
    const top = this.position.indexOf("top") === 0;
    if (top) c.appendChild(el);
    else c.prepend(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    let timer;
    const dismiss = () => {
      if (el.dataset.dismissing) return;
      el.dataset.dismissing = "1";
      clearTimeout(timer);
      el.classList.remove("is-visible");
      el.classList.add("is-leaving");
      const done = () => el.remove();
      el.addEventListener("transitionend", done, { once: true });
      setTimeout(done, 400);
    };
    const start = () => {
      if (duration > 0) timer = setTimeout(dismiss, duration);
    };
    const stop = () => clearTimeout(timer);
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.querySelector(".bootcn-toast-close").addEventListener("click", dismiss);
    const actionBtn = el.querySelector(".bootcn-toast-action");
    if (actionBtn) actionBtn.addEventListener("click", () => {
      try {
        if (options.action.onClick) options.action.onClick();
      } finally {
        dismiss();
      }
    });
    start();
    return { dismiss, el };
  }
};
var toaster = new Toaster();
function toast(message, options) {
  return toaster.show(message, options);
}
toast.success = (m, o) => toast(m, Object.assign({}, o, { variant: "success" }));
toast.error = (m, o) => toast(m, Object.assign({}, o, { variant: "error" }));
toast.warning = (m, o) => toast(m, Object.assign({}, o, { variant: "warning" }));
toast.info = (m, o) => toast(m, Object.assign({}, o, { variant: "info" }));
toast.message = (m, o) => toast(m, o);

// js/src/combobox.js
var store = /* @__PURE__ */ new WeakMap();
var Combobox = class _Combobox {
  static getOrCreate(select) {
    let inst = store.get(select);
    if (!inst) {
      inst = new _Combobox(select);
      store.set(select, inst);
    }
    return inst;
  }
  constructor(select) {
    this.select = select;
    this.placeholder = select.dataset.placeholder || "Select\u2026";
    this.searchPlaceholder = select.dataset.searchPlaceholder || "Search\u2026";
    this.emptyText = select.dataset.empty || "No results found.";
    this.active = -1;
    this._build();
  }
  _build() {
    const select = this.select;
    select.classList.add("bootcn-combobox-native");
    select.setAttribute("tabindex", "-1");
    select.setAttribute("aria-hidden", "true");
    const wrap = document.createElement("div");
    wrap.className = "dropdown bootcn-combobox";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "btn btn-outline-secondary bootcn-combobox-trigger";
    trigger.setAttribute("data-bs-toggle", "dropdown");
    trigger.setAttribute("data-bs-auto-close", "outside");
    trigger.setAttribute("aria-expanded", "false");
    trigger.innerHTML = `<span class="bootcn-combobox-label"></span>${CHEVRON}`;
    const menu = document.createElement("div");
    menu.className = "dropdown-menu bootcn-combobox-menu";
    menu.innerHTML = `<div class="bootcn-combobox-search-wrap">${SEARCH}<input type="text" class="bootcn-combobox-search" placeholder="${escapeAttr(this.searchPlaceholder)}" autocomplete="off" spellcheck="false"></div><ul class="bootcn-combobox-list" role="listbox"></ul><div class="bootcn-combobox-empty" hidden>${escapeHtml(this.emptyText)}</div>`;
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    select.parentNode.insertBefore(wrap, select.nextSibling);
    this.wrap = wrap;
    this.trigger = trigger;
    this.menu = menu;
    this.labelEl = trigger.querySelector(".bootcn-combobox-label");
    this.searchEl = menu.querySelector(".bootcn-combobox-search");
    this.listEl = menu.querySelector(".bootcn-combobox-list");
    this.emptyEl = menu.querySelector(".bootcn-combobox-empty");
    this._renderOptions();
    this._syncLabel();
    this.dropdown = bs().Dropdown.getOrCreateInstance(trigger);
    trigger.parentNode.addEventListener("shown.bs.dropdown", () => {
      this.searchEl.value = "";
      this._filter("");
      this.searchEl.focus();
      const sel = this.items.findIndex((it) => it.value === this.select.value);
      this._setActive(sel >= 0 ? this._visibleIndexOf(sel) : 0);
    });
    this.searchEl.addEventListener("input", () => this._filter(this.searchEl.value));
    this.searchEl.addEventListener("keydown", (e) => this._onKey(e));
  }
  _renderOptions() {
    this.listEl.innerHTML = "";
    this.items = [];
    Array.from(this.select.options).forEach((opt) => {
      if (opt.value === "" && (opt.disabled || opt.hidden)) return;
      const li = document.createElement("li");
      li.className = "bootcn-combobox-item";
      li.setAttribute("role", "option");
      li.dataset.value = opt.value;
      li.innerHTML = `<span class="bootcn-combobox-check">${CHECK}</span><span class="bootcn-combobox-text">${escapeHtml(opt.textContent)}</span>`;
      li.addEventListener("click", () => this._choose(opt.value));
      li.addEventListener("mousemove", () => this._setActive(this._visibleIndexOf(this.items.findIndex((i) => i.li === li))));
      this.listEl.appendChild(li);
      this.items.push({ li, value: opt.value, text: opt.textContent.toLowerCase() });
    });
    this._markSelected();
  }
  _markSelected() {
    const value = this.select.value;
    this.items.forEach((it) => it.li.setAttribute("aria-selected", it.value === value ? "true" : "false"));
  }
  _syncLabel() {
    const opt = this.select.selectedOptions[0];
    const hasValue = opt && opt.value !== "";
    this.labelEl.textContent = hasValue ? opt.textContent : this.placeholder;
    this.trigger.dataset.empty = hasValue ? "false" : "true";
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
  _visible() {
    return this.items.filter((it) => !it.li.hidden);
  }
  _visibleIndexOf(itemIndex) {
    if (itemIndex < 0) return 0;
    const target = this.items[itemIndex];
    return Math.max(0, this._visible().indexOf(target));
  }
  _setActive(i) {
    const vis = this._visible();
    this.items.forEach((it) => it.li.classList.remove("is-active"));
    if (!vis.length) {
      this.active = -1;
      return;
    }
    this.active = Math.max(0, Math.min(i, vis.length - 1));
    const el = vis[this.active].li;
    el.classList.add("is-active");
    el.scrollIntoView({ block: "nearest" });
  }
  _onKey(e) {
    const vis = this._visible();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._setActive(this.active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._setActive(this.active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (vis[this.active]) this._choose(vis[this.active].value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.dropdown.hide();
      this.trigger.focus();
    }
  }
  _choose(value) {
    this.select.value = value;
    this.select.dispatchEvent(new Event("change", { bubbles: true }));
    this._markSelected();
    this._syncLabel();
    this.dropdown.hide();
    this.trigger.focus();
  }
  get value() {
    return this.select.value;
  }
  set value(v) {
    this._choose(v);
  }
};

// js/src/command.js
var store2 = /* @__PURE__ */ new WeakMap();
var Command = class _Command {
  static getOrCreate(source) {
    let inst = store2.get(source);
    if (!inst) {
      inst = new _Command(source);
      store2.set(source, inst);
    }
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
    this.source.querySelectorAll("[data-bootcn-command-group]").forEach((g) => {
      const items = Array.from(g.querySelectorAll("[data-bootcn-command-item]")).map((it) => ({
        label: it.textContent.trim(),
        href: it.dataset.href || null,
        shortcut: it.dataset.shortcut || null,
        id: it.dataset.id || null
      }));
      groups.push({ name: g.getAttribute("data-bootcn-command-group"), items });
    });
    const modal = document.createElement("div");
    modal.className = "modal fade bootcn-command-modal";
    modal.tabIndex = -1;
    modal.setAttribute("aria-label", "Command menu");
    modal.innerHTML = `<div class="modal-dialog modal-dialog-scrollable"><div class="modal-content bootcn-command"><div class="bootcn-command-search-wrap">${SEARCH}<input type="text" class="bootcn-command-input" placeholder="Type a command or search\u2026" autocomplete="off" spellcheck="false" aria-label="Search commands"></div><div class="bootcn-command-list"></div><div class="bootcn-command-empty" hidden>No results found.</div></div></div>`;
    document.body.appendChild(modal);
    const list = modal.querySelector(".bootcn-command-list");
    this.entries = [];
    groups.forEach((g) => {
      const gEl = document.createElement("div");
      gEl.className = "bootcn-command-group";
      gEl.innerHTML = `<div class="bootcn-command-group-label">${escapeHtml(g.name)}</div>`;
      g.items.forEach((item) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "bootcn-command-item";
        b.innerHTML = `<span class="bootcn-command-item-label">${escapeHtml(item.label)}</span>` + (item.shortcut ? `<kbd class="bootcn-command-kbd">${escapeHtml(item.shortcut)}</kbd>` : "");
        b.addEventListener("click", () => this._run(item));
        b.addEventListener("mousemove", () => this._setActiveEl(b));
        gEl.appendChild(b);
        this.entries.push({ item, el: b, group: gEl, text: item.label.toLowerCase() });
      });
      list.appendChild(gEl);
    });
    this.modalEl = modal;
    this.inputEl = modal.querySelector(".bootcn-command-input");
    this.emptyEl = modal.querySelector(".bootcn-command-empty");
    this.modal = new (bs()).Modal(modal);
    modal.addEventListener("shown.bs.modal", () => {
      this.inputEl.value = "";
      this._filter("");
      this.inputEl.focus();
    });
    this.inputEl.addEventListener("input", () => this._filter(this.inputEl.value));
    this.inputEl.addEventListener("keydown", (e) => this._onKey(e));
    this.source.setAttribute("hidden", "");
  }
  _bindHotkey() {
    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.open();
      }
    });
  }
  open() {
    this.modal.show();
  }
  close() {
    this.modal.hide();
  }
  _filter(query) {
    const q = query.toLowerCase().trim();
    let any = false;
    this.entries.forEach((en) => {
      const match = !q || en.text.indexOf(q) !== -1;
      en.el.hidden = !match;
      if (match) any = true;
    });
    this.modalEl.querySelectorAll(".bootcn-command-group").forEach((g) => {
      g.hidden = g.querySelectorAll(".bootcn-command-item:not([hidden])").length === 0;
    });
    this.emptyEl.hidden = any;
    this._setActive(0);
  }
  _visible() {
    return this.entries.filter((en) => !en.el.hidden);
  }
  _setActive(i) {
    const vis = this._visible();
    this.entries.forEach((en) => en.el.classList.remove("is-active"));
    if (!vis.length) {
      this.active = -1;
      return;
    }
    this.active = Math.max(0, Math.min(i, vis.length - 1));
    const el = vis[this.active].el;
    el.classList.add("is-active");
    el.scrollIntoView({ block: "nearest" });
  }
  _setActiveEl(el) {
    const vis = this._visible();
    const idx = vis.findIndex((en) => en.el === el);
    if (idx >= 0) this._setActive(idx);
  }
  _onKey(e) {
    const vis = this._visible();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._setActive(this.active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._setActive(this.active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (vis[this.active]) this._run(vis[this.active].item);
    }
  }
  _run(item) {
    this.close();
    if (typeof this.onSelect === "function") this.onSelect(item);
    this.modalEl.dispatchEvent(new CustomEvent("bootcn:select", { detail: item }));
    if (item.href) window.location.href = item.href;
  }
};

// js/src/avatar.js
function initAvatars(root) {
  (root || document).querySelectorAll(".bootcn-avatar > img").forEach((img) => {
    const fail = () => img.classList.add("is-hidden");
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
    img.addEventListener("load", () => {
      if (img.naturalWidth === 0) fail();
    });
  });
}

// js/src/otp.js
var store3 = /* @__PURE__ */ new WeakMap();
var InputOTP = class _InputOTP {
  static getOrCreate(input) {
    let inst = store3.get(input);
    if (!inst) {
      inst = new _InputOTP(input);
      store3.set(input, inst);
    }
    return inst;
  }
  constructor(input) {
    this.input = input;
    this.length = parseInt(input.dataset.length || input.getAttribute("maxlength") || "6", 10);
    this._build();
  }
  _build() {
    const input = this.input;
    const seed = (input.value || "").replace(/\D/g, "").slice(0, this.length);
    input.type = "hidden";
    const wrap = document.createElement("div");
    wrap.className = "bootcn-otp";
    this.cells = [];
    for (let i = 0; i < this.length; i++) {
      const c = document.createElement("input");
      c.type = "text";
      c.inputMode = "numeric";
      c.autocomplete = i === 0 ? "one-time-code" : "off";
      c.className = "bootcn-otp-cell";
      c.maxLength = 1;
      c.value = seed[i] || "";
      c.setAttribute("aria-label", `Digit ${i + 1}`);
      c.addEventListener("input", (e) => this._onInput(i, e));
      c.addEventListener("keydown", (e) => this._onKey(i, e));
      c.addEventListener("focus", () => c.select());
      c.addEventListener("paste", (e) => this._onPaste(i, e));
      wrap.appendChild(c);
      this.cells.push(c);
    }
    input.parentNode.insertBefore(wrap, input.nextSibling);
    this.wrap = wrap;
    this._sync();
  }
  _sync() {
    const v = this.cells.map((c) => c.value).join("");
    this.input.value = v;
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
    if (v.length === this.length) {
      this.wrap.dispatchEvent(new CustomEvent("bootcn:complete", { detail: { value: v }, bubbles: true }));
    }
  }
  _onInput(i, e) {
    const v = e.target.value.replace(/\D/g, "");
    e.target.value = v.slice(-1);
    if (e.target.value && i < this.length - 1) this.cells[i + 1].focus();
    this._sync();
  }
  _onKey(i, e) {
    if (e.key === "Backspace" && !e.target.value && i > 0) {
      e.preventDefault();
      this.cells[i - 1].focus();
      this.cells[i - 1].value = "";
      this._sync();
    } else if (e.key === "ArrowLeft" && i > 0) {
      this.cells[i - 1].focus();
    } else if (e.key === "ArrowRight" && i < this.length - 1) {
      this.cells[i + 1].focus();
    }
  }
  _onPaste(i, e) {
    e.preventDefault();
    const txt = ((e.clipboardData || window.clipboardData).getData("text") || "").replace(/\D/g, "");
    for (let j = 0; j < txt.length && i + j < this.length; j++) this.cells[i + j].value = txt[j];
    this.cells[Math.min(i + txt.length, this.length - 1)].focus();
    this._sync();
  }
  get value() {
    return this.input.value;
  }
};

// js/src/calendar.js
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function parseISO(s) {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
function toISO(d) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function formatDate(d) {
  return d ? `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : "";
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
var store4 = /* @__PURE__ */ new WeakMap();
var Calendar = class _Calendar {
  static getOrCreate(el, opts) {
    let inst = store4.get(el);
    if (!inst) {
      inst = new _Calendar(el, opts);
      store4.set(el, inst);
    }
    return inst;
  }
  constructor(el, opts = {}) {
    this.el = el;
    this.el.classList.add("bootcn-calendar");
    this.selected = opts.selected || parseISO(el.dataset.selected) || null;
    this.min = opts.min || parseISO(el.dataset.min) || null;
    this.max = opts.max || parseISO(el.dataset.max) || null;
    this.onSelect = opts.onSelect || null;
    this.view = new Date(this.selected || /* @__PURE__ */ new Date());
    this.view.setDate(1);
    this._render();
  }
  setSelected(date) {
    this.selected = date;
    if (date) {
      this.view = new Date(date);
      this.view.setDate(1);
    }
    this._render();
  }
  _render() {
    const y = this.view.getFullYear();
    const m = this.view.getMonth();
    const startDow = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const today = /* @__PURE__ */ new Date();
    let cells = "";
    for (let i = 0; i < startDow; i++) cells += '<span class="bootcn-cal-empty"></span>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d);
      const disabled = this.min && date < this.min || this.max && date > this.max;
      const cls = ["bootcn-cal-day"];
      if (sameDay(date, this.selected)) cls.push("is-selected");
      if (sameDay(date, today)) cls.push("is-today");
      cells += `<button type="button" class="${cls.join(" ")}" data-date="${toISO(date)}"${disabled ? " disabled" : ""}>${d}</button>`;
    }
    this.el.innerHTML = `<div class="bootcn-cal-head"><button type="button" class="bootcn-cal-nav" data-nav="-1" aria-label="Previous month">${CHEVLEFT}</button><div class="bootcn-cal-title">${MONTHS[m]} ${y}</div><button type="button" class="bootcn-cal-nav" data-nav="1" aria-label="Next month">${CHEVRIGHT}</button></div><div class="bootcn-cal-grid bootcn-cal-dow">${DOW.map((d) => `<span>${d}</span>`).join("")}</div><div class="bootcn-cal-grid bootcn-cal-days">${cells}</div>`;
    this.el.querySelectorAll("[data-nav]").forEach((b) => {
      b.addEventListener("click", () => {
        this.view.setMonth(this.view.getMonth() + parseInt(b.dataset.nav, 10));
        this._render();
      });
    });
    this.el.querySelectorAll(".bootcn-cal-day").forEach((b) => {
      b.addEventListener("click", () => {
        this.selected = parseISO(b.dataset.date);
        this._render();
        if (this.onSelect) this.onSelect(this.selected);
        this.el.dispatchEvent(new CustomEvent("bootcn:select", { detail: { date: this.selected, iso: b.dataset.date }, bubbles: true }));
      });
    });
  }
};

// js/src/datepicker.js
var store5 = /* @__PURE__ */ new WeakMap();
var DatePicker = class _DatePicker {
  static getOrCreate(input) {
    let inst = store5.get(input);
    if (!inst) {
      inst = new _DatePicker(input);
      store5.set(input, inst);
    }
    return inst;
  }
  constructor(input) {
    this.input = input;
    this.placeholder = input.dataset.placeholder || "Pick a date";
    this._build();
  }
  _build() {
    const input = this.input;
    input.type = "hidden";
    const wrap = document.createElement("div");
    wrap.className = "dropdown bootcn-datepicker";
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "btn btn-outline-secondary bootcn-datepicker-trigger";
    trigger.setAttribute("data-bs-toggle", "dropdown");
    trigger.setAttribute("data-bs-auto-close", "outside");
    trigger.innerHTML = `${CALENDAR}<span class="bootcn-datepicker-label"></span>`;
    const menu = document.createElement("div");
    menu.className = "dropdown-menu bootcn-datepicker-menu";
    const calEl = document.createElement("div");
    menu.appendChild(calEl);
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    input.parentNode.insertBefore(wrap, input.nextSibling);
    this.trigger = trigger;
    this.labelEl = trigger.querySelector(".bootcn-datepicker-label");
    this.dropdown = bs().Dropdown.getOrCreateInstance(trigger);
    const selected = parseISO(input.value) || parseISO(input.dataset.selected);
    this.calendar = new Calendar(calEl, {
      selected,
      min: parseISO(input.dataset.min),
      max: parseISO(input.dataset.max),
      onSelect: (date) => this._choose(date)
    });
    this._syncLabel(selected);
  }
  _syncLabel(date) {
    this.labelEl.textContent = date ? formatDate(date) : this.placeholder;
    this.trigger.dataset.empty = date ? "false" : "true";
  }
  _choose(date) {
    const iso = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";
    this.input.value = iso;
    this.input.dispatchEvent(new Event("change", { bubbles: true }));
    this._syncLabel(date);
    this.dropdown.hide();
  }
  get value() {
    return this.input.value;
  }
};

// js/src/context-menu.js
var store6 = /* @__PURE__ */ new WeakMap();
var ContextMenu = class _ContextMenu {
  static getOrCreate(root) {
    let inst = store6.get(root);
    if (!inst) {
      inst = new _ContextMenu(root);
      store6.set(root, inst);
    }
    return inst;
  }
  constructor(root) {
    this.root = root;
    this.trigger = root.querySelector("[data-bootcn-context-trigger]") || root;
    this.source = root.querySelector("[data-bootcn-context-content]");
    this._build();
  }
  _build() {
    this.pop = document.createElement("div");
    this.pop.className = "dropdown-menu bootcn-context-menu";
    const nodes = this.source ? Array.from(this.source.children) : [];
    nodes.forEach((node) => {
      if (node.tagName === "HR" || node.hasAttribute("data-bootcn-context-sep")) {
        const hr = document.createElement("hr");
        hr.className = "dropdown-divider";
        this.pop.appendChild(hr);
        return;
      }
      const disabled = node.hasAttribute("data-disabled") || node.hasAttribute("disabled");
      const item = document.createElement("button");
      item.type = "button";
      item.className = "dropdown-item";
      if (disabled) item.classList.add("disabled");
      if (node.dataset.variant === "danger" || node.classList.contains("text-danger")) item.classList.add("text-danger");
      if (node.dataset.shortcut) {
        item.innerHTML = `<span>${node.innerHTML}</span><kbd class="bootcn-context-kbd">${node.dataset.shortcut}</kbd>`;
        item.classList.add("d-flex", "justify-content-between", "align-items-center");
      } else {
        item.innerHTML = node.innerHTML;
      }
      if (!disabled) item.addEventListener("click", () => {
        this.hide();
        node.click();
      });
      this.pop.appendChild(item);
    });
    document.body.appendChild(this.pop);
    if (this.source) this.source.setAttribute("hidden", "");
    this.trigger.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.show(e.clientX, e.clientY);
    });
    document.addEventListener("click", () => this.hide());
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.hide();
    });
    window.addEventListener("resize", () => this.hide());
    window.addEventListener("scroll", () => this.hide(), true);
  }
  show(x, y) {
    const p = this.pop;
    p.style.position = "fixed";
    p.style.display = "block";
    p.classList.add("show");
    p.style.left = "0px";
    p.style.top = "0px";
    const r = p.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let nx = x;
    let ny = y;
    if (x + r.width > vw - 8) nx = Math.max(8, x - r.width);
    if (y + r.height > vh - 8) ny = Math.max(8, y - r.height);
    p.style.left = nx + "px";
    p.style.top = ny + "px";
  }
  hide() {
    this.pop.classList.remove("show");
    this.pop.style.display = "none";
  }
};

// js/src/hovercard.js
var store7 = /* @__PURE__ */ new WeakMap();
var HoverCard = class _HoverCard {
  static getOrCreate(root) {
    let inst = store7.get(root);
    if (!inst) {
      inst = new _HoverCard(root);
      store7.set(root, inst);
    }
    return inst;
  }
  constructor(root) {
    this.root = root;
    this.trigger = root.querySelector("[data-bootcn-hovercard-trigger]") || root.firstElementChild;
    this.source = root.querySelector("[data-bootcn-hovercard-content]");
    this.openDelay = parseInt(root.dataset.openDelay || "250", 10);
    this.closeDelay = parseInt(root.dataset.closeDelay || "150", 10);
    this._build();
  }
  _build() {
    this.card = document.createElement("div");
    this.card.className = "bootcn-hovercard-pop";
    this.card.hidden = true;
    if (this.source) {
      this.card.innerHTML = this.source.innerHTML;
      this.source.remove();
    }
    document.body.appendChild(this.card);
    const enter = () => {
      clearTimeout(this.closeT);
      this.openT = setTimeout(() => this.show(), this.openDelay);
    };
    const leave = () => {
      clearTimeout(this.openT);
      this.closeT = setTimeout(() => this.hide(), this.closeDelay);
    };
    this.trigger.addEventListener("mouseenter", enter);
    this.trigger.addEventListener("mouseleave", leave);
    this.trigger.addEventListener("focus", enter);
    this.trigger.addEventListener("blur", leave);
    this.card.addEventListener("mouseenter", () => clearTimeout(this.closeT));
    this.card.addEventListener("mouseleave", leave);
  }
  show() {
    const t = this.trigger.getBoundingClientRect();
    this.card.hidden = false;
    this.card.style.position = "absolute";
    const r = this.card.getBoundingClientRect();
    let left = window.scrollX + t.left;
    let top = window.scrollY + t.bottom + 8;
    if (left + r.width > window.scrollX + window.innerWidth - 8) {
      left = window.scrollX + window.innerWidth - r.width - 8;
    }
    if (t.bottom + 8 + r.height > window.innerHeight && t.top - 8 - r.height > 0) {
      top = window.scrollY + t.top - r.height - 8;
    }
    this.card.style.left = Math.max(8, left) + "px";
    this.card.style.top = top + "px";
    void this.card.offsetWidth;
    this.card.classList.add("is-visible");
  }
  hide() {
    this.card.classList.remove("is-visible");
    setTimeout(() => {
      if (!this.card.classList.contains("is-visible")) this.card.hidden = true;
    }, 160);
  }
};

// js/src/resizable.js
var store8 = /* @__PURE__ */ new WeakMap();
var Resizable = class _Resizable {
  static getOrCreate(el) {
    let inst = store8.get(el);
    if (!inst) {
      inst = new _Resizable(el);
      store8.set(el, inst);
    }
    return inst;
  }
  constructor(el) {
    this.el = el;
    this.horizontal = (el.dataset.direction || "horizontal") !== "vertical";
    this.min = parseInt(el.dataset.min || "48", 10);
    this._build();
  }
  _build() {
    this.el.classList.add("bootcn-resizable");
    this.el.classList.toggle("is-vertical", !this.horizontal);
    this.panels = Array.from(this.el.querySelectorAll(":scope > [data-bootcn-panel]"));
    this.panels.forEach((p) => {
      if (!p.style.flex) p.style.flex = "1 1 0";
    });
    for (let i = 0; i < this.panels.length - 1; i++) {
      const h = document.createElement("div");
      h.className = "bootcn-resizable-handle";
      h.setAttribute("role", "separator");
      h.setAttribute("aria-orientation", this.horizontal ? "vertical" : "horizontal");
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
    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
      const start = this.horizontal ? e.clientX : e.clientY;
      const { sa, total } = this._measure(a, b);
      document.body.style.userSelect = "none";
      document.body.style.cursor = this.horizontal ? "col-resize" : "row-resize";
      handle.classList.add("is-dragging");
      const move = (ev) => {
        const cur = this.horizontal ? ev.clientX : ev.clientY;
        this._apply(a, b, sa + (cur - start), total);
      };
      const up = () => {
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        handle.classList.remove("is-dragging");
      };
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
    });
    handle.addEventListener("keydown", (e) => {
      const step = 24;
      let d = 0;
      if (this.horizontal) {
        if (e.key === "ArrowLeft") d = -step;
        else if (e.key === "ArrowRight") d = step;
      } else {
        if (e.key === "ArrowUp") d = -step;
        else if (e.key === "ArrowDown") d = step;
      }
      if (!d) return;
      e.preventDefault();
      const { sa, total } = this._measure(a, b);
      this._apply(a, b, sa + d, total);
    });
  }
};

// js/src/menubar.js
var store9 = /* @__PURE__ */ new WeakMap();
var Menubar = class _Menubar {
  static getOrCreate(el) {
    let inst = store9.get(el);
    if (!inst) {
      inst = new _Menubar(el);
      store9.set(el, inst);
    }
    return inst;
  }
  constructor(el) {
    this.el = el;
    this._build();
  }
  _build() {
    this.el.classList.add("bootcn-menubar");
    this.triggers = Array.from(this.el.querySelectorAll('.bootcn-menubar-trigger, [data-bs-toggle="dropdown"]'));
    this.triggers.forEach((t, i) => {
      t.classList.add("bootcn-menubar-trigger");
      if (!t.getAttribute("data-bs-toggle")) t.setAttribute("data-bs-toggle", "dropdown");
      const dd = bs().Dropdown.getOrCreateInstance(t);
      t.addEventListener("mouseenter", () => {
        if (this._anyOpen() && t.getAttribute("aria-expanded") !== "true") {
          this._closeAll();
          dd.show();
        }
      });
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          this._move(i, 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          this._move(i, -1);
        }
      });
    });
  }
  _anyOpen() {
    return this.triggers.some((t) => t.getAttribute("aria-expanded") === "true");
  }
  _closeAll() {
    this.triggers.forEach((t) => {
      const dd = bs().Dropdown.getInstance(t);
      if (dd) dd.hide();
    });
  }
  _move(i, dir) {
    const n = this.triggers.length;
    const wasOpen = this._anyOpen();
    const t = this.triggers[(i + dir + n) % n];
    if (wasOpen) {
      this._closeAll();
      bs().Dropdown.getOrCreateInstance(t).show();
    }
    t.focus();
  }
};

// js/src/navmenu.js
var store10 = /* @__PURE__ */ new WeakMap();
var NavigationMenu = class _NavigationMenu {
  static getOrCreate(el) {
    let inst = store10.get(el);
    if (!inst) {
      inst = new _NavigationMenu(el);
      store10.set(el, inst);
    }
    return inst;
  }
  constructor(el) {
    this.el = el;
    this._build();
  }
  _build() {
    this.el.classList.add("bootcn-navmenu");
    this.items = Array.from(this.el.querySelectorAll(".bootcn-navmenu-item"));
    this.items.forEach((item) => {
      const trigger = item.querySelector(".bootcn-navmenu-trigger");
      const content = item.querySelector(".bootcn-navmenu-content");
      if (!trigger || !content) return;
      trigger.setAttribute("aria-expanded", "false");
      const open = () => {
        clearTimeout(this._t);
        this._closeOthers(item);
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      };
      const close = () => {
        this._t = setTimeout(() => {
          item.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
        }, 130);
      };
      item.addEventListener("mouseenter", open);
      item.addEventListener("mouseleave", close);
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        item.classList.contains("is-open") ? this._closeAll() : open();
      });
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this._closeAll();
      });
    });
    document.addEventListener("click", (e) => {
      if (!this.el.contains(e.target)) this._closeAll();
    });
  }
  _closeOthers(except) {
    this.items.forEach((i) => {
      if (i !== except) this._reset(i);
    });
  }
  _closeAll() {
    this.items.forEach((i) => this._reset(i));
  }
  _reset(item) {
    item.classList.remove("is-open");
    const t = item.querySelector(".bootcn-navmenu-trigger");
    if (t) t.setAttribute("aria-expanded", "false");
  }
};

// js/src/datatable.js
var store11 = /* @__PURE__ */ new WeakMap();
var DataTable = class _DataTable {
  static getOrCreate(table) {
    let inst = store11.get(table);
    if (!inst) {
      inst = new _DataTable(table);
      store11.set(table, inst);
    }
    return inst;
  }
  constructor(table) {
    this.table = table;
    this.pageSize = parseInt(table.dataset.pageSize || "10", 10);
    this.filterable = table.dataset.filter !== "false";
    this.page = 1;
    this.sortCol = -1;
    this.sortDir = 1;
    this.query = "";
    this.tbody = table.tBodies[0];
    this.allRows = Array.from(this.tbody.rows);
    this.headers = Array.from(table.tHead.rows[0].cells);
    this._chrome();
    this._headers();
    this._update();
  }
  _chrome() {
    if (this.filterable) {
      const bar = document.createElement("div");
      bar.className = "bootcn-dt-toolbar";
      bar.innerHTML = '<div class="bootcn-dt-search"><input type="search" class="form-control form-control-sm" placeholder="Filter\u2026" aria-label="Filter rows"></div>';
      this.table.parentNode.insertBefore(bar, this.table);
      this.searchEl = bar.querySelector("input");
      this.searchEl.addEventListener("input", () => {
        this.query = this.searchEl.value.toLowerCase();
        this.page = 1;
        this._update();
      });
    }
    const foot = document.createElement("div");
    foot.className = "bootcn-dt-footer";
    foot.innerHTML = '<span class="bootcn-dt-info"></span><div class="bootcn-dt-pager"><button type="button" class="btn btn-outline-secondary btn-sm" data-prev>Previous</button><button type="button" class="btn btn-outline-secondary btn-sm" data-next>Next</button></div>';
    this.table.parentNode.insertBefore(foot, this.table.nextSibling);
    this.infoEl = foot.querySelector(".bootcn-dt-info");
    this.prevBtn = foot.querySelector("[data-prev]");
    this.nextBtn = foot.querySelector("[data-next]");
    this.prevBtn.addEventListener("click", () => {
      if (this.page > 1) {
        this.page--;
        this._update();
      }
    });
    this.nextBtn.addEventListener("click", () => {
      if (this.page < this._pages()) {
        this.page++;
        this._update();
      }
    });
  }
  _headers() {
    this.headers.forEach((th, i) => {
      if (!th.hasAttribute("data-sortable")) return;
      th.classList.add("bootcn-dt-sortable");
      th.innerHTML = `<span>${th.innerHTML}</span><span class="bootcn-dt-sorticon" aria-hidden="true"></span>`;
      th.addEventListener("click", () => this._sort(i));
    });
  }
  _cellVal(row, i) {
    const c = row.cells[i];
    return (c && (c.dataset.sortValue != null ? c.dataset.sortValue : c.textContent) || "").trim();
  }
  _sort(i) {
    if (this.sortCol === i) this.sortDir *= -1;
    else {
      this.sortCol = i;
      this.sortDir = 1;
    }
    const numeric = this.headers[i].dataset.sort === "number";
    this.allRows.sort((a, b) => {
      let va = this._cellVal(a, i);
      let vb = this._cellVal(b, i);
      if (numeric) {
        va = parseFloat(va.replace(/[^0-9.\-]/g, "")) || 0;
        vb = parseFloat(vb.replace(/[^0-9.\-]/g, "")) || 0;
      } else {
        va = va.toLowerCase();
        vb = vb.toLowerCase();
      }
      return (va > vb ? 1 : va < vb ? -1 : 0) * this.sortDir;
    });
    this.headers.forEach((th, j) => {
      const ic = th.querySelector(".bootcn-dt-sorticon");
      if (ic) ic.textContent = this.sortCol === j ? this.sortDir === 1 ? "\u2191" : "\u2193" : "";
    });
    this._update();
  }
  _filtered() {
    if (!this.query) return this.allRows;
    return this.allRows.filter((r) => r.textContent.toLowerCase().indexOf(this.query) !== -1);
  }
  _pages() {
    return Math.max(1, Math.ceil(this._filtered().length / this.pageSize));
  }
  _update() {
    const rows = this._filtered();
    const pages = Math.max(1, Math.ceil(rows.length / this.pageSize));
    if (this.page > pages) this.page = pages;
    const start = (this.page - 1) * this.pageSize;
    const pageRows = rows.slice(start, start + this.pageSize);
    this.tbody.innerHTML = "";
    pageRows.forEach((r) => this.tbody.appendChild(r));
    if (!rows.length) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="${this.headers.length}" class="text-center text-body-secondary py-4">No results.</td>`;
      this.tbody.appendChild(tr);
    }
    this.infoEl.textContent = rows.length ? `${start + 1}\u2013${Math.min(start + this.pageSize, rows.length)} of ${rows.length}` : "0 of 0";
    this.prevBtn.disabled = this.page <= 1;
    this.nextBtn.disabled = this.page >= pages;
  }
};

// js/src/sidebar.js
var store12 = /* @__PURE__ */ new WeakMap();
var Sidebar = class _Sidebar {
  static getOrCreate(el) {
    let inst = store12.get(el);
    if (!inst) {
      inst = new _Sidebar(el);
      store12.set(el, inst);
    }
    return inst;
  }
  constructor(el) {
    this.el = el;
    this.key = el.dataset.bootcnSidebar || "bootcn-sidebar";
    this.el.classList.add("bootcn-sidebar");
    if (localStorage.getItem(this.key) === "collapsed") this.el.classList.add("is-collapsed");
    document.querySelectorAll("[data-bootcn-sidebar-toggle]").forEach((btn) => {
      const target = btn.getAttribute("data-bootcn-sidebar-toggle");
      if (!target || el.id === target) btn.addEventListener("click", () => this.toggle());
    });
    document.addEventListener("click", (e) => {
      if (this.el.classList.contains("is-open") && !this.el.contains(e.target) && !e.target.closest("[data-bootcn-sidebar-toggle]")) {
        this.el.classList.remove("is-open");
      }
    });
  }
  _isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }
  toggle() {
    if (this._isMobile()) {
      this.el.classList.toggle("is-open");
      return;
    }
    const collapsed = this.el.classList.toggle("is-collapsed");
    localStorage.setItem(this.key, collapsed ? "collapsed" : "expanded");
  }
  collapse() {
    this.el.classList.add("is-collapsed");
    localStorage.setItem(this.key, "collapsed");
  }
  expand() {
    this.el.classList.remove("is-collapsed");
    localStorage.setItem(this.key, "expanded");
  }
};

// js/src/index.js
var bootcn = {
  version: "0.1.0",
  // Version of the design-token contract (see tokens.json / TOKENS.md).
  // Bump on any token add/remove/rename so consumers can assert compatibility.
  tokensVersion: "1.0.0",
  toast,
  Toaster,
  Combobox,
  Command,
  InputOTP,
  Calendar,
  DatePicker,
  ContextMenu,
  HoverCard,
  Resizable,
  Menubar,
  NavigationMenu,
  DataTable,
  Sidebar,
  command: null,
  // set to the first Command instance on init (bootcn.command.open())
  init(root) {
    root = root || document;
    initAvatars(root);
    root.querySelectorAll("select[data-bootcn-combobox]").forEach((el) => Combobox.getOrCreate(el));
    root.querySelectorAll("input[data-bootcn-otp]").forEach((el) => InputOTP.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-calendar]").forEach((el) => Calendar.getOrCreate(el));
    root.querySelectorAll("input[data-bootcn-datepicker]").forEach((el) => DatePicker.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-context-menu]").forEach((el) => ContextMenu.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-hovercard]").forEach((el) => HoverCard.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-resizable]").forEach((el) => Resizable.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-menubar]").forEach((el) => Menubar.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-navmenu]").forEach((el) => NavigationMenu.getOrCreate(el));
    root.querySelectorAll("table[data-bootcn-datatable]").forEach((el) => DataTable.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-sidebar]").forEach((el) => Sidebar.getOrCreate(el));
    root.querySelectorAll("[data-bootcn-command]").forEach((el) => {
      const inst = Command.getOrCreate(el);
      if (!bootcn.command) bootcn.command = inst;
    });
  }
};
if (typeof window !== "undefined") {
  window.bootcn = bootcn;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bootcn.init());
  } else {
    bootcn.init();
  }
}
var src_default = bootcn;
export {
  src_default as default
};
