# Deployment Guide
# الموقع الرسمي للشيخ ياسر البصري

This guide will help you deploy the website to production.

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

Netlify is free and perfect for static websites.

#### Steps:

1. **Create a Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or email

2. **Push Code to Git Repository**
   ```bash
   # Initialize git (if not already done)
   git init
   git add .
   git commit -m "Initial commit - Sheikh Yassir website"
   
   # Create repository on GitHub and push
   git remote add origin https://github.com/yourusername/sheikh-yassir-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Netlify**
   - Log in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider (GitHub)
   - Select the repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/` (root)
   - Click "Deploy site"

4. **Configure Custom Domain (Optional)**
   - In Netlify dashboard: Site settings → Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

---

### Option 2: Vercel

Vercel is another excellent free hosting option.

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd sheikh-yassir-website
   vercel
   ```
   - Follow the prompts
   - Confirm deployment settings

3. **Custom Domain**
   - Go to Vercel dashboard
   - Select your project → Settings → Domains
   - Add your custom domain

---

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/sheikh-yassir-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Folder: Select "/ (root)"
   - Save

3. **Access Site**
   - Your site will be live at: `https://yourusername.github.io/sheikh-yassir-website/`

---

### Option 4: Traditional Web Hosting

If you have traditional shared hosting (cPanel, etc.):

#### Steps:

1. **Upload Files**
   - Use FTP client (FileZilla, etc.)
   - Upload all files to `public_html` or `www` directory

2. **Verify**
   - Visit your domain to confirm deployment

---

## ⚙️ Post-Deployment Configuration

### 1. Configure YouTube API

Edit `js/youtube.js`:

```javascript
const YOUTUBE_CONFIG = {
    channelId: 'YOUR_ACTUAL_CHANNEL_ID',
    apiKey: 'YOUR_ACTUAL_API_KEY',
    channelUrl: 'https://www.youtube.com/channel/YOUR_CHANNEL_ID'
};
```

**Getting YouTube API Key:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials (API Key)
5. Copy the API key

**Finding Channel ID:**
1. Go to your YouTube channel
2. Click "About" tab
3. Click "Share channel"
4. Copy the channel ID from the URL

### 2. Configure Google Form

Edit `ask.html`:

1. Create a Google Form at [forms.google.com](https://forms.google.com)
2. Click "Send" → Embed icon (`<>`)
3. Copy the iframe URL
4. Replace the URL in `ask.html`:

```html
<iframe 
    src="YOUR_GOOGLE_FORM_EMBED_URL" 
    width="100%" 
    height="800">
</iframe>
```

### 3. Add Your Logo

1. Place your logo file in `images/logo.png`
2. Recommended size: 200x200px PNG with transparent background
3. Ensure the logo matches the branding (gold/beige calligraphy, deep green patterns)

### 4. Update Content

**Add/Update Fatawa:**
- Edit `data/fatawa.json`
- Add new entries following the existing format

**Add/Update Books:**
- Edit `data/books.json`
- Add book cover images to `images/books/`

**Update About Page:**
- Edit `about.html`
- Update biography and information sections

---

## 🔒 Security & Performance

### Security Headers (Netlify)

Create `netlify.toml` in root directory:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Performance Optimization

1. **Image Optimization**
   - Compress all images before uploading
   - Use tools like TinyPNG or Squoosh
   - Recommended: WebP format for better compression

2. **Caching**
   - Most hosting providers handle this automatically
   - For custom servers, set appropriate cache headers

---

## 📧 Contact Form Setup (Alternative to Google Forms)

If you prefer email submissions instead of Google Forms:

### Using Formspree (Free)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Get your form endpoint
4. Update `ask.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="text" name="name" placeholder="الاسم">
    <input type="email" name="email" placeholder="البريد الإلكتروني">
    <textarea name="question" placeholder="السؤال"></textarea>
    <button type="submit">إرسال</button>
</form>
```

---

## 🌐 SEO Optimization

### Add Meta Tags

Already included in all pages, but verify:
- Page titles are descriptive
- Meta descriptions are present
- Open Graph tags (optional, for social sharing)

### Create Sitemap

Create `sitemap.xml` in root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/about.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/fatawa.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/books.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/ask.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### Submit to Search Engines

- Google Search Console: [search.google.com/search-console](https://search.google.com/search-console)
- Bing Webmaster Tools: [bing.com/webmasters](https://www.bing.com/webmasters)

---

## 🆘 Troubleshooting

### Images Not Loading
- Check file paths are correct
- Ensure images exist in `images/` directory
- Verify file permissions

### YouTube Videos Not Showing
- Verify API key is valid
- Check channel ID is correct
- Ensure API is enabled in Google Cloud Console
- Check browser console for error messages

### Google Form Not Embedding
- Verify iframe URL is correct
- Check if form is set to "Accept responses"
- Try alternative form solutions if needed

### Mobile Menu Not Working
- Clear browser cache
- Check JavaScript files are loaded
- Verify `js/main.js` is included

---

## 📱 Testing Checklist

Before going live, test:

- ✅ All pages load correctly
- ✅ Navigation works on desktop and mobile
- ✅ Mobile menu toggles properly
- ✅ YouTube videos display (if configured)
- ✅ Fatawa load and display correctly
- ✅ Books page shows all books
- ✅ Google Form works (if configured)
- ✅ All links work correctly
- ✅ Logo displays properly
- ✅ Footer links work
- ✅ Responsive design on various screen sizes
- ✅ Test on different browsers (Chrome, Firefox, Safari, Edge)

---

## 📞 Support

For technical issues:
- Check README.md for common solutions
- Review code comments in files
- Test in browser developer console (F12)

---

## 🎉 Congratulations!

Your website is now live! 

**Next Steps:**
1. Share the website URL
2. Monitor analytics (Google Analytics, etc.)
3. Regularly update fatawa and content
4. Backup your data regularly

May Allah bless this project and make it beneficial for all Muslims.

بارك الله فيكم
