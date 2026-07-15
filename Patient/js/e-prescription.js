const container = document.querySelector(".prescriptions");
fetch("../data/prescriptions.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const instructions = item.instructions
        .map((text) => `<li>${text}</li>`)
        .join("");

      container.innerHTML += `
            <div class="prescription-card">

                <div class="icon">
                    <i class="fa-solid ${item.icon}"></i>
                </div>

                <div class="info">

                    <h2>${item.medicine}</h2>

                    <p>${item.doctor}</p>

                    <span>${item.date}</span>

                    <small class="status ${item.status}">
                        ${item.status}
                    </small>

                    <ul>
                        ${instructions}
                    </ul>

                </div>

                <div class="actions">

                    <button class="view-btn">
                        عرض
                    </button>

                    <button class="download-btn">
                        تحميل PDF
                    </button>

                </div>

            </div>
            `;
    });

    addEvents();
  });

function addEvents() {
  // البحث
  const search = document.querySelector(".search-box input");

  search.addEventListener("keyup", () => {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".prescription-card").forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(value)
        ? "flex"
        : "none";
    });
  });

  // عرض
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".prescription-card");

      alert(card.querySelector(".info").innerText);
    });
  });

  // تحميل
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".prescription-card");

      const text = card.querySelector(".info").innerText;

      const blob = new Blob([text], {
        type: "text/plain",
      });

      const a = document.createElement("a");

      a.href = URL.createObjectURL(blob);

      a.download = card.querySelector("h2").innerText + ".txt";

      a.click();

      URL.revokeObjectURL(a.href);
    });
  });
} // ===============================
// Search Prescriptions
// ===============================

const searchInput = document.querySelector(".search-box input");
const cards = document.querySelectorAll(".prescription-card");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// ===============================
// View Prescription
// ===============================

document.querySelectorAll(".view-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".prescription-card");

    const medicine = card.querySelector("h2").innerText;
    const doctor = card.querySelector("p").innerText;
    const date = card.querySelector("span").innerText;

    const instructions = [...card.querySelectorAll("li")]
      .map((li) => "- " + li.innerText)
      .join("\n");

    alert(
      `💊 ${medicine}

👨‍⚕️ ${doctor}

📅 ${date}

التعليمات:
${instructions}`,
    );
  });
});

// ===============================
// Download Prescription
// ===============================

document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".prescription-card");

    const medicine = card.querySelector("h2").innerText;
    const doctor = card.querySelector("p").innerText;
    const date = card.querySelector("span").innerText;

    const instructions = [...card.querySelectorAll("li")]
      .map((li) => li.innerText)
      .join("\n");

    const content = `Prescription

Medicine: ${medicine}

Doctor: ${doctor}

Date: ${date}

Instructions:
${instructions}`;

    const blob = new Blob([content], { type: "text/plain" });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = medicine + ".txt";

    a.click();

    URL.revokeObjectURL(a.href);
  });
});

// ===============================
// Add Favorite Button
// ===============================

cards.forEach((card) => {
  const actions = card.querySelector(".actions");

  const favBtn = document.createElement("button");

  favBtn.innerHTML = "⭐";

  favBtn.className = "fav-btn";

  actions.appendChild(favBtn);

  favBtn.addEventListener("click", () => {
    card.classList.toggle("favorite");

    if (card.classList.contains("favorite")) {
      favBtn.innerHTML = "⭐ مفضلة";
    } else {
      favBtn.innerHTML = "⭐";
    }
  });
});

// ===============================
// Delete Button
// ===============================

cards.forEach((card) => {
  const actions = card.querySelector(".actions");

  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "حذف";

  deleteBtn.className = "delete-btn";

  actions.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    if (confirm("هل تريد حذف هذه الوصفة؟")) {
      card.remove();
    }
  });
});
