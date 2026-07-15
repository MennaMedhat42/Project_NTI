// قراءة البيانات من localStorage

const appointment = JSON.parse(localStorage.getItem("appointment"));

const questionnaire = JSON.parse(localStorage.getItem("questionnaire"));

const insurance = localStorage.getItem("insurance") || "بدون تأمين";

const promoCode = localStorage.getItem("promoCode") || "";

const discount = Number(localStorage.getItem("discount")) || 0;


// لو مفيش بيانات يرجع لصفحة الحجز

if (!appointment) {

    alert("لا توجد بيانات للحجز");

    window.location.href = "book-appointment.html";

}


// عرض بيانات الموعد

document.getElementById("doctor").textContent = appointment.doctor;

document.getElementById("specialty").textContent = appointment.specialty;

document.getElementById("city").textContent = appointment.city;

document.getElementById("date").textContent = appointment.date;

document.getElementById("time").textContent = appointment.time;


// عرض التأمين والخصم

document.getElementById("insurance").textContent = insurance;

document.getElementById("discount").textContent = discount;


// سعر الكشف

const price = Number(appointment.price);

document.getElementById("price").textContent = price;


// حساب الإجمالي

const total = price - (price * discount / 100);

document.getElementById("total").textContent = total;


// زر السابق

document.getElementById("backBtn").addEventListener("click", () => {

    window.location.href = "promo-code.html";

});


// زر تأكيد الحجز

document.getElementById("confirmBtn").addEventListener("click", () => {

    // قراءة المواعيد القديمة

    const myAppointments =
        JSON.parse(localStorage.getItem("myAppointments")) || [];

    // إنشاء الموعد الجديد

    const newAppointment = {

        doctor: appointment.doctor,

        specialty: appointment.specialty,

        city: appointment.city,

        date: appointment.date,

        time: appointment.time,

        price: appointment.price,

        insurance: insurance,

        promoCode: promoCode,

        discount: discount,

        total: total,

        questionnaire: questionnaire,

        status: "قادم"

    };

    // إضافة الموعد

    myAppointments.push(newAppointment);

    // حفظه

    localStorage.setItem(

        "myAppointments",

        JSON.stringify(myAppointments)

    );

    // حذف البيانات المؤقتة

    localStorage.removeItem("appointment");

    localStorage.removeItem("questionnaire");

    localStorage.removeItem("insurance");

    localStorage.removeItem("promoCode");

    localStorage.removeItem("discount");


    alert("✅ تم تأكيد الحجز بنجاح");


    window.location.href = "my-appointments.html";

});