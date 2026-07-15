document.addEventListener("DOMContentLoaded", function () {
    
    // 1️⃣ التحكم في أزرار إلغاء المواعيد
    const cancelButtons = document.querySelectorAll(".btn-cancel");
    
    cancelButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            // الوصول للكارت اللي شايل الموعد ده بالظبط
            const appointmentCard = e.target.closest(".appointment-card");
            // جلب اسم المريض عشان نخليه في رسالة التأكيد
            const patientName = appointmentCard.querySelector("h6").innerText;
            
            // إظهار رسالة تأكيد للدكتور
            const confirmCancel = confirm(`هل أنت متأكد من إلغاء موعد المريض: ${patientName}?`);
            
            if (confirmCancel) {
                // عمل تأثير اختفاء ناعم قبل الحذف
                appointmentCard.style.transition = "all 0.4s ease";
                appointmentCard.style.opacity = "0";
                appointmentCard.style.transform = "scale(0.9)";
                
                setTimeout(() => {
                    appointmentCard.remove();
                    alert(`تم إلغاء موعد ${patientName} بنجاح.`);
                }, 400);
            }
        });
    });

    // 2️⃣ تفاعل الضغط على "عرض الطلب" أو "الانتقال للرسائل" في الإشعارات
    const viewLinks = document.querySelectorAll(".notification-item span");
    
    viewLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const actionText = e.target.innerText;
            if (actionText === "الانتقال للرسائل") {
                // ينقله لصفحة الرسائل المظبوطة اللي لسه مخلصينها
                window.location.href = "messages.html";
            } else {
                alert("جاري فتح تفاصيل طلب الحجز القادم...");
            }
        });
    });

});