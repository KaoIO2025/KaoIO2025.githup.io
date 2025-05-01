document.addEventListener('DOMContentLoaded', () => {
  // สร้าง Navbar HTML
  const nav = document.createElement('nav');
  nav.innerHTML = `
    <div class="nav-left">
      <a href="index.html">🏠 Dashboard</a>
      <a href="income-expense.html">✍️ บันทึกข้อมูล</a>
      <a href="graph.html">📈 กราฟ</a>
      <a href="export.html">📥 Export</a>
    </div>
    <button class="dark-toggle">🌙</button>
  `;

  // ใส่ Navbar ไว้ที่ body ก่อนหน้าเนื้อหา
  document.body.prepend(nav);

  // Dark Mode Toggle
  const toggle = nav.querySelector('.dark-toggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Save Dark Mode Preference
    localStorage.setItem('darkMode', document.body.classList.contains('dark') ? '1' : '0');
  });

  // โหลด Dark Mode Preference ตอนเริ่ม
  if (localStorage.getItem('darkMode') === '1') {
    document.body.classList.add('dark');
  }
});
