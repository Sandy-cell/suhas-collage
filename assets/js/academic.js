/**
 * Academic page enhancements
 * Language sync is handled globally in common.js
 */
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 90,
            disable: function() {
                return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            }
        });
    } else {
        document.body.classList.add('no-aos');
    }

    console.log('Academic page loaded');
});

