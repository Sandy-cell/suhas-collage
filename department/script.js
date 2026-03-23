/**
 * =========================================
 * DEPARTMENT PAGES - UNIFIED JAVASCRIPT
 * Suhas Institute of Technology
 * =========================================
 */

(function() {
    'use strict';

    // ================= LANGUAGE SYSTEM =================
    function getLanguage() {
        return localStorage.getItem('selectedLanguage') || 'en';
    }

    function applyLanguage(lang) {
        var elements = document.querySelectorAll('[data-en][data-mr]');
        
        elements.forEach(function(el) {
            var text = el.getAttribute('data-' + lang);
            if (text) {
                el.textContent = text;
            }
        });
        
        localStorage.setItem('selectedLanguage', lang);
    }

    function initLanguage() {
        var savedLang = getLanguage();
        applyLanguage(savedLang);
    }

    // ================= COUNTER ANIMATION =================
    function initCounters() {
        var counters = document.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        var text = element.textContent;
        var match = text.match(/(\d+)/);
        
        if (!match) return;

        var finalNumber = parseInt(match[0]);
        var suffix = text.replace(/(\d+)/, '').trim();
        
        var current = 0;
        var duration = 2000;
        var steps = 60;
        var increment = finalNumber / steps;
        var stepTime = duration / steps;
        
        var timer = setInterval(function() {
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

    // ================= SMOOTH SCROLL =================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ================= IMAGE ERROR HANDLING =================
    function initImageHandling() {
        var images = document.querySelectorAll('img');
        images.forEach(function(img) {
            img.addEventListener('error', function() {
                if (this.dataset.errorSrc) {
                    this.src = this.dataset.errorSrc;
                }
            });
        });
    }

    // ================= SCROLL REVEAL =================
    function initScrollReveal() {
        var selectors = [
            '.about-item',
            '.lab-card',
            '.tools-card',
            '.stat-card',
            '.activity-item',
            '.compliance-item',
            '.faculty-card',
            '.place-item',
            '.info-card',
            '.hod-photo',
            '.hod-content'
        ];

        var items = document.querySelectorAll(selectors.join(','));
        if (items.length === 0) return;

        items.forEach(function(el, index) {
            el.classList.add('reveal-up');
            el.style.setProperty('--reveal-delay', ((index % 6) * 70) + 'ms');
        });

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        items.forEach(function(el) { observer.observe(el); });
    }

    // ================= INITIALIZE ALL =================
    document.addEventListener('DOMContentLoaded', function() {
        initLanguage();
        initCounters();
        initSmoothScroll();
        initImageHandling();
        initScrollReveal();
        
        console.log('Department Page Loaded Successfully!');
    });

})();
