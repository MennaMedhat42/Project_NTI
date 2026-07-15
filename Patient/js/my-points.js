// بيانات المستخدم

const profile = JSON.parse(localStorage.getItem("profile"));

if (profile) {

    document.getElementById("headerName").textContent = profile.name;

    if (profile.image) {
        document.getElementById("headerImage").src = profile.image;
    }

}

// سجل النقاط

let history = JSON.parse(localStorage.getItem("pointsHistory"));

if (!history) {

    history = [

        {
            title: "حجز موعد جديد",
            date: "20 يوليو 2026",
            points: 50
        },

        {
            title: "إكمال استبيان طبي",
            date: "18 يوليو 2026",
            points: 20
        },

        {
            title: "استخدام خصم",
            date: "12 يوليو 2026",
            points: -100
        },

        {
            title: "دعوة صديق",
            date: "5 يوليو 2026",
            points: 150
        }

    ];

    localStorage.setItem("pointsHistory", JSON.stringify(history));

}

const container = document.getElementById("pointsHistory");

let total = 0;

container.innerHTML = "";

history.forEach(item => {

    total += Number(item.points);

    container.innerHTML += `

        <div class="point-item">

            <div class="point-info">

                <h3>${item.title}</h3>

                <span>${item.date}</span>

            </div>

            <div class="point-value ${item.points >= 0 ? "plus" : "minus"}">

                ${item.points >= 0 ? "+" : ""}${item.points}

            </div>

        </div>

    `;

});

document.getElementById("totalPoints").textContent = `${total} نقطة`;