/**
 * Facilities reveal animation.
 */
(function() {
    'use strict';

    function revealFacilities() {
        const cards = document.querySelectorAll('.facility-card');
        if (!cards.length) return;

        cards.forEach(function(card) {
            card.classList.add('facility-animate');
        });

        if (!('IntersectionObserver' in window)) {
            cards.forEach(function(card) {
                card.classList.add('is-visible');
            });
            return;
        }

        const observer = new IntersectionObserver(function(entries, io) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                const card = entry.target;
                const idx = Number(card.dataset.facilityIndex || 0);
                card.style.transitionDelay = (idx * 50) + 'ms';
                card.classList.add('is-visible');
                io.unobserve(card);
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -6% 0px'
        });

        cards.forEach(function(card, idx) {
            card.dataset.facilityIndex = String(idx);
            observer.observe(card);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', revealFacilities);
    } else {
        revealFacilities();
    }
})();
