/**
 * YouTube API Integration for Sheikh Yassir al-Basri Website
 * Fetches latest videos from the Sheikh's YouTube channel
 */

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================

const YOUTUBE_CONFIG = {
    // Replace with your YouTube Channel ID
    // To find it: Go to your channel -> About -> Share Channel -> Copy Channel ID
    channelId: 'YOUR_YOUTUBE_CHANNEL_ID',
    
    // Replace with your YouTube Data API Key
    // Get it from: https://console.cloud.google.com/
    apiKey: 'YOUR_YOUTUBE_API_KEY',
    
    // Number of videos to fetch
    maxResults: 6,
    
    // Channel URL (update with actual channel URL)
    channelUrl: 'https://www.youtube.com/@YasserAlbasri'
};

/**
 * Initialize YouTube links on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Update all YouTube channel links
    const youtubeLinks = [
        document.getElementById('youtubeChannelLink'),
        document.getElementById('footerYoutubeLink'),
        document.getElementById('sidebarYoutubeLink')
    ];

    youtubeLinks.forEach(link => {
        if (link) {
            link.href = YOUTUBE_CONFIG.channelUrl;
        }
    });

    // Load videos if we're on the home page
    if (document.getElementById('latestVideos')) {
        loadLatestVideos();
    }
});

/**
 * Fetch latest videos from YouTube channel
 */
async function loadLatestVideos() {
    const container = document.getElementById('latestVideos');
    
    if (!container) return;

    // Show loading state
    container.innerHTML = '<div class="loading">جاري تحميل المحاضرات...</div>';

    // Check if API key and channel ID are configured
    if (YOUTUBE_CONFIG.apiKey === 'YOUR_YOUTUBE_API_KEY' || 
        YOUTUBE_CONFIG.channelId === 'YOUR_YOUTUBE_CHANNEL_ID') {
        // Show placeholder videos instead of error
        displayPlaceholderVideos(container);
        return;
    }

    try {
        // Construct API URL
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?` +
            `key=${YOUTUBE_CONFIG.apiKey}` +
            `&channelId=${YOUTUBE_CONFIG.channelId}` +
            `&part=snippet,id` +
            `&order=date` +
            `&maxResults=${YOUTUBE_CONFIG.maxResults}` +
            `&type=video`;

        // Fetch data from YouTube API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if we have videos
        if (!data.items || data.items.length === 0) {
            container.innerHTML = '<p class="no-results">لا توجد محاضرات متاحة حالياً</p>';
            return;
        }

        // Display videos
        displayVideos(data.items, container);

    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>حدث خطأ في تحميل المحاضرات</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">
                    ${error.message}
                </p>
            </div>
        `;
    }
}

/**
 * Display videos in the container
 */
function displayVideos(videos, container) {
    const videosHTML = videos.map(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;
        const publishedAt = video.snippet.publishedAt;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        return `
            <a href="${videoUrl}" target="_blank" class="video-card" rel="noopener noreferrer">
                <div class="video-thumbnail">
                    <img src="${thumbnail}" alt="${escapeHtml(title)}" loading="lazy">
                </div>
                <div class="video-info">
                    <h3 class="video-title">${escapeHtml(title)}</h3>
                    <p class="video-date">${formatVideoDate(publishedAt)}</p>
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = videosHTML;
}

/**
 * Format video publish date
 */
function formatVideoDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If less than 7 days ago, show relative time
    if (diffDays === 0) {
        return 'اليوم';
    } else if (diffDays === 1) {
        return 'أمس';
    } else if (diffDays < 7) {
        return `منذ ${diffDays} أيام`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? 'منذ أسبوع' : `منذ ${weeks} أسابيع`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return months === 1 ? 'منذ شهر' : `منذ ${months} أشهر`;
    } else {
        // Show full date
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Alternative: Display placeholder videos for testing
 * Useful during development before API is configured
 */
function displayPlaceholderVideos(container) {
    console.log('Displaying placeholder videos...');
    
    // Real video from Sheikh's channel
    const placeholderVideos = [
        {
            videoId: 'F4DQDMRYknc',
            title: 'Latest Video from Sheikh Yasser al-Basri',
            date: 'منذ يومين',
            thumbnail: 'https://img.youtube.com/vi/F4DQDMRYknc/hqdefault.jpg'
        }
    ];

    const videosHTML = placeholderVideos.map(video => `
        <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank" class="video-card" rel="noopener noreferrer">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${escapeHtml(video.title)}" loading="lazy" onerror="this.onerror=null; this.src='https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg';">
            </div>
            <div class="video-info">
                <h3 class="video-title">${escapeHtml(video.title)}</h3>
                <p class="video-date">${video.date}</p>
            </div>
        </a>
    `).join('');

    console.log('Setting HTML:', videosHTML);
    container.innerHTML = videosHTML;
}

// Export functions for external use
window.YouTubeAPI = {
    loadLatestVideos,
    displayPlaceholderVideos
};
