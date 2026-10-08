import { money } from "../utils/format.js";

export default function Summary({ income, expense }) {
  const balance = income - expense;
  return (
    <section className="summary" aria-label="Umumiy hisob">
      <div className="sum-card balance">
        <span>Balans</span>
        <b className={balance < 0 ? "neg" : ""}>{money(balance)}</b>
      </div>
      <div className="sum-card">
        <span>Kirim</span>
        <b className="pos">+{money(income)}</b>
      </div>
      <div className="sum-card">
        <span>Chiqim</span>
        <b className="neg">−{money(expense)}</b>
      </div>
    </section>
  );
}
