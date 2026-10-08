# Mubi Xarajatlar hisobi

React + Vite da yozilgan expense tracker (kirim va chiqimlar hisobi).

## Imkoniyatlar
- Kirim va chiqim qo'shish, tahrirlash, o'chirish
- Kategoriyalar (har biri o'z rangi va belgisi bilan)
- Balans, umumiy kirim va chiqim
- Oy bo'yicha filtr, tur bo'yicha filtr, izoh bo'yicha qidiruv
- Chiqimlar kategoriyalar bo'yicha diagrammasi (donut)
- So'nggi 6 oylik kirim/chiqim grafigi
- CSV faylga yuklab olish (Excel'da ochiladi)
- Ma'lumotlar brauzerda saqlanadi (localStorage)
- Yorug' va qorong'i mavzu (qurilma sozlamasiga qarab)
- Mobil, planshet va kompyuterda ishlaydi

## Ishga tushirish
```bash
npm install
npm run dev
```

## Saytga joylash
```bash
npm run build
```
`dist/` papkasini Vercel yoki Netlify'ga yuklang.

## Struktura
```
src/
  App.jsx
  index.css
  main.jsx
  hooks/useLocalStorage.js
  utils/format.js
  components/ Summary, TransactionForm, TransactionList, CategoryChart, Trend
```
