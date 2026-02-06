/**
 * Language Translation System
 * Handles switching between Arabic and English across the entire website
 */

// Language configuration
const LANGUAGES = {
    ar: {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl',
        flag: '🇸🇦'
    },
    en: {
        code: 'en',
        name: 'English',
        dir: 'ltr',
        flag: '🇬🇧'
    }
};

// Get current language from localStorage or default to Arabic
function getCurrentLanguage() {
    return localStorage.getItem('siteLanguage') || 'ar';
}

// Set language preference
function setLanguage(langCode) {
    localStorage.setItem('siteLanguage', langCode);
}

// Initialize language system on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguageToggle();
    applyLanguage(getCurrentLanguage());
});

/**
 * Initialize language toggle button
 */
function initializeLanguageToggle() {
    const toggleBtn = document.getElementById('languageToggle');
    
    if (toggleBtn) {
        updateToggleButton(toggleBtn, getCurrentLanguage());
        
        toggleBtn.addEventListener('click', function() {
            const currentLang = getCurrentLanguage();
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
            applyLanguage(newLang);
            updateToggleButton(toggleBtn, newLang);
            
            // Reload dynamic content
            reloadDynamicContent(newLang);
        });
    }
}

/**
 * Update toggle button text
 */
function updateToggleButton(button, currentLang) {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    button.innerHTML = `
        <span class="lang-icon">${LANGUAGES[nextLang].flag}</span>
        <span class="lang-name">${LANGUAGES[nextLang].name}</span>
    `;
    button.setAttribute('aria-label', `Switch to ${LANGUAGES[nextLang].name}`);
}

/**
 * Apply language to the entire page
 */
function applyLanguage(langCode) {
    const html = document.documentElement;
    const body = document.body;
    
    // Update HTML attributes
    html.setAttribute('lang', langCode);
    html.setAttribute('dir', LANGUAGES[langCode].dir);
    
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n-ar], [data-i18n-en]');
    
    elements.forEach(element => {
        const key = langCode === 'ar' ? 'data-i18n-ar' : 'data-i18n-en';
        const translation = element.getAttribute(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update page title
    const titleElement = document.querySelector('[data-i18n-title-ar], [data-i18n-title-en]');
    if (titleElement) {
        const titleKey = langCode === 'ar' ? 'data-i18n-title-ar' : 'data-i18n-title-en';
        const title = titleElement.getAttribute(titleKey);
        if (title) document.title = title;
    }
}

/**
 * Reload dynamic content (fatawa, books, videos)
 */
function reloadDynamicContent(langCode) {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Reload fatawa if on home or fatawa page
    if ((currentPage === 'index.html' || currentPage === '') && window.FatawaJS) {
        window.FatawaJS.loadLatestFatawa();
    } else if (currentPage === 'fatawa.html' && window.FatawaJS) {
        window.FatawaJS.loadAllFatawa();
    }
    
    // Reload books if on books page
    if (currentPage === 'books.html') {
        location.reload();
    }
    
    // Reload videos if on home page
    if ((currentPage === 'index.html' || currentPage === '') && window.YouTubeAPI) {
        window.YouTubeAPI.loadLatestVideos();
    }
}

/**
 * Get translation for dynamic content
 */
function getTranslation(item, field) {
    const langCode = getCurrentLanguage();
    
    // Try language-specific field first
    const langField = field + (langCode === 'ar' ? 'Ar' : '');
    if (item[langField]) return item[langField];
    
    // Fall back to base field
    if (item[field]) return item[field];
    
    // Fall back to opposite language
    const oppositeField = field + (langCode === 'en' ? 'Ar' : '');
    if (item[oppositeField]) return item[oppositeField];
    
    return '';
}

/**
 * Get current language for display
 */
function isArabic() {
    return getCurrentLanguage() === 'ar';
}

function isEnglish() {
    return getCurrentLanguage() === 'en';
}

// Export functions
window.Translation = {
    getCurrentLanguage,
    setLanguage,
    applyLanguage,
    getTranslation,
    isArabic,
    isEnglish,
    LANGUAGES
};
