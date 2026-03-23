/**
 * ==========================================================================
 * DEPARTMENT PAGES JAVASCRIPT - UNIFIED
 * Suhas Institute of Technology
 * ==========================================================================
 * Features:
 * - Counter Animation
 * - Scroll Animations
 * - Card Interactions
 * - Smooth Scroll
 * ==========================================================================
 */

(function() {
    'use strict';

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        
        if (!match) return;

        const finalNumber = parseInt(match[0]);
        const suffix = text.replace(/(\d+)/, '').trim();
        
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = finalNumber / steps;
        const stepTime = duration / steps;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= finalNumber) {
                current = finalNumber;
                element.textContent = current + suffix;
                clearInterval(timer);
                return;
            }
            
            element.textContent = Math.floor(current) + suffix;
        }, stepTime);
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.about-item, .vm-box, .lab-card, .tools-card, .stat-card, ' +
            '.activity-item, .compliance-item, .admission-card, .faculty-card, .place-item'
        );
        
        if (animatedElements.length === 0) return;

        // Set initial state
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.dataset.animationDelay = index * 80;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.animationDelay) || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // CARD HOVER EFFECTS
    // ========================================
    function initCardEffects() {
        const cards = document.querySelectorAll(
            '.lab-card, .tools-card, .admission-card, .faculty-card, ' +
            '.vm-box, .activity-item, .compliance-item, .place-item, .stat-card'
        );

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ========================================
    // PARALLAX EFFECT
    // ========================================
    function initParallax() {
        const hero = document.querySelector('.dept-hero');
        if (!hero) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    if (scrolled < 500) {
                        hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // LANGUAGE SUPPORT (from common.js)
    // ========================================
    function initLanguage() {
        // Language is handled by common.js
        // This ensures department pages work with the global language system
    }

    // ========================================
    // INITIALIZE ALL
    // ========================================
    document.addEventListener('DOMContentLoaded', function() {
        initCounters();
        initScrollAnimations();
        initCardEffects();
        initSmoothScroll();
        initParallax();
        initLanguage();
        
        console.log('Department Page Loaded Successfully!');
    });

})();
