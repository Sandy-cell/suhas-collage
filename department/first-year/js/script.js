/**
 * First Year Department - Custom JavaScript
 * No jQuery required
 */

(function() {
    'use strict';

    // ================= LANGUAGE SYSTEM =================
    
    /**
     * Get current language from localStorage
     */
    function getLanguage() {
        return localStorage.getItem('selectedLanguage') || 'en';
    }

    /**
     * Apply language to all elements with data-en and data-mr attributes
     */
    function applyLanguage(lang) {
        var elements = document.querySelectorAll('[data-en][data-mr]');
        
        elements.forEach(function(element) {
            var text = element.getAttribute('data-' + lang);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Save to localStorage
        localStorage.setItem('selectedLanguage', lang);
    }

    /**
     * Initialize language system
     */
    function initLanguage() {
        var savedLang = getLanguage();
        applyLanguage(savedLang);
    }

    // ================= ANIMATIONS =================
    
    /**
     * Initialize scroll animations using Intersection Observer
     */
    function initAnimations() {
        var animatedElements = document.querySelectorAll('.animate__animated');
        
        if (animatedElements.length === 0) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var animation = entry.target.getAttribute('data-animate') || 'fadeInUp';
                    entry.target.classList.add('animate__' + animation);
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ================= SMOOTH SCROLL =================
    
    /**
     * Initialize smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ================= INITIALIZE ALL =================
    
    document.addEventListener('DOMContentLoaded', function() {
        initLanguage();
        initAnimations();
        initSmoothScroll();
        
        console.log('First Year Department Page Loaded Successfully!');
    });

})();
