// مصفوفة البيانات (JSON الخاص بآراء المرضى)
const reviewsData = [
  {
    "id": 1,
    "patientName": "أحمد علي",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.50 AM.jpeg",
    "rating": 4,
    "comment": "الخدمة كويسة بس وقت الانتظار كان طويل شوية.",
    "date": "2026-07-06"
  },
  {
    "id": 2,
    "patientName": "عمر حسان",
    "image": "../images/images (1).jfif",
    "rating": 5,
    "comment": "تجربة ممتازة، تنظيم المواعيد كان دقيق جداً.",
    "date": "2026-07-07"
  },
  {
    "id": 3,
    "patientName": "نور هاشم",
    "image": "../images/download (3).jfif",
    "rating": 5,
    "comment": "شكر خاص للطاقم الطبي، تعاملهم راقي ومحترف.",
    "date": "2026-07-07"
  },
  {
    "id": 4,
    "patientName": "مريم أحمد",
    "image": "../images/images.jfif",
    "rating": 5,
    "comment": "دكتورة ممتازة وشاطرة جداً في التشخيص.",
    "date": "2026-07-05"
  },
  {
    "id": 5,
    "patientName": "سارة محمد",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.51 AM (6).jpeg",
    "rating": 5,
    "comment": "تعامل راقي جداً ونظافة العيادة ممتازة.",
    "date": "2026-07-07"
  },
  {
    "id": 6,
    "patientName": "ليلى حسن",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.51 AM (7).jpeg",
    "rating": 5,
    "comment": "أفضل تجربة كشف، الدكتورة مهتمة جداً بالتفاصيل.",
    "date": "2026-07-08"
  },
  {
    "id": 7,
    "patientName": "خالد محمود",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.51 AM (1).jpeg",
    "rating": 3,
    "comment": "العيادة كويسة بس الأسعار مرتفعة قليلاً.",
    "date": "2026-07-07"
  },
  {
    "id": 8,
    "patientName": "يوسف إبراهيم",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.51 AM.jpeg",
    "rating": 4,
    "comment": "تشخيص دقيق، لكن مكان العيادة يحتاج لوحة إرشادية أوضح.",
    "date": "2026-07-08"
  },
  {
    "id": 9,
    "patientName": "هالة كمال",
    "image": "/images/WhatsApp Image 2026-07-08 at 4.04.51 AM (4).jpeg",
    "rating": 5,
    "comment": "شكراً جزيلاً على المتابعة الدورية بعد الكشف.",
    "date": "2026-07-08"
  }
];

// المتغيرات للتحكم بعدد العناصر المعروضة
let currentShown = 3;
const container = document.getElementById('reviews-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// دالة توليد النجوم بناءً على الرقم (مثلاً 4 نجوم ملونة ونجمة رمادية فارغة)
function generateStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fa-solid fa-star"></i>';
        } else {
            starsHTML += '<i class="fa-solid fa-star unstarred"></i>';
        }
    }
    return starsHTML;
}

// دالة عرض المراجعات في الصفحة
function renderReviews() {
    container.innerHTML = '';
    
    // جلب الجزء المطلوب عرضه فقط من المصفوفة الأساسية
    const itemsToRender = reviewsData.slice(0, currentShown);
    
    itemsToRender.forEach(review => {
        const reviewItemHTML = `
            <div class="review-item">
                <div class="review-meta">${review.date}</div>
                <div class="review-content-box">
                    <div class="review-header">
                        <div class="patient-info">
                            <img src="${review.image}" class="patient-avatar" onerror="this.src='https://via.placeholder.com/40'">
                            <span class="patient-name">${review.patientName}</span>
                        </div>
                        <div class="patient-rating">
                            ${generateStarsHTML(review.rating)}
                        </div>
                    </div>
                    <p class="review-text">${review.comment}</p>
                </div>
            </div>
        `;
        container.innerHTML += reviewItemHTML;
    });

    // إخفاء الزر إذا تم عرض جميع التقييمات المخزنة بالكامل
    if (currentShown >= reviewsData.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// الاستماع لحدث الضغط على زر "عرض المزيد"
loadMoreBtn.addEventListener('click', () => {
    // تحديث عدد العناصر ليعرض كافة التقييمات المتبقية دفعة واحدة
    currentShown = reviewsData.length;
    renderReviews();
});

// العرض الأولي عند فتح الصفحة لأول مرة (3 عناصر فقط)
document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
});