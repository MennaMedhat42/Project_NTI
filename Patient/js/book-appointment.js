const city = document.getElementById("city");
const specialty = document.getElementById("specialty");
const doctor = document.getElementById("doctor");
const date = document.getElementById("date");
const time = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");

let doctors = [];

// قراءة ملف doctors.json
fetch("../data/doctors.json")
  .then((response) => response.json())
  .then((data) => {
    doctors = data;
  })
  .catch((error) => {
    console.error("Error Loading Doctors:", error);
  });

// تحميل الدكاترة حسب المدينة والتخصص
function loadDoctors() {
  doctor.innerHTML = '<option value="">اختر الطبيب</option>';

  if (city.value === "" || specialty.value === "") {
    return;
  }

  const filteredDoctors = doctors.filter((d) => {
    return d.city === city.value && d.specialty === specialty.value;
  });

  if (filteredDoctors.length === 0) {
    doctor.innerHTML += "<option disabled>لا يوجد أطباء</option>";

    return;
  }

  filteredDoctors.forEach((d) => {
    doctor.innerHTML += `
            <option value="${d.name}">
                ${d.name}
            </option>
        `;
  });
}

// عند تغيير المدينة أو التخصص
city.addEventListener("change", loadDoctors);
specialty.addEventListener("change", loadDoctors);

// زر التالي
nextBtn.addEventListener("click", () => {
  // التحقق من إدخال جميع البيانات
  if (
    city.value === "" ||
    specialty.value === "" ||
    doctor.value === "" ||
    date.value === "" ||
    time.value === ""
  ) {
    alert("من فضلك أكمل جميع البيانات");

    return;
  }

  // الحصول على بيانات الطبيب المختار
  const selectedDoctor = doctors.find((d) => d.name === doctor.value);

  if (!selectedDoctor) {
    alert("حدث خطأ، اختر الطبيب مرة أخرى.");

    return;
  }

  // إنشاء بيانات الموعد
  const appointment = {
    city: selectedDoctor.city,

    specialty: selectedDoctor.specialty,

    doctor: selectedDoctor.name,

    date: date.value,

    time: time.value,

    price: selectedDoctor.price,

    rating: selectedDoctor.rating,

    image: selectedDoctor.image,
  };

  // حفظ البيانات
  localStorage.setItem("appointment", JSON.stringify(appointment));

  // الانتقال للاستبيان
  window.location.href = "questionnaire.html";
});
let history = JSON.parse(localStorage.getItem("pointsHistory")) || [];

history.unshift({
  title: "حجز موعد جديد",
  date: new Date().toLocaleDateString("ar-EG"),
  points: 50,
});

localStorage.setItem("pointsHistory", JSON.stringify(history));
