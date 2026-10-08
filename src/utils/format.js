export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Oziq-ovqat", icon: "🍽️", color: "#ef5b4c" },
  { id: "transport", label: "Transport", icon: "🚌", color: "#f59f3a" },
  { id: "home", label: "Uy-joy", icon: "🏠", color: "#6b7be0" },
  { id: "bills", label: "Kommunal", icon: "💡", color: "#e8c53a" },
  { id: "health", label: "Sog'liq", icon: "💊", color: "#2bb3a3" },
  { id: "edu", label: "Ta'lim", icon: "📚", color: "#3a8fd9" },
  { id: "shop", label: "Kiyim va xaridlar", icon: "🛍️", color: "#d65db1" },
  { id: "fun", label: "Ko'ngilochar", icon: "🎬", color: "#8e6bd6" },
  { id: "other-e", label: "Boshqa", icon: "📦", color: "#8a97a3" },
];

export const INCOME_CATEGORIES = [
  { id: "salary", label: "Maosh", icon: "💼", color: "#12a36b" },
  { id: "side", label: "Qo'shimcha daromad", icon: "💻", color: "#2bb3a3" },
  { id: "gift", label: "Sovg'a", icon: "🎁", color: "#f59f3a" },
  { id: "other-i", label: "Boshqa", icon: "💰", color: "#8a97a3" },
];

const ALL = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
export const getCategory = (id) => ALL.find((c) => c.id === id) || ALL[8];

export const money = (n) => `${Math.round(n).toLocaleString("ru-RU")} so'm`;

export const todayStr = () => new Date().toLocaleDateString("sv"); // YYYY-MM-DD

const MONTHS = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
const MONTHS_SHORT = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];

export const monthLabel = (key) => {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};
export const monthShort = (key) => MONTHS_SHORT[Number(key.split("-")[1]) - 1];

export const dateLabel = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}-${MONTHS[m - 1].toLowerCase()}`;
};

// So'nggi n oy kalitlari (eskidan yangiga)
export const lastMonths = (n) => {
  const out = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return out;
};

export function toCSV(items) {
  const rows = [["Sana", "Turi", "Kategoriya", "Izoh", "Summa"]];
  items.forEach((t) =>
    rows.push([t.date, t.type === "income" ? "Kirim" : "Chiqim", getCategory(t.category).label, t.note || "", t.amount])
  );
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  return "\uFEFF" + rows.map((r) => r.map(esc).join(",")).join("\n");
}

export function sampleData() {
  const d = (back) => {
    const x = new Date();
    x.setDate(x.getDate() - back);
    return x.toLocaleDateString("sv");
  };
  const mk = (type, category, amount, note, back) => ({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type, category, amount, note, date: d(back),
  });
  return [
    mk("income", "salary", 4500000, "Oylik maosh", 6),
    mk("income", "side", 800000, "Frilans loyiha", 3),
    mk("expense", "home", 1200000, "Ijara", 5),
    mk("expense", "food", 185000, "Bozor", 4),
    mk("expense", "transport", 60000, "Taksi", 3),
    mk("expense", "bills", 210000, "Elektr va gaz", 2),
    mk("expense", "edu", 350000, "Online kurs", 2),
    mk("expense", "fun", 90000, "Kino", 1),
    mk("expense", "food", 75000, "Tushlik", 0),
  ];
}
