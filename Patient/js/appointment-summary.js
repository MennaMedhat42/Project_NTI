const appointment = JSON.parse(localStorage.getItem("appointment"));
const questionnaire = JSON.parse(localStorage.getItem("questionnaire"));

if (!appointment || !questionnaire) {

    alert("لا توجد بيانات للحجز");

    window.location.href = "book-appointment.html";

}

// بيانات الموعد

document.getElementById("doctor").textContent = appointment.doctor;
document.getElementById("specialty").textContent = appointment.specialty;
document.getElementById("city").textContent = appointment.city;
document.getElementById("date").textContent = appointment.date;
document.getElementById("time").textContent = appointment.time;

// بيانات الاستبيان

document.getElementById("age").textContent = questionnaire.age;
document.getElementById("height").textContent = questionnaire.height;
document.getElementById("weight").textContent = questionnaire.weight;
document.getElementById("diseases").textContent = questionnaire.diseases;
document.getElementById("allergy").textContent = questionnaire.allergy;
document.getElementById("medications").textContent = questionnaire.medications;

// الأزرار

document.getElementById("backBtn").addEventListener("click", () => {

    window.location.href = "questionnaire.html";

});

document.getElementById("nextBtn").addEventListener("click", () => {

    window.location.href = "insurance.html";

});