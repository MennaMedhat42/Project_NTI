// ==========================
// عناصر الصفحة
// ==========================
const fileInput = document.querySelector("input[type='file']");
const uploadBtn = document.querySelector(".upload-card button");
const gallery = document.querySelector(".photo-gallery");

// ==========================
// تحميل الصور من localStorage
// ==========================
let photos = JSON.parse(localStorage.getItem("photos")) || [];

function renderPhotos() {
  gallery.innerHTML = "";

  photos.forEach((photo, index) => {
    const card = document.createElement("div");
    card.classList.add("photo-card");

    card.innerHTML = `
            <img src="${photo.url}" alt="Photo">

            <div class="photo-info">
                <h3>${photo.title}</h3>
                <span>${photo.date}</span>
            </div>

            <button class="delete-btn" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

    gallery.appendChild(card);
  });

  addDeleteEvents();
}

// ==========================
// رفع صورة
// ==========================
uploadBtn.addEventListener("click", () => {
  const file = fileInput.files[0];

  if (!file) {
    alert("اختر صورة أولاً");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const newPhoto = {
      url: e.target.result,
      title: "صورة متابعة",
      date: new Date().toLocaleDateString("ar-EG"),
    };

    photos.push(newPhoto);
    localStorage.setItem("photos", JSON.stringify(photos));

    renderPhotos();
    fileInput.value = "";
  };

  reader.readAsDataURL(file);
});

// ==========================
// حذف صورة
// ==========================
function addDeleteEvents() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;

      photos.splice(index, 1);
      localStorage.setItem("photos", JSON.stringify(photos));

      renderPhotos();
    });
  });
}

renderPhotos();
