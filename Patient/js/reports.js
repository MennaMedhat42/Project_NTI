const reportsData = [
    {
        title: "تحليل دم شامل",
        doctor: "د. أحمد إبراهيم",
        date: "20 يوليو 2026",
        description: "نتائج التحاليل طبيعية مع نسبة هيموجلوبين 14.2 ووظائف الكبد والكلى سليمة.",
        icon: "fa-file-medical"
    },
    {
        title: "تقرير الأشعة",
        doctor: "د. سارة علي",
        date: "15 يوليو 2026",
        description: "لا توجد أي مشكلات ظاهرة في الأشعة، والعظام والمفاصل بحالة جيدة.",
        icon: "fa-notes-medical"
    },
    {
        title: "تحليل السكر",
        doctor: "د. محمد حسن",
        date: "10 يوليو 2026",
        description: "معدل السكر الصائم 95 mg/dL، والنتائج ضمن المعدل الطبيعي.",
        icon: "fa-vial"
    },
    {
        title: "تحليل وظائف الكبد",
        doctor: "د. كريم محمود",
        date: "5 يوليو 2026",
        description: "إنزيمات الكبد ضمن الحدود الطبيعية ولا توجد مؤشرات على وجود التهاب.",
        icon: "fa-flask"
    },
    {
        title: "تقرير القلب",
        doctor: "د. خالد سعيد",
        date: "28 يونيو 2026",
        description: "تخطيط القلب طبيعي، ولا توجد أي علامات لاضطرابات في النبض.",
        icon: "fa-heart-pulse"
    }
];

// ==========================
// عرض التقارير
// ==========================

const container = document.querySelector(".reports");

function renderReports(data) {

    container.innerHTML = "";

    data.forEach(report => {

        container.innerHTML += `
        
        <div class="report-card">

            <div class="report-icon">
                <i class="fa-solid ${report.icon}"></i>
            </div>

            <div class="report-info">

                <h2>${report.title}</h2>

                <p>${report.doctor}</p>

                <span>${report.date}</span>

                <small>${report.description}</small>

            </div>

            <div class="report-actions">

                <button class="view-btn">عرض</button>

                <button class="download-btn">تحميل</button>

            </div>

        </div>
        
        `;
    });

    addEvents();
}

renderReports(reportsData);

// ==========================
// Search
// ==========================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = reportsData.filter(r =>
        r.title.toLowerCase().includes(value) ||
        r.doctor.toLowerCase().includes(value) ||
        r.description.toLowerCase().includes(value)
    );

    renderReports(filtered);
});

// ==========================
// Events
// ==========================

function addEvents() {

    // View
    document.querySelectorAll(".view-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const card = btn.closest(".report-card");

            alert(card.innerText);

        });

    });

    // Download
    document.querySelectorAll(".download-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const card = btn.closest(".report-card");

            const blob = new Blob([card.innerText], { type: "text/plain" });

            const a = document.createElement("a");

            a.href = URL.createObjectURL(blob);

            a.download = "report.txt";

            a.click();

            URL.revokeObjectURL(a.href);

        });

    });
}