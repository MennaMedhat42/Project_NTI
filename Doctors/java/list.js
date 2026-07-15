// متغير لتخزين كل المرضى القادمين من الـ JSON
let allPatients = [];

// 1. جلب البيانات من ملف patients2.json
// 1. جلب البيانات من ملف patients2.json من داخل فولدر js
async function fetchPatients() {
    try {
        const response = await fetch('../Data used/patients2.json'); // التعديل هنا
        allPatients = await response.json();
        
        // عرض المرضى في الجدول لأول مرة
        displayPatients(allPatients);
    } catch (error) {
        console.error("حدث خطأ أثناء جلب بيانات المرضى:", error);
    }
}

// 2. دالة عرض المرضى داخل الـ HTML ديناميكياً
function displayPatients(patientsList) {
    const tableBody = document.getElementById('patients-table-body');
    tableBody.innerHTML = ''; // تنظيف الجدول أولاً

    if (patientsList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">لا يوجد مرضى يطابقون بحثك.</td></tr>`;
        return;
    }

    patientsList.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="fw-bold">${index + 1}</td>
            <td class="fw-bold text-dark">${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.phone}</td>
            <td>${patient.last_visit}</td>
            <td class="text-center">
                <button class="btn p-0 border-0 view-btn" data-id="${patient.id}">
                    <i class="fa-solid fa-eye action-view fs-5"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // ربط أزرار العين (View) بحدث الضغط لحفظ المعرّف والانتقال
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const patientId = this.getAttribute('data-id');
            // حفظ الـ ID في ذاكرة المتصفح
            localStorage.setItem('selectedPatientId', patientId);
            // الانتقال لصفحة التفاصيل
            window.location.href = 'patient-details.html';
        });
    });
}

// 3. تشغيل ميزة البحث (Search) الحقيقي أثناء الكتابة
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase().trim();
    
    // فلترة المصفوفة بناءً على الاسم أو رقم الهاتف
    const filtered = allPatients.filter(patient => {
        return patient.name.toLowerCase().includes(searchText) || 
               patient.phone.includes(searchText);
    });
    
    displayPatients(filtered);
});

// تشغيل الدالة فور تحميل الشاشة
document.addEventListener('DOMContentLoaded', fetchPatients);
// 4. معالجة فورم إضافة مريض جديد
document.getElementById('add-patient-form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الصفحة من الريفريش عند الإرسال

    // جلب القيم من الـ Inputs
    const name = document.getElementById('new-p-name').value.trim();
    const age = document.getElementById('new-p-age').value.trim();
    const gender = document.getElementById('new-p-gender').value;
    const phone = document.getElementById('new-p-phone').value.trim();

    // إنشاء كائن المريض الجديد بهيكل يشبه الـ JSON
    const newPatient = {
        id: `MED-00${allPatients.length + 25}`, // توليد ID تلقائي ذكي
        name: name,
        age: parseInt(age),
        gender: gender,
        phone: phone,
        last_visit: new Date().toLocaleDateString('pt-PT'), // تاريخ اليوم تلقائياً
        medical_quiz: { diabetes: "لا يوجد", blood_pressure: "لا يوجد", allergy: "لا يوجد", surgeries: "لا يوجد", complaint: "مريض جديد" },
        prescriptions: [],
        timeline: []
    };

    // إضافة المريض الجديد لأول المصفوفة عشان يظهر فوق
    allPatients.unshift(newPatient);

    // إعادة عرض الجدول بالبيانات المحدثة
    displayPatients(allPatients);

    // إعادة تعيين (تنظيف) الفورم وإغلاق الـ Modal
    document.getElementById('add-patient-form').reset();
    const modalElement = document.getElementById('addPatientModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});