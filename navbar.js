const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// โหลดสถานะ Dark Mode ถ้ามี
if (localStorage.getItem('dark') === 'true') {
  body.classList.add('dark');
}

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  // บันทึกสถานะ Dark Mode
  localStorage.setItem('dark', body.classList.contains('dark'));
});

