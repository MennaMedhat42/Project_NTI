const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");

const diseases = document.getElementById("diseases");
const allergy = document.getElementById("allergy");
const medications = document.getElementById("medications");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

// الرجوع للصفحة السابقة
backBtn.addEventListener("click", () => {
    window.location.href = "book-appointment.html";
});

// الانتقال للصفحة التالية
nextBtn.addEventListener("click", () => {

    if (
        age.value === "" ||
        height.value === "" ||
        weight.value === ""
    ) {

        alert("من فضلك أكمل جميع البيانات");

        return;

    }

    const questionnaire = {

        age: age.value,

        height: height.value,

        weight: weight.value,

        diseases: diseases.value || "لا يوجد",

        allergy: allergy.value || "لا يوجد",

        medications: medications.value || "لا يوجد"

    };

    localStorage.setItem(
        "questionnaire",
        JSON.stringify(questionnaire)
    );

    window.location.href =
        "appointment-summary.html";

});