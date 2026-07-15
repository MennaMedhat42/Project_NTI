document.addEventListener("DOMContentLoaded", () => {
  const appointments =
    JSON.parse(localStorage.getItem("myAppointments")) || [];

  const container = document.querySelector(".appointments-container");

  if (appointments.length === 0) {
    container.innerHTML = "<h2>لا توجد مواعيد</h2>";
    return;
  }

  // عرض المواعيد
  appointments.forEach((app, index) => {
    container.innerHTML += `
      <div class="appointment-card" data-status="${app.status.trim()}">

          <h3>${app.doctor}</h3>

          <p><strong>التخصص:</strong> ${app.specialty}</p>
          <p><strong>التاريخ:</strong> ${app.date}</p>
          <p><strong>الوقت:</strong> ${app.time}</p>
          <p><strong>الحالة:</strong> ${app.status}</p>

          <div class="appointment-actions">

              <button class="edit-btn" onclick="editAppointment(${index})">
                  تعديل
              </button>

              <button class="cancel-btn" onclick="cancelAppointment(${index})">
                  إلغاء
              </button>

          </div>

      </div>
    `;
  });

  // الفلترة
  const filterButtons = document.querySelectorAll(
    ".appointment-filter button"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.textContent.trim();

      document.querySelectorAll(".appointment-card").forEach((card) => {
        if (card.dataset.status === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // البحث
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".search-box button");

  searchBtn.addEventListener("click", searchAppointments);

  function searchAppointments() {
    const value = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".appointment-card").forEach((card) => {
      const text = card.textContent.toLowerCase();

      card.style.display = text.includes(value) ? "block" : "none";
    });
  }
});

// إلغاء الموعد
function cancelAppointment(index) {
  let appointments =
    JSON.parse(localStorage.getItem("myAppointments")) || [];

  if (confirm("هل تريد إلغاء هذا الموعد؟")) {
    appointments[index].status = "الملغية";

    localStorage.setItem("myAppointments", JSON.stringify(appointments));

    location.reload();
  }
}

// تعديل الموعد
function editAppointment(index) {
  let appointments =
    JSON.parse(localStorage.getItem("myAppointments")) || [];

  localStorage.setItem(
    "appointment",
    JSON.stringify(appointments[index])
  );

  window.location.href = "book-appointment.html";
}