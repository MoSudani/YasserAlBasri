/**
 * Fatawa Management for Sheikh Yassir al-Basri Website
 * Handles loading, filtering, and displaying fatawa
 */

/**
 * Load latest fatawa for home page
 */
async function loadLatestFatawa() {
    const container = document.getElementById('latestFatawa');
    
    if (!container) return;

    try {
        const response = await fetch('data/fatawa.json');
        const fatawa = await response.json();
        
        // Get latest 3 fatawa
        const latest = fatawa.slice(0, 3);
        
        displayFatawaGrid(latest, container);
    } catch (error) {
        console.error('Error loading fatawa:', error);
        container.innerHTML = '<p class="error-message">حدث خطأ في تحميل الفتاوى</p>';
    }
}

/**
 * Load all fatawa for fatawa page
 */
async function loadAllFatawa() {
    const container = document.getElementById('fatawaList');
    
    if (!container) return;

    try {
        const response = await fetch('data/fatawa.json');
        const allFatawa = await response.json();
        
        // Store original data for filtering
        window.allFatawaData = allFatawa;
        
        displayFatawaList(allFatawa, container);
        
        // Setup filters
        setupFatawaFilters();
    } catch (error) {
        console.error('Error loading fatawa:', error);
        container.innerHTML = '<p class="error-message">حدث خطأ في تحميل الفتاوى</p>';
    }
}

/**
 * Display fatawa in grid format (for home page)
 */
function displayFatawaGrid(fatawa, container) {
    if (fatawa.length === 0) {
        const noResultsText = window.Translation && window.Translation.isEnglish() 
            ? 'No fatwas available' 
            : 'لا توجد فتاوى متاحة';
        container.innerHTML = `<p class="no-results">${noResultsText}</p>`;
        return;
    }

    const isEnglish = window.Translation && window.Translation.isEnglish();
    const readMoreText = isEnglish ? 'Read More →' : 'اقرأ المزيد ←';

    const fatawaHTML = fatawa.map(fatwa => {
        const title = isEnglish ? (fatwa.title || fatwa.titleAr) : (fatwa.titleAr || fatwa.title);
        const category = isEnglish ? (fatwa.category || fatwa.categoryAr) : (fatwa.categoryAr || fatwa.category);
        const excerpt = isEnglish ? (fatwa.excerpt || fatwa.excerptAr) : (fatwa.excerptAr || fatwa.excerpt);
        
        return `
            <div class="fatwa-card">
                <div class="fatwa-meta">
                    <span class="fatwa-category">${category}</span>
                    <span class="fatwa-date">${formatFatwaDate(fatwa.date)}</span>
                </div>
                <h3 class="fatwa-title">${title}</h3>
                <p class="fatwa-excerpt">${truncateExcerpt(excerpt, 120)}</p>
                <a href="fatawa-detail.html?id=${fatwa.id}" class="fatwa-link">
                    ${readMoreText}
                </a>
            </div>
        `;
    }).join('');

    container.innerHTML = fatawaHTML;
}

/**
 * Display fatawa in list format (for fatawa page)
 */
function displayFatawaList(fatawa, container) {
    if (fatawa.length === 0) {
        const noResultsText = window.Translation && window.Translation.isEnglish() 
            ? 'No fatwas in this category' 
            : 'لا توجد فتاوى في هذا التصنيف';
        container.innerHTML = `<p class="no-results">${noResultsText}</p>`;
        return;
    }

    const isEnglish = window.Translation && window.Translation.isEnglish();
    const readMoreText = isEnglish ? 'Read More →' : 'اقرأ المزيد ←';

    const fatawaHTML = fatawa.map(fatwa => {
        const title = isEnglish ? (fatwa.title || fatwa.titleAr) : (fatwa.titleAr || fatwa.title);
        const category = isEnglish ? (fatwa.category || fatwa.categoryAr) : (fatwa.categoryAr || fatwa.category);
        const excerpt = isEnglish ? (fatwa.excerpt || fatwa.excerptAr) : (fatwa.excerptAr || fatwa.excerpt);
        const altTitle = isEnglish ? fatwa.titleAr : fatwa.title;
        
        return `
            <div class="fatwa-card">
                <div class="fatwa-meta">
                    <span class="fatwa-category">${category}</span>
                    <span class="fatwa-date">${formatFatwaDate(fatwa.date)}</span>
                </div>
                <h3 class="fatwa-title">${title}</h3>
                ${altTitle && altTitle !== title ? `<p class="book-title-en">${altTitle}</p>` : ''}
                <p class="fatwa-excerpt">${truncateExcerpt(excerpt, 200)}</p>
                <a href="fatawa-detail.html?id=${fatwa.id}" class="fatwa-link">
                    ${readMoreText}
                </a>
            </div>
        `;
    }).join('');

    container.innerHTML = fatawaHTML;
}

/**
 * Setup filters for fatawa page
 */
function setupFatawaFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const container = document.getElementById('fatawaList');

    if (!categoryFilter || !searchInput || !window.allFatawaData) return;

    // Category filter handler
    categoryFilter.addEventListener('change', filterFatawa);

    // Search input handler (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterFatawa, 300);
    });

    function filterFatawa() {
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        let filtered = window.allFatawaData;

        // Filter by category
        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(fatwa => {
                const category = (fatwa.category || '').toLowerCase();
                return category === selectedCategory.toLowerCase();
            });
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(fatwa => {
                const titleAr = (fatwa.titleAr || '').toLowerCase();
                const title = (fatwa.title || '').toLowerCase();
                const excerptAr = (fatwa.excerptAr || '').toLowerCase();
                const excerpt = (fatwa.excerpt || '').toLowerCase();
                const contentAr = (fatwa.contentAr || '').toLowerCase();
                const content = (fatwa.content || '').toLowerCase();

                return titleAr.includes(searchTerm) ||
                       title.includes(searchTerm) ||
                       excerptAr.includes(searchTerm) ||
                       excerpt.includes(searchTerm) ||
                       contentAr.includes(searchTerm) ||
                       content.includes(searchTerm);
            });
        }

        displayFatawaList(filtered, container);
    }
}

/**
 * Format fatwa date
 */
function formatFatwaDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Truncate excerpt to specified length
 */
function truncateExcerpt(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get category name in Arabic
 */
function getCategoryNameArabic(category) {
    const categoryMap = {
        'fiqh': 'فقه',
        'aqeedah': 'عقيدة',
        'hadith': 'حديث',
        'quran': 'قرآن',
        'seerah': 'سيرة',
        'other': 'أخرى'
    };

    return categoryMap[category.toLowerCase()] || category;
}

// Auto-load fatawa on home page
if (document.getElementById('latestFatawa')) {
    document.addEventListener('DOMContentLoaded', loadLatestFatawa);
}

// Export functions for external use
window.FatawaJS = {
    loadLatestFatawa,
    loadAllFatawa,
    displayFatawaGrid,
    displayFatawaList
};
