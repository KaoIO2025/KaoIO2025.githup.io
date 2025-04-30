// app.js

// เรียกใช้งาน DOM
const addIncomeExpenseBtn = document.getElementById("addIncomeExpenseBtn");
const addModal = document.getElementById("addModal");
const cancelBtn = document.getElementById("cancelBtn");
const addForm = document.getElementById("addForm");
const incomeExpenseTable = document.getElementById("incomeExpenseTable");

// ฟังก์ชันโหลดข้อมูลจาก localStorage และแสดงในตาราง
function loadData() {
    const items = JSON.parse(localStorage.getItem("incomeExpenseList")) || [];
    incomeExpenseTable.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.classList.add("border-t");
        row.innerHTML = `
            <td class="px-4 py-2">${item.type === 'income' ? 'รายรับ' : 'รายจ่าย'}</td>
            <td class="px-4 py-2">${item.amount}</td>
            <td class="px-4 py-2">${item.date}</td>
            <td class="px-4 py-2">
                <button class="text-red-500" onclick="deleteItem('${item.id}')">ลบ</button>
            </td>
        `;
        incomeExpenseTable.appendChild(row);
    });
}

// ฟังก์ชันเพิ่มรายการ
function addItem(event) {
    event.preventDefault();
    
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    
    if (!amount || !date) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const newItem = {
        id: new Date().getTime(),
        type,
        amount,
        date
    };

    const items = JSON.parse(localStorage.getItem("incomeExpenseList")) || [];
    items.push(newItem);
    localStorage.setItem("incomeExpenseList", JSON.stringify(items));
    
    // รีเฟรชการแสดงผล
    loadData();

    // ปิด Modal และเคลียร์ฟอร์ม
    addModal.classList.add("hidden");
    addForm.reset();
}

// ฟังก์ชันลบรายการ
function deleteItem(id) {
    const items = JSON.parse(localStorage.getItem("incomeExpenseList")) || [];
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem("incomeExpenseList", JSON.stringify(updatedItems));
    
    // รีเฟรชการแสดงผล
    loadData();
}

// ฟังก์ชันเปิด/ปิด Modal
addIncomeExpenseBtn.addEventListener("click", () => {
    addModal.classList.remove("hidden");
});

cancelBtn.addEventListener("click", () => {
    addModal.classList.add("hidden");
});

// ฟอร์ม submit
addForm.addEventListener("submit", addItem);

// เรียกใช้ loadData เมื่อโหลดหน้า
loadData();
