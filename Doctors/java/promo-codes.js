// مصفوفة البيانات الافتراضية لأكواد خصم عيادة الأسنان
let promoCodes = [
    { id: 1, code: "SKIN20", discount: "20%", startDate: "2026-01-01", endDate: "2026-07-31", status: "active" },
    { id: 2, code: "WELCOME10", discount: "10%", startDate: "2026-02-15", endDate: "2026-06-30", status: "expired" },
    { id: 3, code: "SUMMER15", discount: "15%", startDate: "2026-06-01", endDate: "2026-08-31", status: "active" },
    { id: 4, code: "NEWPATIENT", discount: "25%", startDate: "2026-01-10", endDate: "2026-05-31", status: "expired" },
    { id: 5, code: "EID10", discount: "10%", startDate: "2026-04-01", endDate: "2026-04-20", status: "disabled" }
];

const tableBody = document.getElementById('promo-table-body');

// دالة تحويل الحالة لنص عربي منسق
function getStatusBadge(status) {
    if (status === 'active') return `<span class="status-badge active">مفعل</span>`;
    if (status === 'expired') return `<span class="status-badge expired">منتهي</span>`;
    return `<span class="status-badge disabled">غير مفعل</span>`;
}

// دالة عرض الأكواد في الجدول
function renderTable() {
    tableBody.innerHTML = '';
    
    promoCodes.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight: 600; color: #1e293b;">${item.code}</td>
            <td>${item.discount}</td>
            <td>${item.startDate}</td>
            <td>${item.endDate}</td>
            <td>${getStatusBadge(item.status)}</td>
            <td class="actions-cell">
                <button class="action-btn edit" onclick="editCode(${item.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="action-btn delete" onclick="deleteCode(${item.id})"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// دالة حذف الكود
function deleteCode(id) {
    if(confirm("هل أنت متأكد من حذف كود الخصم هذا؟")) {
        promoCodes = promoCodes.filter(c => c.id !== id);
        renderTable();
    }
}

// دالة تعديل افتراضية (يمكن توسيعها)
function editCode(id) {
    alert("سيتم فتح نافذة تعديل الكود رقم: " + id);
}

// --- التحكم بالنوافذ المنبثقة (Modals Logic) ---

const createModal = document.getElementById('create-modal');
const logoutModal = document.getElementById('logout-modal');

// فتح وإغلاق نافذة إضافة كود جديد
document.getElementById('open-create-modal').addEventListener('click', () => createModal.classList.add('open'));
document.getElementById('close-create-modal').addEventListener('click', () => createModal.classList.remove('open'));
document.getElementById('cancel-create-btn').addEventListener('click', () => createModal.classList.remove('open'));

// فتح وإغلاق نافذة تسجيل الخروج
document.getElementById('open-logout-btn').addEventListener('click', () => logoutModal.classList.add('open'));
document.getElementById('close-logout-btn').addEventListener('click', () => logoutModal.classList.remove('open'));

// عند تقديم نموذج إضافة كود جديد واحتسابه ديناميكياً للجدول
document.getElementById('add-code-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const codeName = document.getElementById('codeName').value.toUpperCase();
    const codeDiscount = document.getElementById('codeDiscount').value + "%";
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // إدراج الكود الجديد في المصفوفة وتعيينه كمفعل بشكل تلقائي أولى
    const newCode = {
        id: promoCodes.length + 1,
        code: codeName,
        discount: codeDiscount,
        startDate: startDate,
        endDate: endDate,
        status: 'active'
    };
    
    promoCodes.unshift(newCode); // لإضافته في أول الجدول
    renderTable();
    
    // تفريغ المدخلات وإغلاق النافذة
    document.getElementById('add-code-form').reset();
    createModal.classList.remove('open');
});

// تفعيل زرار "السابق" و "التالي" لمجرد التفاعل البرمجي الجمالي
document.getElementById('prev-btn').addEventListener('click', () => alert("تم الانتقال للصفحة السابقة"));
document.getElementById('next-btn').addEventListener('click', () => alert("تم الانتقال للصفحة التالية"));

// التشغيل الأولي للجدول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderTable);