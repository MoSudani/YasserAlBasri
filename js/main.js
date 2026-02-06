/**
 * Main JavaScript for Sheikh Yassir al-Basri Website
 * Handles navigation, mobile menu, and common functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize scroll effects (optional smooth reveal animations)
 */
function initializeScrollEffects() {
    // Add smooth scroll behavior for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Format date to Arabic locale
 */
function formatDateArabic(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format date to English locale
 */
function formatDateEnglish(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Truncate text to a specific length
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Show loading spinner
 */
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading">جاري التحميل...</div>';
    }
}

/**
 * Show error message
 */
function showError(element, message) {
    if (element) {
        element.innerHTML = `<p class="error-message">${message}</p>`;
    }
}

/**
 * Show no results message
 */
function showNoResults(element, message) {
    if (element) {
        element.innerHTML = `<p class="no-results">${message || 'لا توجد نتائج'}</p>`;
    }
}

/**
 * Debounce function for search inputs
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Simple client-side search function
 */
function searchInText(searchTerm, text) {
    if (!searchTerm || !text) return false;
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const normalizedText = text.toLowerCase();
    
    return normalizedText.includes(normalizedSearch);
}

// Export functions for use in other scripts
window.MainJS = {
    formatDateArabic,
    formatDateEnglish,
    truncateText,
    showLoading,
    showError,
    showNoResults,
    debounce,
    searchInText
};
