const form = document.getElementById('form');
const incomeSpan = document.getElementById('income');
const expenseSpan = document.getElementById('expense');
const balanceSpan = document.getElementById('balance');
const historyList = document.getElementById('history-list');

let income = 0;
let expense = 0;
let balance = 0;

const chartCtx = document.getElementById('chart').getContext('2d');
const chart = new Chart(chartCtx, {
  type: 'doughnut',
  data: {
    labels: ['รายรับ', 'รายจ่าย'],
    datasets: [{
      data: [income, expense],
      backgroundColor: ['#28a745', '#dc3545']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

function updateUI() {
  incomeSpan.textContent = income.toFixed(2);
  expenseSpan.textContent = expense.toFixed(2);
  balanceSpan.textContent = balance.toFixed(2);

  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const li = document.createElement('li');
  li.textContent = `${desc} - ${amount.toFixed(2)} บาท (${type === 'income' ? 'รับ' : 'จ่าย'})`;

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.title = 'ลบรายการ';
  delBtn.onclick = () => {
    if (type === 'income') income -= amount;
    else expense -= amount;
    balance = income - expense;
    updateUI();
    li.remove();
  };

  li.appendChild(delBtn);
  historyList.prepend(li);

  if (type === 'income') income += amount;
  else expense += amount;

  balance = income - expense;
  updateUI();
  form.reset();
});
