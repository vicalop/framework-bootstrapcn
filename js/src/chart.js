// Chart: SVG bar / line / area / donut from JSON, coloured with --chart-N tokens.
import { escapeHtml } from './util.js';

const store = new WeakMap();
const COLORS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'];

function tokenFill(i) {
  return `hsl(var(${COLORS[i % COLORS.length]}))`;
}

class Chart {
  static getOrCreate(el) {
    let inst = store.get(el);
    if (!inst) { inst = new Chart(el); store.set(el, inst); }
    return inst;
  }

  constructor(el) {
    this.el = el;
    el.classList.add('bootcn-chart');
    this.type = el.dataset.type || 'bar';
    this.labelKey = el.dataset.labelKey || 'label';
    this.valueKey = el.dataset.valueKey || 'value';
    this.data = this._parse();
    this._render();
  }

  _parse() {
    const script = this.el.querySelector('script[type="application/json"]');
    try {
      if (script) return JSON.parse(script.textContent);
      if (this.el.dataset.values) return JSON.parse(this.el.dataset.values);
    } catch (e) { /* fall through */ }
    return [];
  }

  _points() {
    return this.data.map((row) => ({
      label: String(row[this.labelKey] ?? row.name ?? ''),
      value: Number(row[this.valueKey] ?? row.y ?? 0),
    }));
  }

  _render() {
    const pts = this._points();
    if (!pts.length) {
      this.el.insertAdjacentHTML('beforeend', '<div class="bootcn-chart-empty">No data</div>');
      return;
    }
    const max = Math.max(...pts.map((p) => p.value), 1);
    let svg = '';
    if (this.type === 'donut') svg = this._donut(pts, max);
    else if (this.type === 'line' || this.type === 'area') svg = this._line(pts, max, this.type === 'area');
    else svg = this._bar(pts, max);

    this.el.insertAdjacentHTML('afterbegin', svg);
    if (this.el.dataset.legend !== 'false') {
      const legend = pts.map((p, i) =>
        `<span><span class="bootcn-chart-swatch" style="background:${tokenFill(i)}"></span>${escapeHtml(p.label)}</span>`
      ).join('');
      this.el.insertAdjacentHTML('beforeend', `<div class="bootcn-chart-legend">${legend}</div>`);
    }
  }

  _bar(pts, max) {
    const w = 400, h = 180, pad = { t: 8, r: 8, b: 24, l: 8 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const gap = 8;
    const bw = Math.max(4, (iw - gap * (pts.length - 1)) / pts.length);
    const bars = pts.map((p, i) => {
      const bh = (p.value / max) * ih;
      const x = pad.l + i * (bw + gap);
      const y = pad.t + ih - bh;
      return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${tokenFill(i)}">` +
        `<title>${escapeHtml(p.label)}: ${p.value}</title></rect>` +
        `<text class="bootcn-chart-axis" x="${(x + bw / 2).toFixed(1)}" y="${h - 6}" text-anchor="middle">${escapeHtml(p.label)}</text>`;
    }).join('');
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart">${bars}</svg>`;
  }

  _line(pts, max, area) {
    const w = 400, h = 180, pad = { t: 12, r: 12, b: 24, l: 12 };
    const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    const xy = pts.map((p, i) => {
      const x = pad.l + (pts.length === 1 ? iw / 2 : (i / (pts.length - 1)) * iw);
      const y = pad.t + ih - (p.value / max) * ih;
      return { x, y, p };
    });
    const d = xy.map((c, i) => `${i ? 'L' : 'M'}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const areaD = area
      ? `${d} L${xy[xy.length - 1].x.toFixed(1)},${(pad.t + ih).toFixed(1)} L${xy[0].x.toFixed(1)},${(pad.t + ih).toFixed(1)} Z`
      : '';
    const dots = xy.map((c, i) =>
      `<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.5" fill="${tokenFill(i)}"><title>${escapeHtml(c.p.label)}: ${c.p.value}</title></circle>`
    ).join('');
    const labels = xy.map((c) =>
      `<text class="bootcn-chart-axis" x="${c.x.toFixed(1)}" y="${h - 6}" text-anchor="middle">${escapeHtml(c.p.label)}</text>`
    ).join('');
    const fill = area ? `<path d="${areaD}" fill="hsl(var(--chart-1) / .2)" stroke="none"/>` : '';
    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${area ? 'Area' : 'Line'} chart">` +
      `${fill}<path d="${d}" fill="none" stroke="${tokenFill(0)}" stroke-width="2"/>${dots}${labels}</svg>`;
  }

  _donut(pts) {
    const size = 180, cx = 90, cy = 90, r = 58, stroke = 22;
    const total = pts.reduce((s, p) => s + p.value, 0) || 1;
    const c = 2 * Math.PI * r;
    let offset = 0;
    const rings = pts.map((p, i) => {
      const len = (p.value / total) * c;
      const dash = `${len.toFixed(2)} ${(c - len).toFixed(2)}`;
      const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${tokenFill(i)}" ` +
        `stroke-width="${stroke}" stroke-dasharray="${dash}" stroke-dashoffset="${(-offset).toFixed(2)}" ` +
        `transform="rotate(-90 ${cx} ${cy})"><title>${escapeHtml(p.label)}: ${p.value}</title></circle>`;
      offset += len;
      return el;
    }).join('');
    return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Donut chart">${rings}</svg>`;
  }
}

export { Chart };
