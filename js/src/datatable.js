// Data Table: enhances a <table> with client-side filter, sort, and pagination.
const store = new WeakMap();

class DataTable {
  static getOrCreate(table) {
    let inst = store.get(table);
    if (!inst) { inst = new DataTable(table); store.set(table, inst); }
    return inst;
  }

  constructor(table) {
    this.table = table;
    this.pageSize = parseInt(table.dataset.pageSize || '10', 10);
    this.filterable = table.dataset.filter !== 'false';
    this.page = 1;
    this.sortCol = -1;
    this.sortDir = 1;
    this.query = '';
    this.tbody = table.tBodies[0];
    this.allRows = Array.from(this.tbody.rows);
    this.headers = Array.from(table.tHead.rows[0].cells);
    this._chrome();
    this._headers();
    this._update();
  }

  _chrome() {
    if (this.filterable) {
      const bar = document.createElement('div');
      bar.className = 'bootcn-dt-toolbar';
      bar.innerHTML = '<div class="bootcn-dt-search"><input type="search" class="form-control form-control-sm" placeholder="Filter…" aria-label="Filter rows"></div>';
      this.table.parentNode.insertBefore(bar, this.table);
      this.searchEl = bar.querySelector('input');
      this.searchEl.addEventListener('input', () => { this.query = this.searchEl.value.toLowerCase(); this.page = 1; this._update(); });
    }
    const foot = document.createElement('div');
    foot.className = 'bootcn-dt-footer';
    foot.innerHTML = '<span class="bootcn-dt-info"></span>' +
      '<div class="bootcn-dt-pager"><button type="button" class="btn btn-outline-secondary btn-sm" data-prev>Previous</button>' +
      '<button type="button" class="btn btn-outline-secondary btn-sm" data-next>Next</button></div>';
    this.table.parentNode.insertBefore(foot, this.table.nextSibling);
    this.infoEl = foot.querySelector('.bootcn-dt-info');
    this.prevBtn = foot.querySelector('[data-prev]');
    this.nextBtn = foot.querySelector('[data-next]');
    this.prevBtn.addEventListener('click', () => { if (this.page > 1) { this.page--; this._update(); } });
    this.nextBtn.addEventListener('click', () => { if (this.page < this._pages()) { this.page++; this._update(); } });
  }

  _headers() {
    this.headers.forEach((th, i) => {
      if (!th.hasAttribute('data-sortable')) return;
      th.classList.add('bootcn-dt-sortable');
      th.innerHTML = `<span>${th.innerHTML}</span><span class="bootcn-dt-sorticon" aria-hidden="true"></span>`;
      th.addEventListener('click', () => this._sort(i));
    });
  }

  _cellVal(row, i) {
    const c = row.cells[i];
    return ((c && (c.dataset.sortValue != null ? c.dataset.sortValue : c.textContent)) || '').trim();
  }

  _sort(i) {
    if (this.sortCol === i) this.sortDir *= -1; else { this.sortCol = i; this.sortDir = 1; }
    const numeric = this.headers[i].dataset.sort === 'number';
    this.allRows.sort((a, b) => {
      let va = this._cellVal(a, i);
      let vb = this._cellVal(b, i);
      if (numeric) { va = parseFloat(va.replace(/[^0-9.\-]/g, '')) || 0; vb = parseFloat(vb.replace(/[^0-9.\-]/g, '')) || 0; }
      else { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return (va > vb ? 1 : va < vb ? -1 : 0) * this.sortDir;
    });
    this.headers.forEach((th, j) => {
      const ic = th.querySelector('.bootcn-dt-sorticon');
      if (ic) ic.textContent = this.sortCol === j ? (this.sortDir === 1 ? '↑' : '↓') : '';
    });
    this._update();
  }

  _filtered() {
    if (!this.query) return this.allRows;
    return this.allRows.filter((r) => r.textContent.toLowerCase().indexOf(this.query) !== -1);
  }
  _pages() { return Math.max(1, Math.ceil(this._filtered().length / this.pageSize)); }

  _update() {
    const rows = this._filtered();
    const pages = Math.max(1, Math.ceil(rows.length / this.pageSize));
    if (this.page > pages) this.page = pages;
    const start = (this.page - 1) * this.pageSize;
    const pageRows = rows.slice(start, start + this.pageSize);

    this.tbody.innerHTML = '';
    pageRows.forEach((r) => this.tbody.appendChild(r));
    if (!rows.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="${this.headers.length}" class="text-center text-body-secondary py-4">No results.</td>`;
      this.tbody.appendChild(tr);
    }

    this.infoEl.textContent = rows.length
      ? `${start + 1}–${Math.min(start + this.pageSize, rows.length)} of ${rows.length}`
      : '0 of 0';
    this.prevBtn.disabled = this.page <= 1;
    this.nextBtn.disabled = this.page >= pages;
  }
}

export { DataTable };
