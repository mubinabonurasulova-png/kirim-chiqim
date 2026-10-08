import { useEffect, useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, todayStr } from "../utils/format.js";

const empty = () => ({ type: "expense", amount: "", category: "food", date: todayStr(), note: "" });

export default function TransactionForm({ editing, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty());
  const [error, setError] = useState("");

  // Tahrirlash rejimiga o'tganda formani to'ldiradi
  useEffect(() => {
    if (editing) {
      setForm({ ...editing, amount: String(editing.amount) });
      setError("");
    } else {
      setForm(empty());
    }
  }, [editing]);

  const cats = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const setType = (type) => {
    const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    set({ type, category: list[0].id });
  };

  const onAmount = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 12);
    set({ amount: digits });
  };

  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      setError("Summani kiriting");
      return;
    }
    if (!form.date) {
      setError("Sanani tanlang");
      return;
    }
    onSubmit({ ...form, amount, note: form.note.trim() });
    setError("");
    if (!editing) setForm({ ...empty(), type: form.type, category: form.category });
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{editing ? "Yozuvni tahrirlash" : "Yangi yozuv"}</h2>

      <div className="seg" role="group" aria-label="Turi">
        <button type="button" aria-pressed={form.type === "expense"} className="exp" onClick={() => setType("expense")}>Chiqim</button>
        <button type="button" aria-pressed={form.type === "income"} className="inc" onClick={() => setType("income")}>Kirim</button>
      </div>

      <label className="field">
        <span>Summa (so'm)</span>
        <input
          inputMode="numeric"
          value={form.amount ? Number(form.amount).toLocaleString("ru-RU") : ""}
          onChange={onAmount}
          placeholder="0"
          aria-invalid={!!error}
        />
      </label>

      <div className="row2">
        <label className="field">
          <span>Kategoriya</span>
          <select value={form.category} onChange={(e) => set({ category: e.target.value })}>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Sana</span>
          <input type="date" value={form.date} max={todayStr()} onChange={(e) => set({ date: e.target.value })} />
        </label>
      </div>

      <label className="field">
        <span>Izoh (ixtiyoriy)</span>
        <input value={form.note} maxLength={60} onChange={(e) => set({ note: e.target.value })} placeholder="Masalan: bozor" />
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="primary">{editing ? "Saqlash" : "Qo'shish"}</button>
        {editing && <button type="button" className="ghost" onClick={onCancel}>Bekor qilish</button>}
      </div>
    </form>
  );
}
