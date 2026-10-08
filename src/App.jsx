import { useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import Summary from "./components/Summary.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import CategoryChart from "./components/CategoryChart.jsx";
import Trend from "./components/Trend.jsx";
import { monthLabel, sampleData, toCSV } from "./utils/format.js";

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export default function App() {
  const [items, setItems] = useLocalStorage("mubi-expense-items", []);
  const [editing, setEditing] = useState(null);
  const [month, setMonth] = useState("all");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");

  const months = useMemo(() => {
    const set = new Set(items.map((t) => t.date.slice(0, 7)));
    return [...set].sort().reverse();
  }, [items]);

  const inMonth = useMemo(
    () => items.filter((t) => month === "all" || t.date.startsWith(month)),
    [items, month]
  );

  const income = inMonth.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = inMonth.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inMonth
      .filter((t) => type === "all" || t.type === type)
      .filter((t) => !q || (t.note || "").toLowerCase().includes(q))
      .sort((a, b) => (a.date === b.date ? b.id.localeCompare(a.id) : b.date.localeCompare(a.date)));
  }, [inMonth, type, query]);

  const submit = (data) => {
    if (editing) {
      setItems((prev) => prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t)));
      setEditing(null);
    } else {
      setItems((prev) => [{ ...data, id: uid() }, ...prev]);
    }
  };

  const remove = (id) => {
    if (!window.confirm("Bu yozuv o'chirilsinmi?")) return;
    setItems((prev) => prev.filter((t) => t.id !== id));
    if (editing && editing.id === id) setEditing(null);
  };

  const startEdit = (t) => {
    setEditing(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportCSV = () => {
    const blob = new Blob([toCSV(shown)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "xarajatlar.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <header>
        <div>
          <h1>Xarajatlar hisobi</h1>
          <p className="muted">Kirim va chiqimlaringizni kuzatib boring</p>
        </div>
        <button type="button" className="ghost" onClick={exportCSV} disabled={!shown.length}>
          CSV yuklab olish
        </button>
      </header>

      <div className="toolbar">
        <label className="select">
          <span className="sr">Oy</span>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="all">Barcha vaqt</option>
            {months.map((m) => (
              <option key={m} value={m}>{monthLabel(m)}</option>
            ))}
          </select>
        </label>
      </div>

      <Summary income={income} expense={expense} />

      <div className="layout">
        <div className="col-left">
          <TransactionForm editing={editing} onSubmit={submit} onCancel={() => setEditing(null)} />
          <CategoryChart items={inMonth} />
          <Trend all={items} />
        </div>

        <section className="card col-right">
          <div className="list-head">
            <h2>Yozuvlar</h2>
            <div className="seg small" role="group" aria-label="Filtr">
              {[["all", "Hammasi"], ["income", "Kirim"], ["expense", "Chiqim"]].map(([id, label]) => (
                <button key={id} type="button" aria-pressed={type === id} onClick={() => setType(id)}>{label}</button>
              ))}
            </div>
          </div>
          <input
            className="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Izoh bo'yicha qidirish..."
            aria-label="Qidirish"
          />
          <TransactionList
            items={shown}
            total={items.length}
            onEdit={startEdit}
            onDelete={remove}
            onSample={() => setItems(sampleData())}
          />
        </section>
      </div>
    </main>
  );
}
