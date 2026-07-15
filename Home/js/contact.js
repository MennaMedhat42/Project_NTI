document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');

    // التحكم في إرسال النموذج ومعالجة البيانات تفاعلياً
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // منع الصفحة من التحديث التلقائي

            // جلب القيم المُدخلة من قِبل المستخدم
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            console.log("تم استلام رسالة جديدة:", formData);
            
            alert(`شكراً لك يا ${formData.firstName}، تم استلام رسالتك بنجاح.`);
            
            // إعادة تفريغ الحقول بعد الإرسال الناجح
            contactForm.reset();
        });
    }
});