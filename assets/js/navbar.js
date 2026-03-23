/**
 * =====================================================
 * SUHAS INSTITUTE OF TECHNOLOGY - NAVBAR JS
 * Consolidated and Optimized
 * =====================================================
 */

(function() {
    'use strict';

    // ================= CONFIGURATION =================
    const CONFIG = {
        breakpoint: 992,
        dropdownDelay: 150,
        mobileMenuDelay: 100
    };

    // ================= DOM ELEMENTS =================
    const elements = {
        hamburger: null,
        navMenu: null,
        navOverlay: null,
        dropdownParents: null,
        languageToggle: null,
        langTextEn: null,
        langTextMr: null
    };

    // ================= STATE =================
    let state = {
        isMobileMenuOpen: false,
        currentLanguage: 'en'
    };

    // ================= INITIALIZATION =================
    /**
     * Initialize navbar on DOM ready
     */
    function init() {
        cacheElements();
        initLanguage();
        initMobileMenu();
        initDropdowns();
        initActiveLink();
        fixBootstrapConflict();
        syncMenuButtonState(false);
        
        console.log('Navbar initialized successfully');
    }

    /**
     * Cache DOM elements for performance
     */
    function cacheElements() {
        elements.hamburger = document.getElementById('hamburger');
        elements.navMenu = document.getElementById('navMenu');
        // Try to get navOverlay by ID first, then by class
        elements.navOverlay = document.getElementById('navOverlay') || document.querySelector('.nav-overlay');
        elements.dropdownParents = document.querySelectorAll('.has-dropdown');
        elements.languageToggle = document.getElementById('languageToggle');
        elements.langTextEn = document.getElementById('langTextEn');
        elements.langTextMr = document.getElementById('langTextMr');
    }

    // ================= MOBILE MENU =================
    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        if (!elements.hamburger || !elements.navMenu) return;

        // Toggle mobile menu
        elements.hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close menu when clicking overlay
        if (elements.navOverlay) {
            elements.navOverlay.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (state.isMobileMenuOpen && 
                !elements.navMenu.contains(e.target) && 
                !elements.hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > CONFIG.breakpoint) {
                closeMobileMenu();
            }
        }, 150));

        // Close menu on link click (for single page navigation)
        const navLinks = elements.navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Check if this is a dropdown toggle (check for class and data-dropdown attribute)
                const isDropdownToggle = this.classList.contains('dropdown-toggle') || this.hasAttribute('data-dropdown');
                
                // In mobile view, don't close menu for dropdown toggles - let dropdown handler work
                if (window.innerWidth <= CONFIG.breakpoint && isDropdownToggle) {
                    return; // Let dropdown toggle handle it
                }
                
                // Close menu on actual navigation links
                if (window.innerWidth <= CONFIG.breakpoint) {
                    closeMobileMenu();
                }
            });
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && state.isMobileMenuOpen) {
                closeMobileMenu();
                elements.hamburger.focus();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        if (state.isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        state.isMobileMenuOpen = true;
        elements.hamburger.classList.add('active');
        elements.navMenu.classList.add('active');
        document.body.classList.add('nav-open');
        syncMenuButtonState(true);
        
        if (elements.navOverlay) {
            elements.navOverlay.classList.add('active');
        }

        // Trap focus inside menu
        trapFocus(elements.navMenu);
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        state.isMobileMenuOpen = false;
        elements.hamburger.classList.remove('active');
        elements.navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        syncMenuButtonState(false);
        
        if (elements.navOverlay) {
            elements.navOverlay.classList.remove('active');
        }

        // Reset all dropdowns
        elements.dropdownParents.forEach(function(parent) {
            parent.classList.remove('active');
        });

        // Release focus
        releaseFocus();
    }

    // ================= DROPDOWNS =================
    /**
     * Initialize dropdown functionality
     */
    function initDropdowns() {
        if (!elements.dropdownParents) return;

        elements.dropdownParents.forEach(function(parent) {
            const toggleLink = parent.querySelector('.dropdown-toggle');
            
            if (toggleLink) {
                // Mobile: Click to toggle
                toggleLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= CONFIG.breakpoint) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        elements.dropdownParents.forEach(function(otherParent) {
                            if (otherParent !== parent) {
                                otherParent.classList.remove('active');
                            }
                        });
                        
                        parent.classList.toggle('active');
                    }
                });
            }
        });

        // Reset mobile dropdown state on resize to desktop
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth > CONFIG.breakpoint) {
                elements.dropdownParents.forEach(function(parent) {
                    parent.classList.remove('active');
                });
            }
        }, 150));
    }

    // ================= LANGUAGE =================
    /**
     * Initialize language toggle
     */
    function initLanguage() {
        // Get saved language
        state.currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
        applyLanguage(state.currentLanguage);

        if (elements.languageToggle) {
            elements.languageToggle.addEventListener('change', function() {
                const newLang = this.checked ? 'mr' : 'en';
                applyLanguage(newLang);
            });
        }
    }

    /**
     * Apply language to elements
     * @param {string} lang - Language code ('en' or 'mr')
     */
    function applyLanguage(lang) {
        state.currentLanguage = lang;
        localStorage.setItem('selectedLanguage', lang);

        // Update all elements with data-en and data-mr
        const elementsToTranslate = document.querySelectorAll('[data-en][data-mr]');
        elementsToTranslate.forEach(function(el) {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                // Handle specific elements differently
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update toggle UI
        updateLanguageToggle(lang);
    }

    /**
     * Update language toggle UI
     * @param {string} lang - Current language
     */
    function updateLanguageToggle(lang) {
        if (elements.languageToggle) {
            elements.languageToggle.checked = (lang === 'mr');
        }

        if (elements.langTextEn && elements.langTextMr) {
            if (lang === 'mr') {
                elements.langTextEn.classList.add('inactive');
                elements.langTextMr.classList.remove('inactive');
            } else {
                elements.langTextEn.classList.remove('inactive');
                elements.langTextMr.classList.add('inactive');
            }
        }
    }

    // ================= ACTIVE LINK =================
    /**
     * Initialize active link highlighting
     */
    function initActiveLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = href.split('/').pop();
                
                if (linkPage === currentPage || 
                    (currentPage === '' && linkPage === 'index.html')) {
                    link.classList.add('active');
                }
            }
        });

        // Add click handler
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }

    // ================= BOOTSTRAP FIX =================
    /**
     * Fix Bootstrap conflict with custom navbar
     */
    function fixBootstrapConflict() {
        // Remove data-bs-toggle from navbar dropdowns
        const navDropdowns = document.querySelectorAll('.navbar-main .dropdown-toggle');
        navDropdowns.forEach(function(el) {
            el.removeAttribute('data-bs-toggle');
            el.removeAttribute('data-bs-target');
            el.removeAttribute('data-bs-auto-close');
        });

        // Destroy any Bootstrap dropdown instances
        if (typeof bootstrap !== 'undefined' && bootstrap.Dropdown) {
            navDropdowns.forEach(function(el) {
                const instance = bootstrap.Dropdown.getInstance(el);
                if (instance) {
                    instance.dispose();
                }
            });
        }
    }

    // ================= ACCESSIBILITY =================
    /**
     * Trap focus inside element (for mobile menu)
     */
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Focus first element
        if (firstFocusable) {
            setTimeout(function() {
                firstFocusable.focus();
            }, 100);
        }
    }

    /**
     * Release focus trap
     */
    function releaseFocus() {
        // Focus back to hamburger
        if (elements.hamburger) {
            elements.hamburger.focus();
        }
    }

    // ================= UTILITIES =================
    /**
     * Debounce function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Sync menu button accessibility state
     * @param {boolean} isOpen
     */
    function syncMenuButtonState(isOpen) {
        if (!elements.hamburger) return;
        elements.hamburger.setAttribute('aria-expanded', String(isOpen));
        elements.hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    // ================= PUBLIC API =================
    // Expose functions for external use if needed
    window.Navbar = {
        openMobileMenu: openMobileMenu,
        closeMobileMenu: closeMobileMenu,
        toggleMobileMenu: toggleMobileMenu,
        applyLanguage: applyLanguage,
        getLanguage: function() { return state.currentLanguage; }
    };

    // ================= DOM READY =================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
