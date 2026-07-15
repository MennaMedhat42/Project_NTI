// اسم وصورة المستخدم

const profile = JSON.parse(localStorage.getItem("profile"));

if (profile) {
  const img = document.querySelector(".user img");
  const name = document.querySelector(".user h3");

  if (profile.image) img.src = profile.image;
  if (profile.name) name.textContent = profile.name;
}

// جميع الـ Switches
const switches = document.querySelectorAll(".switch input");

// اللغة
const language = document.querySelector("select");

// الأزرار
const buttons = document.querySelectorAll(".setting-item button");
const deleteBtn = document.querySelector(".delete-btn");

// تحميل الإعدادات
const settings = JSON.parse(localStorage.getItem("settings")) || {
  appointment: true,
  messages: true,
  offers: false,
  language: "العربية",
};

switches[0].checked = settings.appointment;
switches[1].checked = settings.messages;
switches[2].checked = settings.offers;

language.value = settings.language;

// حفظ الإشعارات
switches.forEach(() => {
  saveSettings();
});

switches.forEach((sw) => {
  sw.addEventListener("change", saveSettings);
});

// حفظ اللغة
language.addEventListener("change", saveSettings);

function saveSettings() {
  const data = {
    appointment: switches[0].checked,

    messages: switches[1].checked,

    offers: switches[2].checked,

    language: language.value,
  };

  localStorage.setItem("settings", JSON.stringify(data));
}

// تغيير كلمة المرور
buttons[0].onclick = () => {
  const pass = prompt("أدخل كلمة المرور الجديدة");

  if (!pass) return;

  localStorage.setItem("password", pass);

  alert("تم تغيير كلمة المرور");
};

// تغيير البريد الإلكتروني
buttons[1].onclick = () => {
  const email = prompt("أدخل البريد الإلكتروني الجديد");

  if (!email) return;

  let profile = JSON.parse(localStorage.getItem("profile")) || {};

  profile.email = email;

  localStorage.setItem("profile", JSON.stringify(profile));

  alert("تم تغيير البريد الإلكتروني");
};

// حذف الحساب
deleteBtn.onclick = () => {
  if (confirm("هل تريد حذف الحساب نهائياً؟")) {
    localStorage.clear();

    alert("تم حذف الحساب.");

    window.location.href = "index.html";
  }
};
const language = document.querySelector("select");

// تحميل اللغة
const savedSettings = JSON.parse(localStorage.getItem("settings"));

if (savedSettings) {
  language.value = savedSettings.language;

  if (savedSettings.language === "English") {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  } else {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }
}

// عند تغيير اللغة
language.addEventListener("change", () => {
  const settings = JSON.parse(localStorage.getItem("settings")) || {};

  settings.language = language.value;

  localStorage.setItem("settings", JSON.stringify(settings));

  if (language.value === "English") {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  } else {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }

  location.reload();
});
