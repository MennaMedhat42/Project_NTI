// اسم وصورة المستخدم

const profile = JSON.parse(localStorage.getItem("profile"));

if (profile) {
  const headerName = document.getElementById("headerName");
  const headerImage = document.getElementById("headerImage");

  if (headerName) headerName.textContent = profile.name;
  if (headerImage && profile.image) headerImage.src = profile.image;
}

// أزرار العروض

const buttons = document.querySelectorAll(".offer-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const cost = Number(button.dataset.points);

    let history = JSON.parse(localStorage.getItem("pointsHistory")) || [];

    // حساب الرصيد الحالي
    let total = 0;

    history.forEach((item) => {
      total += Number(item.points);
    });

    // التحقق من وجود نقاط كافية
    if (total < cost) {
      alert("ليس لديك نقاط كافية.");
      return;
    }

    // اسم المنتج
    const productName = button
      .closest(".offer-card")
      .querySelector("h2").textContent;

    // خصم النقاط
    history.unshift({
      title: `استبدال عرض (${productName})`,

      date: new Date().toLocaleDateString("ar-EG"),

      points: -cost,
    });

    localStorage.setItem("pointsHistory", JSON.stringify(history));

    alert(`تم استبدال ${cost} نقطة بنجاح 🎉`);
  });
});
// البحث

const searchInput = document.querySelector(".search-box input");
const offers = document.querySelectorAll(".offer-card");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  offers.forEach((offer) => {
    const text = offer.innerText.toLowerCase();

    if (text.includes(value)) {
      offer.style.display = "flex";
    } else {
      offer.style.display = "none";
    }
  });
});
