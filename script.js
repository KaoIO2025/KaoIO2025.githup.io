const form = document.getElementById("form");
const incomeSpan = document.getElementById("income");
const expenseSpan = document.getElementById("expense");
const balanceSpan = document.getElementById("balance");
const historyList = document.getElementById("history-list");
const filterDate = document.getElementById("filter-date");
const filterCategory = document.getElementById("filter-category");
const clearAllBtn = document.getElementById("clear-all");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const chartCtx = document.getElementById("chart").getContext("2d");
const chart = new Chart(chartCtx, {
  type: "doughnut",
  data: {
    labels: ["รายรับ", "รายจ่าย"],
    datasets: [{
      data: [0, 0],
      backgroundColor: ["#28a745", "#dc3545"],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function updateChart(income, expense) {
  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

function updateUI() {
  let income = 0;
  let expense = 0;
  historyList.innerHTML = "";

  const filtered = transactions.filter(t => {
    if (filterDate.value && t.date !== filterDate.value) return false;
    if (filterCategory.value !== "all" && t.category !== filterCategory.value) return false;
    return true;
  });

  filtered.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = t.type === "expense" ? "expense" : "";
    li.innerHTML = `
      ${t.desc} - ${t.amount.toFixed(2)} บาท
      <small>${t.category} | ${t.date}</small>
      <button onclick="deleteItem(${index})">❌</button>
    `;
    historyList.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  const balance = income - expense;
  incomeSpan.textContent = income.toFixed(2);
  expenseSpan.textContent = expense.toFixed(2);
  balanceSpan.textContent = balance.toFixed(2);
  updateChart(income, expense);
}

function deleteItem(index) {
  const filtered = transactions.filter(t => {
    if (filterDate.value && t.date !== filterDate.value) return false;
    if (filterCategory.value !== "all" && t.category !== filterCategory.value) return false;
    return true;
  });

  const itemToDelete = filtered[index];
  const actualIndex = transactions.findIndex(t =>
    t.desc === itemToDelete.desc &&
    t.amount === itemToDelete.amount &&
    t.date === itemToDelete.date &&
    t.category === itemToDelete.category &&
    t.type === itemToDelete.type
  );

  if (actualIndex > -1) {
    transactions.splice(actualIndex, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || !date) return;

  transactions.push({ desc, amount, type, category, date });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  form.reset();
  updateUI();
});

filterDate.addEventListener("change", updateUI);
filterCategory.addEventListener("change", updateUI);
clearAllBtn.addEventListener("click", () => {
  if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบทั้งหมด?")) {
    transactions = [];
    localStorage.setItem("transactions", "[]");
    updateUI();
  }
});

updateUI();
