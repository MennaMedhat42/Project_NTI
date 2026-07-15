document.addEventListener("DOMContentLoaded", function () {
    console.log("الـ Dashboard جاهزة للعمل!");

    // 1️⃣ تفعيل الـ Active تلقائياً في الـ Sidebar
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link-1');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });

    // 2️⃣ تأثير العد التنازلي للأرقام (عشان الـ Dashboard تبان حية)
    function animateNumbers(element, target) {
        let count = 0;
        let speed = target / 50; // سرعة العد
        let interval = setInterval(() => {
            count += speed;
            element.innerText = Math.floor(count);
            if (count >= target) {
                element.innerText = target;
                clearInterval(interval);
            }
        }, 30);
    }

    const patientCount = document.querySelector('.patient-number'); // تأكدي إن الكلاس ده موجود في الـ HTML
    if (patientCount) {
        animateNumbers(patientCount, 128);
    }
});