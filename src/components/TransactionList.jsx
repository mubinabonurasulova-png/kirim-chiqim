import { dateLabel, getCategory, money } from "../utils/format.js";

export default function TransactionList({ items, total, onEdit, onDelete, onSample }) {
  if (!items.length) {
    return (
      <div className="empty">
        <p>{total ? "Bu filtr bo'yicha yozuv topilmadi" : "Hozircha yozuvlar yo'q. Chapdan birinchisini qo'shing."}</p>
        {!total && (
          <button type="button" className="link" onClick={onSample}>Namuna ma'lumot qo'shish</button>
        )}
      </div>
    );
  }

  return (
    <ul className="list">
      {items.map((t) => {
        const cat = getCategory(t.category);
        const income = t.type === "income";
        return (
          <li key={t.id}>
            <span className="ico" style={{ background: cat.color + "26" }} aria-hidden="true">{cat.icon}</span>
            <div className="info">
              <b>{t.note || cat.label}</b>
              <span>{cat.label} · {dateLabel(t.date)}</span>
            </div>
            <span className={`amt ${income ? "pos" : "neg"}`}>{income ? "+" : "−"}{money(t.amount)}</span>
            <div className="acts">
              <button type="button" onClick={() => onEdit(t)} aria-label="Tahrirlash">✎</button>
              <button type="button" className="del" onClick={() => onDelete(t.id)} aria-label="O'chirish">×</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
