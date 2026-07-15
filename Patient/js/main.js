// نحاكي إن المريض رقم 1 هو اللي عمل Login
localStorage.setItem("currentUser", 1);

const currentUser = Number(localStorage.getItem("currentUser"));

fetch("../data/patients.json")

.then(response => response.json())

.then(patients => {

    const patient = patients.find(p => p.id === currentUser);

    if(!patient) return;

    // اسم المريض

    document.getElementById("patientName").textContent = patient.name;

    // الإحصائيات

    document.getElementById("appointmentsCount").textContent =
    patient.appointments;

    document.getElementById("reportsCount").textContent =
    patient.reports;

    document.getElementById("prescriptionsCount").textContent =
    patient.prescriptions;

    document.getElementById("pointsCount").textContent =
    patient.points;

    // بيانات الدكتور

    document.getElementById("doctorName").textContent =
    patient.doctor.name;

    document.getElementById("doctorSpecialty").textContent =
    patient.doctor.specialty;

    document.getElementById("doctorImage").src =
    patient.doctor.image;

    document.getElementById("appointmentTime").textContent =
    patient.doctor.time;

    document.getElementById("appointmentDate").textContent =
    patient.doctor.date;

    document.getElementById("appointmentCity").textContent =
    patient.doctor.city;

});