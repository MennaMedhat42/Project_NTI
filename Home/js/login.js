
document.addEventListener("DOMContentLoaded", () => {

    // ================= العناصر =================
    const registerCard = document.getElementById("register-card");
    const loginCard = document.getElementById("login-card");

    const goToLogin = document.getElementById("go-to-login");
    const goToRegister = document.getElementById("go-to-register");

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // عناصر الإدخال
    const nameInput = document.getElementById("reg-name");
    const emailInput = document.getElementById("reg-email");
    const phoneInput = document.getElementById("reg-phone");
    const passwordInput = document.getElementById("reg-password");
    const confirmInput = document.getElementById("reg-confirm");

    // ================= الانتقال بين التسجيل والدخول =================

    goToLogin.addEventListener("click", function (e) {
        e.preventDefault();
        registerCard.classList.add("hidden");
        loginCard.classList.remove("hidden");
    });

    goToRegister.addEventListener("click", function (e) {
        e.preventDefault();
        loginCard.classList.add("hidden");
        registerCard.classList.remove("hidden");
    });

    // ================= Validation =================

    function validateName() {
        const error = document.getElementById("name-error");

        if (nameInput.value.trim().length < 15) {
            error.textContent = "الاسم بالكامل يجب ألا يقل عن 15 حرف.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateEmail() {
    const error = document.getElementById("email-error");
    
    // Regex بسيط ومبسط ومجرب لتسهيل التحقق من الإيميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
        error.textContent = "يرجى إدخال بريد إلكتروني صحيح.";
        return false;
    }

    error.textContent = "";
    return true;
}

    function validatePhone() {

        const error = document.getElementById("phone-error");

        const phoneRegex = /^01[0125][0-9]{8}$/;

        if (!phoneRegex.test(phoneInput.value.trim())) {
            error.textContent = "رقم الهاتف غير صحيح.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validatePassword() {

        const error = document.getElementById("password-error");

        if (passwordInput.value.length < 8) {
            error.textContent = "كلمة المرور يجب ألا تقل عن 8 أحرف.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validateConfirmPassword() {

        const error = document.getElementById("confirm-error");

        if (passwordInput.value !== confirmInput.value) {
            error.textContent = "كلمتا المرور غير متطابقتين.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    passwordInput.addEventListener("input", validatePassword);
    confirmInput.addEventListener("input", validateConfirmPassword);  
      // ================= إنشاء حساب جديد =================

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const nameValid = validateName();
        const emailValid = validateEmail();
        const phoneValid = validatePhone();
        const passwordValid = validatePassword();
        const confirmValid = validateConfirmPassword();


        if (
            !nameValid ||
            !emailValid ||
            !phoneValid ||
            !passwordValid ||
            !confirmValid
        ) {
            return;
        }


        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value;


        const city = document.querySelector("select").value;

        const userType = document.querySelector(
            'input[name="user-type"]:checked'
        ).value;


        // قراءة المستخدمين الموجودين
        let users = JSON.parse(localStorage.getItem("users")) || [];


        // التأكد أن الإيميل غير موجود
        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            alert("هذا البريد الإلكتروني مسجل بالفعل.");

            return;
        }



        // بيانات المستخدم
        const newUser = {

            name: fullName,

            email: email,

            phone: phone,

            city: city,

            password: password,

            role: userType,

            birthDate: "",

            gender: "",

            address: "",

            image: ""

        };



        // إضافة المستخدم للقائمة
        users.push(newUser);



        // حفظ كل المستخدمين
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );



        // حفظ المستخدم الحالي
        localStorage.setItem(
            "currentUser",
            JSON.stringify(newUser)
        );



        // مهم جدا عشان صفحة profile تشتغل زي الأول
        localStorage.setItem(
            "profile",
            JSON.stringify(newUser)
        );


        // حفظ الاسم لو صفحات تانية تستخدمه
        localStorage.setItem(
            "username",
            newUser.name
        );


        localStorage.setItem(
            "isLoggedIn",
            "true"
        );



        alert("تم إنشاء الحساب بنجاح.");



        if (userType === "doctor") {

            window.location.href =
            "../../Doctors/html/dashboard.html";

        } else {

            window.location.href =
            "../../Patient/html/index.html";

        }


    });   
     // ================= تسجيل الدخول =================

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();


        const loginEmail = document
            .getElementById("login-email")
            .value
            .trim();


        const loginPassword = document
            .getElementById("login-password")
            .value;



        // جلب المستخدمين المحفوظين
        let users = JSON.parse(
            localStorage.getItem("users")
        ) || [];



        // البحث عن المستخدم
        const user = users.find(
            u =>
            u.email === loginEmail &&
            u.password === loginPassword
        );



        if (!user) {

            alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");

            return;
        }



        // حفظ بيانات المستخدم الحالي

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        // مهم لصفحة profile
        localStorage.setItem(
            "profile",
            JSON.stringify(user)
        );


        localStorage.setItem(
            "username",
            user.name
        );


        localStorage.setItem(
            "isLoggedIn",
            "true"
        );



        alert("تم تسجيل الدخول بنجاح.");



        // التوجيه حسب نوع الحساب

        if (user.role === "doctor") {

            window.location.href =
            "../../Doctors/html/dashboard.html";

        } else {

            window.location.href =
            "../../Patient/html/index.html";

        }


    });


});