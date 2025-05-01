// ใช้ Key กลางเก็บข้อมูลใน localStorage
const STORAGE_KEY = 'myFinanceData';

/**
 * ดึงข้อมูลทั้งหมดจาก localStorage
 * return: Array ของรายการ [{date, type, amount, note}]
 */
function getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * บันทึกข้อมูลใหม่ลงไป
 * @param {Object} entry {date, type, amount, note}
 */
function saveData(entry) {
  const data = getData();
  data.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * เคลียร์ข้อมูลทั้งหมด (ใช้ตอน Reset)
 */
function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}
