/**
 * Benefits section interactions and scroll reveal.
 */
(function() {
    'use strict';

    function initBenefitCards() {
        const cards = document.querySelectorAll('.benefit-card');
        if (!cards.length) return;

        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                cards.forEach(function(item) {
                    item.classList.remove('active');
                });
                card.classList.add('active');
                card.focus();
            });

            card.addEventListener('mouseenter', function() {
                card.classList.add('icon-animate');
            });

            card.addEventListener('mouseleave', function() {
                card.classList.remove('icon-animate');
            });

            card.addEventListener('focusin', function() {
                card.classList.add('icon-animate');
            });

            card.addEventListener('focusout', function() {
                card.classList.remove('icon-animate');
            });
        });
    }

    function initBenefitsReveal() {
        const cards = document.querySelectorAll('.benefit-card');
        if (!cards.length) return;

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
                const idx = Number(card.dataset.benefitIndex || 0);
                card.style.transitionDelay = (idx * 70) + 'ms';
                card.classList.add('is-visible');
                io.unobserve(card);
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -8% 0px'
        });

        cards.forEach(function(card, idx) {
            card.dataset.benefitIndex = String(idx);
            observer.observe(card);
        });
    }

    function init() {
        initBenefitCards();
        initBenefitsReveal();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
