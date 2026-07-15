document.addEventListener("DOMContentLoaded", function () {
    // كود بسيط لفتح تفاصيل أي طلب
    const detailButtons = document.querySelectorAll('.btn-info');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert("جاري تحميل تفاصيل الموافقة...");
        });
    });
});
// اتأكدي إن الـ Modal موجود في الـ HTML قبل ما تحاولي تفتحيه
function addCompany() {
    let nameInput = document.getElementById("companyName");
    let name = nameInput.value;

    if (name.trim() !== "") {
        let tableBody = document.querySelector("tbody");
        let newRow = `<tr>
            <td>${name}</td>
            <td><span class="badge bg-success-subtle text-success">نشط</span></td>
            <td>---</td>
        </tr>`;
        
        tableBody.insertAdjacentHTML('beforeend', newRow);
        
        // قفل الـ Modal
        let modalElement = document.getElementById('addCompanyModal');
        let modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        
        nameInput.value = ""; // تفريغ
    } else {
        alert("من فضلك اكتبي اسم الشركة!");
    }
}
function deleteCompany(btn) {
    if (confirm("هل أنت متأكد من حذف هذه الشركة؟")) {
        let row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}

function editCompany(btn) {
    let row = btn.parentNode.parentNode;
    let nameCell = row.cells[0];
    let newName = prompt("تعديل اسم الشركة:", nameCell.innerText);
    if (newName !== null && newName !== "") {
        nameCell.innerText = newName;
    }
}
function updateStatus(statusText, statusClass) {
    // 1. تحديد صف المريض اللي إحنا فاتحين الـ Modal بتاعه
    // (بما إننا في الـ Modal، بنعتبر مريم هي اللي تحت المراجعة حالياً)
    let badge = document.querySelector(".badge.bg-warning-subtle"); 
    
    // 2. تحديث النص واللون
    badge.innerText = statusText;
    badge.className = "badge " + statusClass;
    
    // 3. قفل الـ Modal
    let modal = bootstrap.Modal.getInstance(document.getElementById('detailsModal'));
    modal.hide();
    
    alert("تم تغيير حالة الطلب إلى: " + statusText);
}