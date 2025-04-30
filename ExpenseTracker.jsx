// ExpenseTracker.jsx
import { useState } from "react";

export default function ExpenseTracker() {
  const [entries, setEntries] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("income");

  const handleAdd = () => {
    if (!amount || isNaN(amount)) return;
    setEntries([
      ...entries,
      { amount: parseFloat(amount), desc, type },
    ]);
    setAmount("");
    setDesc("");
  };

  const income = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const expense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-green-600">
        บันทึกรายรับรายจ่าย
      </h1>

      <div className="bg-white shadow p-4 rounded space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setType("income")}
            className={`flex-1 p-2 rounded ${
              type === "income" ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            รายรับ
          </button>
          <button
            onClick={() => setType("expense")}
            className={`flex-1 p-2 rounded ${
              type === "expense" ? "bg-red-200" : "bg-gray-100"
            }`}
          >
            รายจ่าย
          </button>
        </div>

        <input
          className="w-full border p-2 rounded"
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="คำอธิบาย (เช่น ค่าอาหาร, เงินเดือน)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button onClick={handleAdd} className="w-full bg-blue-500 text-white p-2 rounded">
          เพิ่มรายการ
        </button>
      </div>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <div className="flex justify-between text-green-700">
          <span>รายรับทั้งหมด</span>
          <span>{income.toFixed(2)} ฿</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>รายจ่ายทั้งหมด</span>
          <span>{expense.toFixed(2)} ฿</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>คงเหลือ</span>
          <span>{(income - expense).toFixed(2)} ฿</span>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded space-y-2">
        <h2 className="font-semibold mb-2">รายการทั้งหมด</h2>
        {entries.map((e, idx) => (
          <div
            key={idx}
            className={`flex justify-between border-b py-1 ${
              e.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>{e.desc || (e.type === "income" ? "รายรับ" : "รายจ่าย")}</span>
            <span>{e.amount.toFixed(2)} ฿</span>
          </div>
        ))}
        {entries.length === 0 && <p className="text-center text-gray-500">ยังไม่มีข้อมูล</p>}
      </div>
    </div>
  );
}
