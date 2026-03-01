// ================= FOOTER LOADING VIA FETCH =================
/**
 * Load footer.html dynamically into the page
 * This allows centralized footer management across all pages
 */
async function loadFooter() {
    const currentPath = window.location.pathname;
    const depth = currentPath.split('/').filter(segment => segment !== '' && !segment.endsWith('.html')).length;
    const footerPath = depth > 0 ? '../footer.html' : 'footer.html';
    
    const footerContainer = document.getElementById('footer-container');
    
    if (!footerContainer) {
        return;
    }
    
    try {
        const response = await fetch(footerPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const footerHTML = await response.text();
        footerContainer.innerHTML = footerHTML;
        fixFooterImagePaths(depth);
        initFooterModal();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

/**
 * Initialize modal functionality for the loaded footer
 */
function initFooterModal() {
    const burseBtn = document.getElementById('burseProfileBtn');
    const burseModal = document.getElementById('burseProfileModal');
    const modalContent = burseModal ? burseModal.querySelector('.modal-content') : null;
    
    if (burseBtn && burseModal && modalContent) {
        burseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            burseModal.style.display = 'flex';
        });
        
        const closeBtn = burseModal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                burseModal.style.display = 'none';
            });
        }
        
        burseModal.addEventListener('click', function(e) {
            if (e.target === burseModal) {
                burseModal.style.display = 'none';
            }
        });
    }
}

/**
 * Fix image paths in footer based on current page location
 */
function fixFooterImagePaths(depth) {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    const profileImage = footerContainer.querySelector('.burse-profile-photo img');
    
    if (profileImage && depth > 0) {
        const currentSrc = profileImage.getAttribute('src');
        if (currentSrc && !currentSrc.startsWith('../')) {
            profileImage.setAttribute('src', '../' + currentSrc);
        }
    }
}

// ================= GLOBAL LANGUAGE SYNC =================

/**
 * Apply saved language across all pages using data-en/data-mr attributes.
 * This keeps page language consistent when navigating from index to inner pages.
 */
function applyStoredLanguage() {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    const elementsToTranslate = document.querySelectorAll('[data-en][data-mr]');

    elementsToTranslate.forEach(function(el) {
        const text = el.getAttribute('data-' + lang);
        if (!text) return;

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });

    // Keep language toggle UI in sync on pages where toggle exists.
    const languageToggle = document.getElementById('languageToggle');
    const langTextEn = document.getElementById('langTextEn');
    const langTextMr = document.getElementById('langTextMr');

    if (languageToggle) {
        languageToggle.checked = (lang === 'mr');
    }

    if (langTextEn && langTextMr) {
        if (lang === 'mr') {
            langTextEn.classList.add('inactive');
            langTextMr.classList.remove('inactive');
        } else {
            langTextEn.classList.remove('inactive');
            langTextMr.classList.add('inactive');
        }
    }
}

// ================= PRINCIPAL MODAL =================

/**
 * Open principal message modal
 */
function openModal() {
    const modal = document.getElementById('principalModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

/**
 * Close principal message modal
 */
function closeModal() {
    const modal = document.getElementById('principalModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('principalModal');
    if (event.target === modal) {
        closeModal();
    }
});

// ================= BACK TO TOP BUTTON =================

/**
 * Create back to top button
 */
function createBackToTopButton() {
    if (document.getElementById('backToTop')) return;
    
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '&#8593;';
    button.title = 'Back to Top';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================= SMOOTH SCROLL =================

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ================= IMAGE SLIDER =================

/**
 * Initialize image slider - FALLBACK (if Swiper not used)
 */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        setInterval(nextSlide, 3000);
    }
}

// ================= INITIALIZE ALL =================

document.addEventListener('DOMContentLoaded', function() {
    applyStoredLanguage();
    createBackToTopButton();
    initSmoothScroll();
    initSlider();
    loadFooter();
    
    console.log('Suhas Institute Website Loaded Successfully!');
});
