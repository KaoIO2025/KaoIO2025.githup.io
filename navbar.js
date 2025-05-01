// Navbar
document.write(`
  <nav>
    <a href="index.html">🏠 หน้าแรก</a>
    <a href="income-expense.html">💰 รายรับ-รายจ่าย</a>
    <a href="graph.html">📊 กราฟสรุป</a>
  </nav>
`);

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.createElement('button');
  toggle.id = 'darkModeToggle';
  toggle.innerText = '🌙';
  toggle.onclick = () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  };
  document.body.appendChild(toggle);

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
});

