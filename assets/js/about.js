/**
 * About Page JavaScript
 * For Suhas Institute of Technology
 * Note: Common functions (language toggle, modal) are in common.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // AOS Animation initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }
    
    console.log('About page loaded');
});
