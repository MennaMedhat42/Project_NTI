


const selectedPatientId = localStorage.getItem('selectedPatientId');

// إذا لم يكن هناك مريض مختار، ارجع لصفحة القائمة تلقائياً
if (!selectedPatientId) {
    window.location.href = 'patients-list.html';
}

// 2. جلب البيانات من الـ JSON وفلترة المريض الصح
async function loadPatientDetails() {
    try {
        const response = await fetch('/Data used/patients2.json');
        const patients = await response.json();
        
        // البحث عن المريض المطابق للـ ID (التأكد من مطابقة النوع سواء String أو Number)
        const patient = patients.find(p => String(p.id) === String(selectedPatientId));
        
        if (patient) {
            renderPatientData(patient);
        } else {
            console.error("المريض غير موجود بملف البيانات");
        }
    } catch (error) {
        console.error("حدث خطأ أثناء جلب تفاصيل المريض:", error);
    }
}

// 3. دالة توزيع البيانات داخل عناصر الـ HTML ديناميكياً
function renderPatientData(patient) {
    // أ) تحديث الكارت الجانبي وتغيير الصورة ديناميكياً
    if (patient.image) {
        document.getElementById('patient-avatar').src = patient.image;
    }
    
    document.getElementById('patient-name').innerText = patient.name;
    document.getElementById('patient-id').innerText = `معرّف المريض: ${patient.id}`;
    
    document.getElementById('patient-age').innerHTML = `<span class="text-muted"><i class="fa-solid fa-calendar-day me-2" style="width:20px; color:#64748b;"></i></span><strong>العمر:</strong> ${patient.age} عام`;
    document.getElementById('patient-gender').innerHTML = `<span class="text-muted"><i class="fa-solid fa-venus-mars me-2" style="width:20px; color:#64748b;"></i></span><strong>الجنس:</strong> ${patient.gender}`;
    document.getElementById('patient-phone').innerHTML = `<span class="text-muted"><i class="fa-solid fa-phone me-2" style="width:20px; color:#64748b;"></i></span><strong>الهاتف:</strong> ${patient.phone}`;
    document.getElementById('patient-blood').innerHTML = `<span class="text-muted"><i class="fa-solid fa-droplet me-2" style="width:20px; color:#ef4444;"></i></span><strong>فصيلة الدم:</strong> ${patient.blood_type || '---'}`;

    // ب) تحديث التبويب الأول بالكامل ديناميكياً (البيانات التفصيلية)
    const infoContainer = document.getElementById('info-tab-content');
    if (infoContainer) {
        infoContainer.innerHTML = `
            <div class="col-md-6"><p class="mb-1 text-muted">الاسم ثلاثي:</p><p class="fw-bold text-dark fs-6">${patient.name}</p></div>
            <div class="col-md-6"><p class="mb-1 text-muted">العنوان السكني:</p><p class="fw-bold text-dark fs-6">${patient.address || '---'}</p></div>
            <div class="col-md-6"><p class="mb-1 text-muted">البريد الإلكتروني:</p><p class="fw-bold text-dark fs-6">${patient.email || '---'}</p></div>
            <div class="col-md-6"><p class="mb-1 text-muted">تاريخ الانضمام للعيادة:</p><p class="fw-bold text-dark fs-6">${patient.last_visit || '---'}</p></div>
        `;
    }

    // ج) تحديث التبويب الثاني: الاستبيان الطبي
    const quizContainer = document.getElementById('quiz-tab-content');
    if (quizContainer && patient.medical_quiz) {
        let quizHTML = '';
        if (Array.isArray(patient.medical_quiz)) {
            patient.medical_quiz.forEach(q => {
                quizHTML += `
                    <div class="col-md-6">
                        <p class="mb-1 text-muted">${q.question}</p>
                        <p class="fw-bold text-dark fs-6">${q.answer}</p>
                    </div>`;
            });
        } else {
            Object.keys(patient.medical_quiz).forEach(key => {
                quizHTML += `
                    <div class="col-md-6">
                        <p class="mb-1 text-muted">${key}</p>
                        <p class="fw-bold text-dark fs-6">${patient.medical_quiz[key]}</p>
                    </div>`;
            });
        }
        quizContainer.innerHTML = quizHTML;
    }

    // د) تحديث التبويب الثالث: الروشتات العلاجية (Prescriptions)
    const prescriptionContainer = document.getElementById('prescriptions-tab-content');
    if (prescriptionContainer) {
        if (!patient.prescriptions || patient.prescriptions.length === 0) {
            prescriptionContainer.innerHTML = `<div class="text-center text-muted py-4">لا توجد روشتات مسجلة لهذا المريض حتى الآن.</div>`;
        } else {
            let prescriptionsHTML = `
                <div class="table-responsive">
                    <table class="table table-hover align-middle border">
                        <thead>
                            <tr>
                                <th>اسم الدواء العلمي</th>
                                <th>التركيز</th>
                                <th>معدل التكرار اليومي</th>
                                <th>المدة الزمنية</th>
                            </tr>
                        </thead>
                        <tbody class="text-dark fw-semibold">`;
            
            patient.prescriptions.forEach(pre => {
                prescriptionsHTML += `
                    <tr>
                        <td>${pre.medicine}</td>
                        <td><span class="badge bg-secondary">${pre.dose}</span></td>
                        <td>${pre.frequency}</td>
                        <td>${pre.duration}</td>
                    </tr>`;
            });
            prescriptionsHTML += `</tbody></table></div>`;
            prescriptionContainer.innerHTML = prescriptionsHTML;
        }
    }

    // هـ) تحديث التبويب الرابع: الخط الزمني للزيارات (Timeline)
    const timelineContainer = document.getElementById('timeline-tab-content');
    if (timelineContainer) {
        if (!patient.timeline || patient.timeline.length === 0) {
            timelineContainer.innerHTML = `<div class="text-center text-muted py-4">لا توجد زيارات سابقة مسجلة.</div>`;
        } else {
            let timelineHTML = '';
            patient.timeline.forEach((time, index) => {
                // الكشف عن الزيارة القادمة لتمييز لون النقطة الافتراضية
                const isNext = time.title.includes("القادم") || time.title.includes("الموعد") ? 'next-visit' : '';
                timelineHTML += `
                    <div class="timeline-item ${isNext}">
                        <p class="mb-1 text-muted small fw-bold">${time.date}</p>
                        <p class="fw-bold text-dark m-0 fs-6">${time.title}</p>
                        <p class="text-muted small">${time.details}</p>
                    </div>
                `;
            });
            timelineContainer.innerHTML = timelineHTML;
        }
    }

    // و) تحديث تبويب صور الحالات ديناميكياً
    const photosContainer = document.getElementById('photos-tab-content');
    if (photosContainer) {
        const images = patient.case_images || patient.images || [];
        let photosHTML = '';
        
        if (Array.isArray(images) && images.length > 0) {
            images.forEach(imgUrl => {
                photosHTML += `
                    <div class="col-md-4">
                        <img src="${imgUrl}" class="gallery-img shadow-sm" alt="Case Image">
                    </div>`;
            });
        }
        
        // إضافة خانة "إرفاق ملف جديد" الثابتة في آخر الصور دائمًا لتناسق الشكل الجمالي للمنصة
        photosHTML += `
            <div class="col-md-4 d-flex align-items-center justify-content-center border rounded bg-light" style="height: 160px; border-style: dashed !important; border-width: 2px !important; border-color: #cbd5e1 !important; cursor:pointer;">
                <div class="text-center text-muted">
                    <i class="fa-solid fa-cloud-arrow-up fs-4 mb-2 text-secondary"></i>
                    <p class="m-0 small fw-bold">إرفاق أشعة أو ملف جديد</p>
                </div>
            </div>`;
            
        photosContainer.innerHTML = photosHTML;
    }
}

// تشغيل جلب البيانات فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadPatientDetails);








