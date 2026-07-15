const notificationsContainer = document.querySelector(".notifications");

let notifications =
  JSON.parse(localStorage.getItem("notifications")) || [
    {
      id: 1,
      title: "تم تأكيد موعدك",
      message: "تم تأكيد موعدك مع د. أحمد إبراهيم يوم الخميس الساعة 10:30 صباحًا.",
      time: "منذ 10 دقائق",
      icon: "fa-calendar-check",
      color: "success",
      read: false,
    },
    {
      id: 2,
      title: "تم رفع تقرير جديد",
      message: "تم إضافة تقرير الأشعة إلى ملفك الطبي.",
      time: "منذ ساعتين",
      icon: "fa-file-medical",
      color: "report",
      read: true,
    },
    {
      id: 3,
      title: "تمت إضافة وصفة طبية",
      message: "قام الطبيب بإضافة وصفة علاج جديدة.",
      time: "منذ يوم",
      icon: "fa-prescription-bottle-medical",
      color: "medicine",
      read: true,
    },
    {
      id: 4,
      title: "تذكير بالموعد",
      message: "متبقي 24 ساعة على موعدك القادم.",
      time: "منذ يومين",
      icon: "fa-triangle-exclamation",
      color: "warning",
      read: true,
    },
  ];

saveNotifications();
renderNotifications();

function renderNotifications() {
  notificationsContainer.innerHTML = "";

  if (notifications.length === 0) {
    notificationsContainer.innerHTML = `
      <div class="empty">
        <i class="fa-solid fa-bell-slash"></i>
        <h3>لا توجد إشعارات</h3>
      </div>
    `;
    return;
  }

  notifications.forEach((item) => {
    notificationsContainer.innerHTML += `
      <div class="notification-card ${
        !item.read ? "unread" : ""
      }" data-id="${item.id}">

        <div class="icon ${item.color}">
          <i class="fa-solid ${item.icon}"></i>
        </div>

        <div class="notification-info">
          <h2>${item.title}</h2>
          <p>${item.message}</p>
          <span>${item.time}</span>
        </div>

        <div class="notification-actions">
          <button class="read-btn">
            <i class="fa-solid fa-check"></i>
          </button>

          <button class="delete-btn">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

      </div>
    `;
  });

  updateCounter();
}

notificationsContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".notification-card");
  if (!card) return;

  const id = Number(card.dataset.id);

  if (e.target.closest(".read-btn")) {
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );

    saveNotifications();
    renderNotifications();
  }

  if (e.target.closest(".delete-btn")) {
    notifications = notifications.filter((n) => n.id !== id);

    saveNotifications();
    renderNotifications();
  }
});

function updateCounter() {
  const bell = document.querySelector(".notification");

  const unread = notifications.filter((n) => !n.read).length;

  if (unread > 0) {
    bell.setAttribute("data-count", unread);
  } else {
    bell.removeAttribute("data-count");
  }
}

function saveNotifications() {
  localStorage.setItem("notifications", JSON.stringify(notifications));
}

// تستخدمها من أي صفحة لإضافة إشعار جديد
function addNotification(title, message, icon, color) {
  notifications.unshift({
    id: Date.now(),
    title,
    message,
    time: "الآن",
    icon,
    color,
    read: false,
  });

  saveNotifications();
  renderNotifications();
}

// حذف جميع الإشعارات
function clearNotifications() {
  notifications = [];
  saveNotifications();
  renderNotifications();
}