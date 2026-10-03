// ===============================
// 📱 قائمة الهاتف
// ===============================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ===============================
// 🌙 تبديل الوضع الداكن والمضيء
// ===============================
const toggle = document.getElementById('theme-toggle');
const body = document.body;

// عند تحميل الصفحة، استرجع الوضع المحفوظ
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggle.textContent = '☀️';
}

// عند الضغط على الزر
toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  toggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===============================
// ✨ أنيميشن الظهور عند التمرير (مكتبة AOS)
// ===============================
// نضيف وسوم الحركة من هنا فقط إذا تحمّلت المكتبة فعلاً،
// فإذا فشل تحميلها يبقى المحتوى ظاهراً ولا يختفي أي شيء.
if (typeof AOS !== 'undefined') {
  // [العنصر، التأخير الأساسي بالملي ثانية، التأخير الإضافي لكل عنصر بعده]
  const animated = [
    ['#profile .section__pic-container', 0, 0],
    ['#profile .section__text', 150, 0],
    ['#about .title, #experience .title, #projects .title, #contact .title', 0, 0],
    ['#about .section__pic-container', 0, 0],
    ['.about-details-container', 150, 0],
    ['#experience .details-container', 0, 150],
    ['#projects .details-container', 0, 150],
    ['.contact-info-upper-container', 0, 0],
  ];

  animated.forEach(([selector, delay, step]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-aos', 'fade-up');
      const total = delay + i * step;
      if (total) el.setAttribute('data-aos-delay', total);
    });
  });

  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    // إيقاف الحركة لمن فعّل "تقليل الحركة" في جهازه
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
}

// ===============================
// ✍️ تأثير الكتابة على المسمى الوظيفي (مكتبة Typed.js)
// ===============================
// إذا لم تتحمّل المكتبة، أو كان "تقليل الحركة" مفعّلاً، يبقى النص الأصلي "AI Engineer" كما هو.
const roleEl = document.querySelector('.section__text__p2');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof Typed !== 'undefined' && roleEl && !reduceMotion) {
  const roles = ['AI Engineer', 'Machine Learning Developer', 'Deep Learning Enthusiast'];
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a));

  // العنصر المخفي يحجز عرض أطول جملة حتى لا تتحرك الصورة والنصوص أثناء الكتابة
  roleEl.innerHTML =
    '<span class="role-sizer" aria-hidden="true">' + longest + '</span>' +
    '<span class="role-live"><span id="typed-role"></span></span>';

  new Typed('#typed-role', {
    strings: roles,
    typeSpeed: 60,
    backSpeed: 35,
    backDelay: 1600,
    loop: true,
  });
}