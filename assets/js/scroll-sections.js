/**
 * Smooth infinite vertical auto-scroll for facilities and notice containers.
 */
(function() {
    'use strict';

    function setupReveal() {
        const containers = document.querySelectorAll('.scroll-container');
        if (!containers.length) return;

        containers.forEach(function(container) {
            container.classList.add('scroll-animate');
        });

        if (!('IntersectionObserver' in window)) {
            containers.forEach(function(container) {
                container.classList.add('is-visible');
            });
            return;
        }

        const revealObserver = new IntersectionObserver(function(entries, io) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                const container = entry.target;
                const idx = Number(container.dataset.scrollIndex || 0);
                container.style.transitionDelay = (idx * 80) + 'ms';
                container.classList.add('is-visible');
                io.unobserve(container);
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -8% 0px'
        });

        containers.forEach(function(container, idx) {
            container.dataset.scrollIndex = String(idx);
            revealObserver.observe(container);
        });
    }

    function setupAutoScroll(viewport) {
        const track = viewport.querySelector('.scroll-track');
        if (!track) return;

        const sourceItems = Array.from(track.children);
        if (sourceItems.length < 2) return;

        sourceItems.forEach(function(item) {
            track.appendChild(item.cloneNode(true));
        });

        let paused = false;
        let offset = 0;
        let frameId = null;
        const speed = Number(viewport.dataset.scrollSpeed || 0.22);
        const resetAt = track.scrollHeight / 2;

        function tick() {
            if (!paused) {
                offset += speed;
                if (offset >= resetAt) {
                    offset = 0;
                }
                track.style.transform = 'translate3d(0, -' + offset + 'px, 0)';
            }
            frameId = window.requestAnimationFrame(tick);
        }

        function pause() {
            paused = true;
        }

        function resume() {
            paused = false;
        }

        viewport.addEventListener('mouseenter', pause);
        viewport.addEventListener('mouseleave', resume);
        viewport.addEventListener('focusin', pause);
        viewport.addEventListener('focusout', resume);
        viewport.addEventListener('touchstart', pause, { passive: true });
        viewport.addEventListener('touchend', resume, { passive: true });
        viewport.addEventListener('touchcancel', resume, { passive: true });

        frameId = window.requestAnimationFrame(tick);

        window.addEventListener('beforeunload', function() {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
        });
    }

    function init() {
        setupReveal();
        document.querySelectorAll('.scroll-viewport').forEach(setupAutoScroll);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
