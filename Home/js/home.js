
fetch("../js/doctors.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("doctors-container");
    container.innerHTML = ""; // تنظيف الحاوية قبل الإضافة

    data.slice(0, 4).forEach((doctor) => {
      container.innerHTML += `
        <div class="doctor-card">
          <div class="doctor-image-wrapper">
            <img src="${doctor.image}" alt="${doctor.name}">
          </div>
          <div class="doctor-info">
            <span class="specialty-badge">${doctor.specialty}</span>
            <h3>${doctor.name}</h3>
            
            <div class="info-row">
              <span class="city"><i class="fa-solid fa-location-dot"></i> ${doctor.city}</span>
              <span class="rating"><i class="fa-solid fa-star"></i> ${doctor.rating}</span>
            </div>

            <div class="price-row">
              <i class="fa-solid fa-money-bill-wave"></i>
              <span>سعر الكشف: <strong>${doctor.price} جنيه</strong></span>
            </div>

           
            <button class="view-profile-btn" onclick="openDoctorProfile('${doctor.id}')">
                        عرض الملف الشخصي  
               </button>

          </div>
        </div>
      `;
    });
  })
  .catch((error) => console.log("خطأ في جلب بيانات الأطباء:", error));

function openDoctorProfile(id) {

    localStorage.setItem("doctorId", id);

    window.location.href = "../../Doctors/html/doctor.Profile.html";

}



  //********************************feature***************************************** */
  const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        accordionItems.forEach((accordion) => {
            accordion.classList.remove("active");

            const icon = accordion.querySelector("i");
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
        });

        if (!isActive) {
            item.classList.add("active");

            const icon = item.querySelector("i");
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
        }

    });

});