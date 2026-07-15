
fetch("../js/doctors.json")
.then(response => response.json())
.then(allDoctors => {

    let filteredDoctors = [...allDoctors];//نسخة من الدكاترة

    const container = document.getElementById("doctors-container");
    const resultsCount = document.getElementById("results-count");
    const pagination = document.getElementById("pagination");

    const searchInput = document.getElementById("search-name");
    const citySelect = document.getElementById("city");
    const specialtySelect = document.getElementById("specialty");
    const filterBtn = document.getElementById("filter-btn");

    const perPage = 8;
    let currentPage = 1;

    // ================= عرض الدكاترة =================
    function displayDoctors(page) {

        container.innerHTML = "";

        resultsCount.innerHTML = `النتائج (${filteredDoctors.length} طبيب)`;

        if (filteredDoctors.length === 0) {
            container.innerHTML = `
                <h3 style="text-align:center;width:100%;margin:40px 0;">
                    لا يوجد أطباء مطابقون للبحث
                </h3>
            `;
            return;
        }

        let start = (page - 1) * perPage;
        let end = start + perPage;

        let doctors = filteredDoctors.slice(start, end);

        doctors.forEach(doctor => {

            container.innerHTML += `
                <div class="doctor-card">

                    <img src="${doctor.image}" alt="${doctor.name}">

                    <div class="doctor-info">

                        <h3>${doctor.name}</h3>

                        <p class="specialty">${doctor.specialty}</p>

                        <p class="city">📍 ${doctor.city}</p>

                        <p class="price">${doctor.price} جنيه</p>


<button class="btn"
onclick="openDoctorProfile('${doctor.id}')">
عرض الملف الشخصي
</button>

                    </div>

                </div>
            `;

        });

    }

    // ================= Pagination =================
    function createPagination() {

        pagination.innerHTML = "";

        let totalPages = Math.ceil(filteredDoctors.length / perPage);

        if (totalPages <= 1) {
            pagination.style.display = "none";
            return;
        }

        pagination.style.display = "flex";

        pagination.innerHTML += `<button id="prev-btn">السابق</button>`;

        for (let i = 1; i <= totalPages; i++) {

            pagination.innerHTML += `
                <button class="page-num ${i === currentPage ? "active" : ""}">
                    ${i}
                </button>
            `;

        }

        pagination.innerHTML += `<button id="next-btn">التالي</button>`;

        document.querySelectorAll(".page-num").forEach(btn => {

            btn.addEventListener("click", function () {

                currentPage = Number(this.innerText);

                displayDoctors(currentPage);

                createPagination();

            });

        });

        document.getElementById("prev-btn").addEventListener("click", () => {

            if (currentPage > 1) {

                currentPage--;

                displayDoctors(currentPage);

                createPagination();

            }

        });

        document.getElementById("next-btn").addEventListener("click", () => {

            if (currentPage < totalPages) {

                currentPage++;

                displayDoctors(currentPage);

                createPagination();

            }

        });

    }

    // ================= الفلترة =================
    function filterDoctors() {

        let name = searchInput.value.toLowerCase().trim();
        let city = citySelect.value;
        let specialty = specialtySelect.value;

        filteredDoctors = allDoctors.filter(doctor => {

            return (
                doctor.name.toLowerCase().includes(name) &&
                (city === "" || doctor.city.includes(city)) &&
                (specialty === "" || doctor.specialty === specialty)
            );

        });

        currentPage = 1;

        displayDoctors(currentPage);

        createPagination();

    }

    // ================= أول تحميل =================
    displayDoctors(currentPage);

    createPagination();

    // ================= البحث =================
    searchInput.addEventListener("input", filterDoctors);

    citySelect.addEventListener("change", filterDoctors);

    specialtySelect.addEventListener("change", filterDoctors);

    filterBtn.addEventListener("click", filterDoctors);

})
.catch(error => {

    console.log(error);

});


// ================= فتح صفحة الدكتور =================
function openDoctorProfile(id) {

    localStorage.setItem("doctorId", id);

    window.location.href = "../../Doctors/html/doctor.Profile.html";

}


