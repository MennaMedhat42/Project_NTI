let patientsData = [];
let activePatientId = null;

// 1. جلب البيانات من ملف الـ JSON
async function loadMessagesData() {
    try {
        const response = await fetch('../Data used/messages.json');
        patientsData = await response.json();
        
        if (patientsData.length > 0) {
            // تشغيل أول مريض تلقائياً عند فتح الصفحة
            activePatientId = patientsData[0].patient_id;
            renderPatientsList();
            renderChatWindow();
        }
    } catch (error) {
        console.error("خطأ في تحميل بيانات الرسائل:", error);
    }
}

// 2. طباعة قائمة المرضى في العمود الأوسط
function renderPatientsList() {
    const listContainer = document.getElementById('patients-list-container');
    if (!listContainer) return;

    let listHTML = '';
    patientsData.forEach(patient => {
        const isActive = patient.patient_id === activePatientId ? 'active' : '';
        listHTML += `
            <div class="patient-chat-item p-3 d-flex align-items-center gap-3 ${isActive}" onclick="switchPatient('${patient.patient_id}')">
                <img src="${patient.patient_image}" class="rounded-circle" style="width:48px; height:48px; object-fit:cover;">
                <div class="flex-grow-1" style="min-width: 0;">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-1 fw-bold text-dark text-truncate" style="font-size: 15px;">${patient.patient_name}</h6>
                        <small class="text-muted" style="font-size: 11px;">${patient.last_time}</small>
                    </div>
                    <p class="mb-0 text-muted text-truncate small">${patient.last_message}</p>
                </div>
            </div>
        `;
    });
    listContainer.innerHTML = listHTML;
}

// 3. التنقل بين المرضى عند الضغط على الاسم
function switchPatient(patientId) {
    activePatientId = patientId;
    renderPatientsList(); // لإعادة تعيين كلاس الـ active للرجل المختار
    renderChatWindow();
}

// 4. طباعة شباك المحادثة والرسائل للمريض النشط
function renderChatWindow() {
    const currentPatient = patientsData.find(p => p.patient_id === activePatientId);
    if (!currentPatient) return;

    // تحديث الهيدر
    document.getElementById('active-patient-name').innerText = currentPatient.patient_name;
    document.getElementById('active-patient-img').src = currentPatient.patient_image;

    // طباعة الفقاعات داخل جسم الشات
    const messagesContainer = document.getElementById('chat-messages-container');
    let messagesHTML = '';

    currentPatient.chat_history.forEach(msg => {
        // لو الراسل هو الدكتور بتاخد كلاس دكتور (تركواز)، لو المريض بتاخد كلاس مريض (أبيض)
        const msgClass = msg.sender === 'doctor' ? 'doctor-msg' : 'patient-msg';
        messagesHTML += `
            <div class="msg ${msgClass}">
                ${msg.text}
                <span class="msg-time">${msg.time}</span>
            </div>
        `;
    });

    messagesContainer.innerHTML = messagesHTML;
    
    // جعل الاسكرول ينزل تلقائياً لآخر رسالة تحت
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 5. تشغيل زرار الـ Send وإرسال رسالة جديدة
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الصفحة من الريفريش عند الإرسال
    
    const inputElement = document.getElementById('message-input');
    const messageText = inputElement.value.trim();
    
    if (messageText === '' || !activePatientId) return;

    const currentPatient = patientsData.find(p => p.patient_id === activePatientId);
    if (currentPatient) {
        // وقت الإرسال الحالي
        const now = new Date();
        const currentTimeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        // إضافة الرسالة الجديدة للشات
        currentPatient.chat_history.push({
            sender: 'doctor',
            text: messageText,
            time: currentTimeStr
        });

        // تحديث آخر رسالة في القائمة الجانبية
        currentPatient.last_message = messageText;
        currentPatient.last_time = currentTimeStr;

        // إعادة الطباعة فوراً لتظهر الرسالة في الشات وتتحدث القائمة
        renderChatWindow();
        renderPatientsList();

        // تصفية خانة الكتابة
        inputElement.value = '';
    }
});

// تشغيل الكود فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadMessagesData);