/**
 * Notice section enhancements.
 */
(function() {
    'use strict';

    function initNoticeCards() {
        const noticeCards = document.querySelectorAll('.notice-card');
        if (!noticeCards.length) return;

        noticeCards.forEach(function(card) {
            card.addEventListener('focus', function() {
                card.classList.add('active');
            });
            card.addEventListener('blur', function() {
                card.classList.remove('active');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNoticeCards);
    } else {
        initNoticeCards();
    }
})();
