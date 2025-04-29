let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const list = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const balanceEl = document.getElementById("balance");

function addTransaction() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const type = document.getElementById("type").value;

  if (!description || !amount || !date) return alert("กรุณากรอกข้อมูลให้ครบ");

  const transaction = { id: Date.now(), description, amount, date, category, type };
  transactions.push(transaction);
  saveAndRender();
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndRender();
}

function clearAll() {
  if (confirm("คุณแน่ใจว่าต้องการลบทั้งหมด?")) {
    transactions = [];
    saveAndRender();
  }
}

function filterTransactions() {
  const filterDate = document.getElementById("filter-date").value;
  const filterCategory = document.getElementById("filter-category").value;
  renderList(transactions.filter(t => {
    return (!filterDate || t.date === filterDate) &&
           (filterCategory === "ทั้งหมด" || t.category === filterCategory);
  }));
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderList(transactions);
  updateSummary();
  updateChart();
}

function renderList(data) {
  list.innerHTML = "";
  data.forEach(t => {
    const li = document.createElement("li");
    li.className = t.type === "expense" ? "expense" : "";
    li.innerHTML = `
      ${t.date} | ${t.description} (${t.category}): ${t.amount} บาท
      <button onclick="deleteTransaction(${t.id})">ลบ</button>`;
    list.appendChild(li);
  });
}

function updateSummary() {
  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  totalIncomeEl.textContent = income.toFixed(2);
  totalExpenseEl.textContent = expense.toFixed(2);
  balanceEl.textContent = (income - expense).toFixed(2);
}

let chart;
function updateChart() {
  const categories = [...new Set(transactions.map(t => t.category))];
  const data = categories.map(cat =>
    transactions
      .filter(t => t.category === cat && t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: categories,
      datasets: [{
        label: "รายจ่ายตามหมวดหมู่",
        data,
        backgroundColor: "#f44336"
      }]
    }
  });
}

// เริ่มต้น
saveAndRender();

