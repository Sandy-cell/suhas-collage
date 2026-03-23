/**
 * Developer profile modal
 */
(function() {
    'use strict';

    const NAME_PATTERN = /(Mr\.?\s*Sandesh\s*B\.?\s*Burse|Sandesh\s*B\.?\s*Burse)/i;
    let modalOverlay = null;

    function resolveAssetPath(pathFromRoot) {
        const currentPath = window.location.pathname;
        const depth = currentPath
            .split('/')
            .filter(function(segment) {
                return segment !== '' && !segment.endsWith('.html');
            }).length;
        return (depth > 0 ? '../'.repeat(depth) : '') + pathFromRoot;
    }

    function ensureModal() {
        if (modalOverlay) return;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'dev-modal-overlay';
        modalOverlay.id = 'developerModal';
        modalOverlay.setAttribute('aria-hidden', 'true');

        modalOverlay.innerHTML = [
            '<div class="dev-modal-card" role="dialog" aria-modal="true" aria-labelledby="devModalTitle">',
            '  <button type="button" class="dev-modal-close" data-dev-modal-close aria-label="Close developer profile">&times;</button>',
            '  <div class="dev-modal-avatar">',
            '    <img alt="Developer Profile" loading="lazy">',
            '  </div>',
            '  <h3 class="dev-modal-name" id="devModalTitle">Mr. Sandesh B Burse</h3>',
            '  <p class="dev-modal-designation">Faculty, Computer Department</p>',
            '  <p class="dev-modal-role">Website Designer &amp; Developer</p>',
            '  <div class="dev-modal-phone"><i class="fas fa-phone-alt" aria-hidden="true"></i><span>+91 96372 78867</span></div>',
            '  <div class="dev-modal-actions">',
            '    <a class="dev-call-btn" href="tel:+919637278867" aria-label="Call Mr. Sandesh B Burse">',
            '      <i class="fas fa-phone-volume" aria-hidden="true"></i>',
            '      <span>Call Now</span>',
            '    </a>',
            '  </div>',
            '</div>'
        ].join('');

        const avatar = modalOverlay.querySelector('.dev-modal-avatar img');
        avatar.src = resolveAssetPath('image/mr-sandesh-b-burse.png');

        document.body.appendChild(modalOverlay);
    }

    function openModal() {
        ensureModal();
        modalOverlay.classList.remove('is-closing');
        modalOverlay.classList.add('is-open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('dev-modal-open');
    }

    function closeModal() {
        if (!modalOverlay || !modalOverlay.classList.contains('is-open')) return;

        modalOverlay.classList.add('is-closing');
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        window.setTimeout(function() {
            if (modalOverlay) {
                modalOverlay.classList.remove('is-closing');
            }
        }, 240);
        document.body.classList.remove('dev-modal-open');
    }

    function createNameButton(text) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'developer-trigger';
        button.textContent = text;
        return button;
    }

    function enhanceNameInElement(container) {
        if (!container || container.querySelector('.developer-trigger')) return;

        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        let textNode = walker.nextNode();

        while (textNode) {
            const match = textNode.nodeValue && textNode.nodeValue.match(NAME_PATTERN);
            if (match) {
                const fullText = textNode.nodeValue;
                const nameText = match[0];
                const startIndex = match.index || 0;
                const before = fullText.slice(0, startIndex);
                const after = fullText.slice(startIndex + nameText.length);

                const frag = document.createDocumentFragment();
                if (before) frag.appendChild(document.createTextNode(before));
                frag.appendChild(createNameButton(nameText));
                if (after) frag.appendChild(document.createTextNode(after));

                textNode.parentNode.replaceChild(frag, textNode);
                return;
            }
            textNode = walker.nextNode();
        }
    }

    function initTriggers() {
        document.querySelectorAll('#burseProfileBtn').forEach(function(btn) {
            btn.classList.add('developer-trigger');
            btn.removeAttribute('id');
        });

        document.querySelectorAll('.dev-popup, footer p').forEach(function(el) {
            if (NAME_PATTERN.test(el.textContent || '')) {
                enhanceNameInElement(el);
            }
        });
    }

    function initEvents() {
        document.addEventListener('click', function(e) {
            const trigger = e.target.closest('.developer-trigger');
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof e.stopImmediatePropagation === 'function') {
                    e.stopImmediatePropagation();
                }
                openModal();
                return;
            }

            if (e.target.closest('[data-dev-modal-close]')) {
                closeModal();
                return;
            }

            if (modalOverlay && e.target === modalOverlay) {
                closeModal();
            }
        }, true);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function init() {
        initTriggers();
        initEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
