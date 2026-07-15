const promoCode = document.getElementById("promoCode");
const discount = document.getElementById("discount");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

let discountValue = 0;

// أكواد الخصم
const promoCodes = {

    SAVE10: 10,

    SAVE20: 20,

    WELCOME: 15,

    FREE50: 50

};

// تحديث الخصم أثناء الكتابة
promoCode.addEventListener("input", () => {

    const code = promoCode.value.trim().toUpperCase();

    if (promoCodes[code]) {

        discountValue = promoCodes[code];

        discount.value = discountValue + "%";

    } else {

        discountValue = 0;

        discount.value = "0%";

    }

});

// السابق
backBtn.addEventListener("click", () => {

    window.location.href = "insurance.html";

});

// التالي
nextBtn.addEventListener("click", () => {

    localStorage.setItem("promoCode", promoCode.value);

    localStorage.setItem("discount", discountValue);

    window.location.href = "confirm-booking.html";

});