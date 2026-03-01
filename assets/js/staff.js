/**
 * Staff Page JavaScript
 * Suhas Institute of Technology
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality using data-dept attribute
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const deptId = this.getAttribute('data-dept');
            if (!deptId) return;
            
            // Hide all departments
            const departments = document.querySelectorAll('.dept');
            departments.forEach(dept => {
                dept.classList.remove('active');
            });
            
            // Show selected department
            const selectedDept = document.getElementById(deptId);
            if (selectedDept) {
                selectedDept.classList.add('active');
            }
            
            // Update tab buttons
            const allTabBtns = document.querySelectorAll('.tab-btn');
            allTabBtns.forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            // Scroll to top of section
            const staffSection = document.querySelector('.staff-section');
            if (staffSection) {
                staffSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const staffCards = document.querySelectorAll('.staff-card');
            
            staffCards.forEach(card => {
                const name = card.querySelector('h3');
                if (name) {
                    const nameText = name.textContent.toLowerCase();
                    if (nameText.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
    
    console.log('Staff Page Loaded Successfully!');
});
