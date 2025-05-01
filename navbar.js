// ใส่ Navbar
document.write(`
  <div class="navbar">
    <div class="logo">MyProApp</div>
    <div class="nav-links">
      <a href="index.html" class="nav-btn">
        <i data-lucide="home"></i>
        <span class="label">Home</span>
      </a>
      <a href="income-expense.html" class="nav-btn">
        <i data-lucide="wallet"></i>
        <span class="label">รายรับรายจ่าย</span>
      </a>
      <a href="edit.html" class="nav-btn">
        <i data-lucide="edit"></i>
        <span class="label">แก้ไข</span>
      </a>
      <a href="graph.html" class="nav-btn">
        <i data-lucide="bar-chart-2"></i>
        <span class="label">กราฟ</span>
      </a>
      <a href="category.html" class="nav-btn">
        <i data-lucide="folder"></i>
        <span class="label">หมวดหมู่</span>
      </a>
      <a href="reset.html" class="nav-btn">
        <i data-lucide="refresh-ccw"></i>
        <span class="label">รีเซ็ต</span>
      </a>
      <button class="toggle-btn" onclick="toggleDarkMode()" id="darkModeToggle">🌙 Dark Mode</button>
    </div>
  </div>
`);

// Icons
lucide.createIcons();

// Dark Mode
window.onload = function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').textContent = "☀️ Light Mode";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    document.getElementById('darkModeToggle').textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem('theme', 'light');
    document.getElementById('darkModeToggle').textContent = "🌙 Dark Mode";
  }
}

