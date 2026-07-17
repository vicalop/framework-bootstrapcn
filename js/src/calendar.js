// Calendar: a month-grid date picker surface. Standalone, and reused by DatePicker.
import { CHEVLEFT, CHEVRIGHT } from './icons.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function parseISO(s) {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
export function toISO(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
export function formatDate(d) {
  return d ? `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : '';
}
function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const store = new WeakMap();

class Calendar {
  static getOrCreate(el, opts) {
    let inst = store.get(el);
    if (!inst) { inst = new Calendar(el, opts); store.set(el, inst); }
    return inst;
  }

  constructor(el, opts = {}) {
    this.el = el;
    this.el.classList.add('bootcn-calendar');
    this.selected = opts.selected || parseISO(el.dataset.selected) || null;
    this.min = opts.min || parseISO(el.dataset.min) || null;
    this.max = opts.max || parseISO(el.dataset.max) || null;
    this.onSelect = opts.onSelect || null;
    this.view = new Date(this.selected || new Date());
    this.view.setDate(1);
    this._render();
  }

  setSelected(date) { this.selected = date; if (date) { this.view = new Date(date); this.view.setDate(1); } this._render(); }

  _render() {
    const y = this.view.getFullYear();
    const m = this.view.getMonth();
    const startDow = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const today = new Date();

    let cells = '';
    for (let i = 0; i < startDow; i++) cells += '<span class="bootcn-cal-empty"></span>';
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d);
      const disabled = (this.min && date < this.min) || (this.max && date > this.max);
      const cls = ['bootcn-cal-day'];
      if (sameDay(date, this.selected)) cls.push('is-selected');
      if (sameDay(date, today)) cls.push('is-today');
      cells += `<button type="button" class="${cls.join(' ')}" data-date="${toISO(date)}"${disabled ? ' disabled' : ''}>${d}</button>`;
    }

    this.el.innerHTML =
      `<div class="bootcn-cal-head">` +
      `<button type="button" class="bootcn-cal-nav" data-nav="-1" aria-label="Previous month">${CHEVLEFT}</button>` +
      `<div class="bootcn-cal-title">${MONTHS[m]} ${y}</div>` +
      `<button type="button" class="bootcn-cal-nav" data-nav="1" aria-label="Next month">${CHEVRIGHT}</button>` +
      `</div>` +
      `<div class="bootcn-cal-grid bootcn-cal-dow">${DOW.map((d) => `<span>${d}</span>`).join('')}</div>` +
      `<div class="bootcn-cal-grid bootcn-cal-days">${cells}</div>`;

    this.el.querySelectorAll('[data-nav]').forEach((b) => {
      b.addEventListener('click', () => { this.view.setMonth(this.view.getMonth() + parseInt(b.dataset.nav, 10)); this._render(); });
    });
    this.el.querySelectorAll('.bootcn-cal-day').forEach((b) => {
      b.addEventListener('click', () => {
        this.selected = parseISO(b.dataset.date);
        this._render();
        if (this.onSelect) this.onSelect(this.selected);
        this.el.dispatchEvent(new CustomEvent('bootcn:select', { detail: { date: this.selected, iso: b.dataset.date }, bubbles: true }));
      });
    });
  }
}

export { Calendar };
