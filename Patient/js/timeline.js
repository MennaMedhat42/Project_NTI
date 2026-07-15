// ==========================
// Timeline Data Filter + Search
// ==========================

const searchInput = document.querySelector(".search-box input");
const items = document.querySelectorAll(".timeline-item");

// بحث داخل السجل
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();

  items.forEach((item) => {
    const text = item.innerText.toLowerCase();

    if (text.includes(value)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// ==========================
// Buttons Action (Details)
// ==========================

const buttons = document.querySelectorAll(".timeline-content button");

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".timeline-item");
    const title = card.querySelector("h2").innerText;
    const desc = card.querySelector("p").innerText;
    const date = card.querySelector(".date").innerText;

    alert(`📌 ${title}\n📅 ${date}\n\n${desc}`);
  });
});
