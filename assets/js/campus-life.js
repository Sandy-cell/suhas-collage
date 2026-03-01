// ================= LANGUAGE TOGGLE FUNCTIONALITY =================
// Get language preference from localStorage
function getLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
}

// Apply language to all elements with data-en and data-mr attributes
function applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-mr]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    localStorage.setItem('selectedLanguage', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = getLanguage();
    applyLanguage(savedLang);
    
    // Language toggle event listener
    const langCheckbox = document.getElementById('langCheckbox');
    if (langCheckbox) {
        langCheckbox.addEventListener('change', function() {
            const newLang = this.checked ? 'mr' : 'en';
            applyLanguage(newLang);
        });
    }

    // Activity tabs (Student Activities page)
    const tabButtons = document.querySelectorAll('.activity-tab-btn');
    const activitySections = document.querySelectorAll('.activity-section');

    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            if (!targetId) return;

            tabButtons.forEach(function(item) { item.classList.remove('active'); });
            this.classList.add('active');

            activitySections.forEach(function(section) { section.classList.remove('active'); });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Image lightbox
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeButton = document.getElementById('lightboxCloseBtn');
    const zoomableImages = document.querySelectorAll('.zoomable-image');

    function closeLightbox() {
        if (!lightbox || !lightboxImage) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.setAttribute('src', '');
    }

    function openLightboxFromImage(img) {
        if (!lightbox || !lightboxImage || !img) return;
        lightboxImage.setAttribute('src', img.getAttribute('src') || '');
        lightboxImage.setAttribute('alt', img.getAttribute('alt') || 'Expanded Image');
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    zoomableImages.forEach(function(img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            openLightboxFromImage(this);
        });
    });

    // Fallback: clicking anywhere on gallery card opens the image.
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const image = this.querySelector('img.zoomable-image');
            openLightboxFromImage(image);
        });
    });

    if (closeButton) {
        closeButton.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// Console message
console.log('Campus Life Page Loaded Successfully!');
