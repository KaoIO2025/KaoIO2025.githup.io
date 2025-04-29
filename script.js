let income = 0;
let expense = 0;
let balance = 0;

const incomeSpan = document.getElementById('income');
const expenseSpan = document.getElementById('expense');
const balanceSpan = document.getElementById('balance');
const form = document.getElementById('entry-form');
const historyList = document.getElementById('history-list');

const chart = new Chart(document.getElementById('chart'), {
  type: 'pie',
  data: {
    labels: ['รายรับ', 'รายจ่าย'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#5cb85c', '#d9534f'],
    }]
  },
  options: {
    responsive: true
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const li = document.createElement('li');
  li.textContent = `${desc} - ${amount.toFixed(2)} บาท (${type === 'income' ? 'รับ' : 'จ่าย'})`;
  historyList.prepend(li);

  if (type === 'income') {
    income += amount;
  } else {
    expense += amount;
  }

  balance = income - expense;

  incomeSpan.textContent = income.toFixed(2);
  expenseSpan.textContent = expense.toFixed(2);
  balanceSpan.textContent = balance.toFixed(2);

  chart.data.datasets[0].data = [income, expense];
  chart.update();

  form.reset();
});

