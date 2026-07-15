const insurance = document.getElementById("insurance");

const backBtn = document.getElementById("backBtn");

const nextBtn = document.getElementById("nextBtn");

backBtn.addEventListener("click", () => {

    window.location.href = "appointment-summary.html";

});

nextBtn.addEventListener("click", () => {

    if (insurance.value === "") {

        alert("من فضلك اختر شركة التأمين");

        return;

    }

    localStorage.setItem("insurance", insurance.value);

    window.location.href = "promo-code.html";

});