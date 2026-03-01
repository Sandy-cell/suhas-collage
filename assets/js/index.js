// Burse profile modal logic
document.addEventListener('DOMContentLoaded', function() {
    const burseBtn = document.getElementById('burseProfileBtn');
    const burseModal = document.getElementById('burseProfileModal');
    if (burseBtn && burseModal) {
        burseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            burseModal.style.display = 'block';
        });
    }
});

/**
 * Index Page JavaScript
 * For Suhas Institute of Technology
 */

// AOS and Swiper Initialization
document.addEventListener('DOMContentLoaded', function() {
    // AOS - Optimized initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            offset: 100, 
            once: true, 
            easing: 'ease-out-cubic',
            disable: function() {
                return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }
        });
    }
    
    // Swiper - Optimized initialization
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            autoplay: { delay: 4000, disableOnInteraction: false },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            loop: true,
            speed: 800,
            preloadImages: true,
            lazy: true
        });
    }
    
    // GSAP (optional - kept for future use if needed)
    if (typeof gsap !== 'undefined') {
        gsap.config({ nullTargetWarn: false });
    }
    
    console.log('Index page loaded');
});
