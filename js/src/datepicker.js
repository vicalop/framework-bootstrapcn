// Date Picker: an input enhanced into a button + popover calendar (Bootstrap
// Dropdown for positioning). The underlying input holds the ISO value.
import { bs } from './util.js';
import { CALENDAR } from './icons.js';
import { Calendar, parseISO, formatDate } from './calendar.js';

const store = new WeakMap();

class DatePicker {
  static getOrCreate(input) {
    let inst = store.get(input);
    if (!inst) { inst = new DatePicker(input); store.set(input, inst); }
    return inst;
  }

  constructor(input) {
    this.input = input;
    this.placeholder = input.dataset.placeholder || 'Pick a date';
    this._build();
  }

  _build() {
    const input = this.input;
    input.type = 'hidden';

    const wrap = document.createElement('div');
    wrap.className = 'dropdown bootcn-datepicker';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'btn btn-outline-secondary bootcn-datepicker-trigger';
    trigger.setAttribute('data-bs-toggle', 'dropdown');
    trigger.setAttribute('data-bs-auto-close', 'outside');
    trigger.innerHTML = `${CALENDAR}<span class="bootcn-datepicker-label"></span>`;

    const menu = document.createElement('div');
    menu.className = 'dropdown-menu bootcn-datepicker-menu';
    const calEl = document.createElement('div');
    menu.appendChild(calEl);

    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    input.parentNode.insertBefore(wrap, input.nextSibling);

    this.trigger = trigger;
    this.labelEl = trigger.querySelector('.bootcn-datepicker-label');
    this.dropdown = bs().Dropdown.getOrCreateInstance(trigger);

    const selected = parseISO(input.value) || parseISO(input.dataset.selected);
    this.calendar = new Calendar(calEl, {
      selected,
      min: parseISO(input.dataset.min),
      max: parseISO(input.dataset.max),
      onSelect: (date) => this._choose(date),
    });
    this._syncLabel(selected);
  }

  _syncLabel(date) {
    this.labelEl.textContent = date ? formatDate(date) : this.placeholder;
    this.trigger.dataset.empty = date ? 'false' : 'true';
  }

  _choose(date) {
    const iso = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
    this.input.value = iso;
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
    this._syncLabel(date);
    this.dropdown.hide();
  }

  get value() { return this.input.value; }
}

export { DatePicker };
