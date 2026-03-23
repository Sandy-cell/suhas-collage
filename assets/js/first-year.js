/**
 * First Year Department Page JavaScript
 * Same as Computer Department - World Class PhD-Level
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        console.log('First Year Department Page Loaded Successfully!');
        
        // Initialize animations
        initScrollAnimations();
        initCounterAnimations();
    });

    /* ================ SCROLL ANIMATIONS ================ */
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.about-item, .vm-box, .subject-card, .stat-card, .faculty-card');
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = (index * 0.1) + 's';
            observer.observe(el);
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    /* ================ COUNTER ANIMATIONS ================ */
    function initCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const finalNumber = parseInt(match[0]);
                        animateCounter(target, finalNumber);
                    }
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(num => observer.observe(num));
    }

    function animateCounter(element, finalNumber) {
        let current = 0;
        const increment = finalNumber / 50;
        const stepTime = 30;
        
        const animate = () => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                element.textContent = current + '+';
                return;
            }
            element.textContent = Math.floor(current) + '+';
            setTimeout(animate, stepTime);
        };
        animate();
    }

})();
