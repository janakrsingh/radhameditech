// ================= Mobile Menu =================
$(function () {
    $(".mobile_btn").on("click", function () {
        $(".main_menu").slideToggle();
        $(".mobile_btn i").toggleClass("fa-xmark fa-xl");
    });

    // Delegated click for dropdowns (handles window resize)
    $(".main_menu").on("click", ".has_dropdown > a", function (e) {
        if ($(window).width() < 768) {
            e.preventDefault();
            $(this).siblings(".sub_menu").stop().slideToggle();
            $(this).find(".fa-angle-right").toggleClass("fa-rotate-90");
        }
    });
});

// ================= Back to Top & WhatsApp Buttons =================
const btn = $('#button');
const whatsappbtn = $('#whatsapp');

$(window).scroll(function () {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 300) {
        btn.addClass('show');
        whatsappbtn.addClass('show');
    } else {
        btn.removeClass('show');
        whatsappbtn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
});

// ================= Fixed Header =================
$(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
        $(".g_header").addClass("g_shrink");
    } else {
        $(".g_header").removeClass("g_shrink");
    }
});

// ================= Offcanvas Header =================
function darken_screen(yesno){
    if(yesno) document.querySelector('.screen-darken').classList.add('active');
    else document.querySelector('.screen-darken').classList.remove('active');
}

function close_offcanvas(){
    darken_screen(false);
    document.querySelector('.mobile-offcanvas.show').classList.remove('show');
    document.body.classList.remove('offcanvas-active');
}

function show_offcanvas(offcanvas_id){
    darken_screen(true);
    document.getElementById(offcanvas_id).classList.add('show');
    document.body.classList.add('offcanvas-active');
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('[data-trigger]').forEach(function(el){
        let offcanvas_id = el.getAttribute('data-trigger');
        el.addEventListener('click', function (e) {
            e.preventDefault();
            show_offcanvas(offcanvas_id);
        });
    });

    document.querySelectorAll('.btn-close').forEach(function(btn){
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            close_offcanvas();
        });
    });

    document.querySelector('.screen-darken').addEventListener('click', close_offcanvas);
});

// ================= Banner Slider =================
var bannerSwiper = new Swiper(".banner-slider", {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    effect: "fade",
    fadeEffect: { crossFade: true },
    pagination: { 
        el: ".banner .swiper-pagination", 
        clickable: true,  
    },
    navigation: { 
        nextEl: ".banner .swiper-button-next", 
        prevEl: ".banner .swiper-button-prev" 
    },
});

// ================= Instruments Slider =================
var instrumentSwiper = new Swiper(".instruments-slider", {
    slidesPerView: 6,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: {
        el: ".instruments-slider .swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: ".instruments-slider .swiper-button-next",
        prevEl: ".instruments-slider .swiper-button-prev"
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 6 }
    }
});

// ================= Scroll Animations =================
const animatedElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate only once
        }
    });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));

// ================= Counter Animations =================
const counters = document.querySelectorAll('.count-digit, .count-digit1');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            if(!el.classList.contains('counter-loaded')){
                el.classList.add('counter-loaded');
                let end = parseInt(el.innerText, 10);
                let current = 0;
                let step = end / 100; // 100 steps
                const interval = setInterval(() => {
                    current += step;
                    if(current >= end){
                        el.innerText = end;
                        clearInterval(interval);
                    } else {
                        el.innerText = Math.ceil(current);
                    }
                }, 50);
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ================= Product Category Filter =================
// ================= Category Filter =================
const categoryLinks = document.querySelectorAll(".sidebar ul li a");
const productSections = document.querySelectorAll(".product-section");

categoryLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove active class from all links
    categoryLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const category = link.getAttribute("data-category");

    // Show matching section, hide others
    productSections.forEach(section => {
      if (category === "all" || section.getAttribute("data-category") === category) {
        section.style.display = "block";
        // Smooth scroll to section on mobile/tablet
        if (window.innerWidth <= 991) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        section.style.display = "none";
      }
    });
  });
});

// Show first category by default on page load
document.addEventListener('DOMContentLoaded', function() {
  if (categoryLinks.length > 0) {
    const activeLink = document.querySelector('.sidebar ul li a.active');
    if (activeLink) {
      const category = activeLink.getAttribute("data-category");
      productSections.forEach(section => {
        if (category === "all" || section.getAttribute("data-category") === category) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    }
  }
});


// ================= Sidebar Toggle for Mobile =================
window.toggleSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('collapsed');
  }
};

// Auto-collapse sidebar on mobile by default
if (window.innerWidth <= 991) {
  document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.add('collapsed');
    }
  });
}

// ================= Product Category Filter (Static Layout) =================
document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
  const dropdownLinks = document.querySelectorAll(".dropdown-menu .dropdown-item");
  const productSections = document.querySelectorAll(".product-section");

  function showCategory(category) {
    productSections.forEach(section => {
      if (section.getAttribute("data-category") === category) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  // Sidebar links
  sidebarLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      sidebarLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");
      showCategory(category);

      if (window.innerWidth <= 991) {
        document.querySelector('.products').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Dropdown links (hash based)
  dropdownLinks.forEach(link => {
    link.addEventListener("click", function () {
      const hash = this.getAttribute("href").split("#")[1];
      if (!hash) return;

      // Sidebar me bhi active set ho jaye
      sidebarLinks.forEach(l => {
        l.classList.toggle("active", l.getAttribute("data-category") === hash);
      });

      showCategory(hash);
    });
  });

  // Page load with hash (products.html#phaco-consumables)
  const currentHash = window.location.hash.replace("#", "");
  if (currentHash) {
    showCategory(currentHash);

    sidebarLinks.forEach(l => {
      l.classList.toggle("active", l.getAttribute("data-category") === currentHash);
    });
  } else {
    const defaultActive = document.querySelector('.sidebar ul li a.active');
    if (defaultActive) {
      showCategory(defaultActive.getAttribute("data-category"));
    }
  }
});

// ================= Product Category Filter =================
// productSlider
var swiper = new Swiper(".productSlider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }
  });
