import { lastMonths, monthShort } from "../utils/format.js";

export default function Trend({ all }) {
  const months = lastMonths(6);
  const data = months.map((key) => {
    const inMonth = all.filter((t) => t.date.startsWith(key));
    return {
      key,
      income: inMonth.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      expense: inMonth.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    };
  });
  const max = Math.max(1, ...data.flatMap((d) => [d.income, d.expense]));

  return (
    <section className="card">
      <h2>So'nggi 6 oy</h2>
      <div className="trend" role="img" aria-label="Oylik kirim va chiqim">
        {data.map((d) => (
          <div key={d.key} className="col">
            <div className="bars">
              <i className="b-inc" style={{ height: `${(d.income / max) * 100}%` }} title={`Kirim: ${d.income}`} />
              <i className="b-exp" style={{ height: `${(d.expense / max) * 100}%` }} title={`Chiqim: ${d.expense}`} />
            </div>
            <span>{monthShort(d.key)}</span>
          </div>
        ))}
      </div>
      <div className="key"><span><i className="b-inc" /> Kirim</span><span><i className="b-exp" /> Chiqim</span></div>
    </section>
  );
}
