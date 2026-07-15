const chatBody = document.querySelector(".chat-body");
const input = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".chat-input button");

// تحميل الرسائل
let messages = JSON.parse(localStorage.getItem("messages")) || [
  {
    type: "doctor",
    text: "صباح الخير، كيف حالتك اليوم؟",
  },

  {
    type: "patient",
    text: "الحمد لله أفضل بكثير.",
  },

  {
    type: "doctor",
    text: "ممتاز، استمر على العلاج.",
  },
];

// عرض الرسائل
function loadMessages() {
  chatBody.innerHTML = "";

  messages.forEach((msg) => {
    chatBody.innerHTML += `
            <div class="message ${msg.type}">
                ${msg.text}
            </div>
        `;
  });

  chatBody.scrollTop = chatBody.scrollHeight;
}

loadMessages();

// إرسال رسالة
function sendMessage() {
  const text = input.value.trim();

  if (text === "") return;

  messages.push({
    type: "patient",

    text: text,
  });

  localStorage.setItem("messages", JSON.stringify(messages));

  input.value = "";

  loadMessages();

  // رد تلقائي بعد ثانية
  setTimeout(() => {
    messages.push({
      type: "doctor",

      text: "تم استلام رسالتك، وسيتم الرد عليك في أقرب وقت.",
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    loadMessages();
  }, 1000);
}

// زر الإرسال
sendBtn.onclick = sendMessage;

// زر Enter
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
