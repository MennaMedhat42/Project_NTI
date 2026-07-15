const profileImage = document.getElementById("profileImage");
const imageInput = document.getElementById("imageInput");
const changeImage = document.getElementById("changeImage");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const birthDate = document.getElementById("birthDate");
const gender = document.getElementById("gender");
const address = document.getElementById("address");

const headerName = document.getElementById("headerName");

const saveBtn = document.getElementById("saveProfile");

// تحميل البيانات

const profile = JSON.parse(localStorage.getItem("profile"));

if (profile) {
  fullName.value = profile.name;
  email.value = profile.email;
  phone.value = profile.phone;
  birthDate.value = profile.birthDate;
  gender.value = profile.gender;
  address.value = profile.address;

  headerName.textContent = profile.name;

  if (profile.image) {
    profileImage.src = profile.image;
  }
}

// اختيار صورة

changeImage.onclick = () => imageInput.click();

imageInput.onchange = function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    profileImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
};

// حفظ البيانات

saveBtn.onclick = () => {
  const data = {
    name: fullName.value,
    email: email.value,
    phone: phone.value,
    birthDate: birthDate.value,
    gender: gender.value,
    address: address.value,
    image: profileImage.src,
  };

  localStorage.setItem("profile", JSON.stringify(data));

  headerName.textContent = data.name;

  alert("تم حفظ البيانات بنجاح");
};
