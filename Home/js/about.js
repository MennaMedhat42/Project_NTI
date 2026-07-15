document.addEventListener("DOMContentLoaded", () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.innerText;
        // استخراج الرقم النقي فقط (تجاهل الـ + و الـ K مؤقتاً للعد)
        const isPlus = text.includes('+');
        const isK = text.includes('K');
        let baseNumber = parseFloat(text.replace(/[+K]/g, ''));

        // إذا كان يحتوي على حرف K نضرب القيمة بـ 1000 لتحقيق قفزة عد متناسقة
        let targetValue = isK ? baseNumber * 1000 : baseNumber;
        let count = 0;
        
        // سرعة العداد التناسبية
        const speed = targetValue / 100; 

        const updateCount = () => {
            count += speed;
            if (count < targetValue) {
                if (isK) {
                    stat.innerText = (count / 1000).toFixed(1) + 'K' + (isPlus ? '+' : '');
                } else {
                    stat.innerText = Math.floor(count) + (isPlus ? '+' : '');
                }
                setTimeout(updateCount, 15);
            } else {
                stat.innerText = text; // إعادة النص الأصلي الدقيق عند الانتهاء
            }
        };

        updateCount();
    });
});