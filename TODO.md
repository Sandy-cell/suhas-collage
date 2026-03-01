# TODO - CSS & JS Management Task - COMPLETED

## Phase 1: Move inline CSS from index.html to assets/css/index.css
- [x] 1.1 Move navbar Bootstrap dropdown disable styles
- [x] 1.2 Move Swiper container styles
- [x] 1.3 Move mobile menu styles
- [x] 1.4 Move skip-link styles

## Phase 2: Move inline JS from index.html to assets/js/index.js
- [x] 2.1 Move AOS initialization
- [x] 2.2 Move Swiper initialization
- [x] 2.3 Move DOMContentLoaded initializations

## Phase 3: Update about/about-college.html
- [x] 3.1 Move inline AOS init script to assets/js/about.js

## Phase 4: Update staff/staff.html
- [x] 4.1 Added event listeners in assets/js/staff.js for tab switching

## Summary of Changes Made:

### Files Modified:
1. **assets/css/index.css** - Added inline CSS from index.html (navbar fixes, swiper, mobile menu, skip-link)
2. **assets/js/index.js** - Added AOS and Swiper initialization code
3. **assets/js/about.js** - Added AOS initialization for about page
4. **assets/js/staff.js** - Added event listeners for tab switching
5. **index.html** - Removed inline CSS and JS (replaced with external file references)
6. **about/about-college.html** - Removed inline AOS initialization script

### CSS Files Organization:
- assets/css/common.css - Common styles across all pages
- assets/css/index.css - Home page specific styles + inline styles moved from index.html
- assets/css/about.css - About page styles
- assets/css/staff.css - Staff page styles
- assets/css/department.css - Department pages styles

### JS Files Organization:
- assets/js/common.js - Common functions (navbar, language toggle, modal)
- assets/js/index.js - Home page initialization (AOS, Swiper)
- assets/js/about.js - About page initialization (AOS)
- assets/js/staff.js - Staff page functions (tab switching, search)

### Remaining Notes:
- The department/first-year/first-year.html uses Bootstrap navbar which is different from main site
- Other HTML files were already properly structured with external CSS/JS links
