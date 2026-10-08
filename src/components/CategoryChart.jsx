import { getCategory, money } from "../utils/format.js";

const R = 54;
const C = 2 * Math.PI * R;

export default function CategoryChart({ items }) {
  const sums = {};
  items.filter((t) => t.type === "expense").forEach((t) => {
    sums[t.category] = (sums[t.category] || 0) + t.amount;
  });
  const rows = Object.entries(sums)
    .map(([id, value]) => ({ ...getCategory(id), value }))
    .sort((a, b) => b.value - a.value);
  const total = rows.reduce((s, r) => s + r.value, 0);

  if (!total) {
    return (
      <section className="card">
        <h2>Chiqimlar kategoriyalar bo'yicha</h2>
        <p className="muted">Chiqim qo'shilgach, diagramma shu yerda chiqadi.</p>
      </section>
    );
  }

  let offset = 0;
  return (
    <section className="card">
      <h2>Chiqimlar kategoriyalar bo'yicha</h2>
      <div className="donut-wrap">
        <svg viewBox="0 0 140 140" className="donut" role="img" aria-label="Chiqimlar diagrammasi">
          <circle cx="70" cy="70" r={R} fill="none" stroke="var(--line)" strokeWidth="18" />
          {rows.map((r) => {
            const len = (r.value / total) * C;
            const el = (
              <circle
                key={r.id}
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke={r.color}
                strokeWidth="18"
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 70 70)"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <ul className="legend">
          {rows.map((r) => (
            <li key={r.id}>
              <i style={{ background: r.color }} />
              <span>{r.label}</span>
              <b>{Math.round((r.value / total) * 100)}%</b>
              <em>{money(r.value)}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
