# الموقع الرسمي للشيخ ياسر البصري
# Official Website of Sheikh Yassir al-Basri

A clean, respectful Islamic scholarly website featuring fatawa, videos, books, and public questions.

## 📁 Project Structure

```
sheikh-yassir-website/
├── index.html              # Home page
├── about.html              # About the Sheikh
├── fatawa.html             # Fatawa listing
├── fatawa-detail.html      # Individual fatwa template
├── books.html              # Books page
├── ask.html                # Ask a question form
├── css/
│   ├── style.css          # Main stylesheet
│   └── responsive.css     # Mobile responsive styles
├── js/
│   ├── main.js            # Main JavaScript
│   ├── youtube.js         # YouTube API integration
│   └── fatawa.js          # Fatawa functionality
├── data/
│   ├── fatawa.json        # Fatawa content
│   └── books.json         # Books data
├── images/
│   └── logo.png           # Sheikh's logo (place your logo here)
└── README.md
```

## 🚀 Quick Start

1. **Add Your Logo**
   - Place the Sheikh's logo as `images/logo.png`
   - Recommended size: 200x200px PNG with transparent background

2. **Configure YouTube Channel**
   - Open `js/youtube.js`
   - Replace `YOUR_YOUTUBE_CHANNEL_ID` with the actual channel ID
   - Replace `YOUR_YOUTUBE_API_KEY` with your YouTube Data API key
   - Get API key from: https://console.cloud.google.com/

3. **Configure Google Form**
   - Open `ask.html`
   - Replace the Google Form embed URL with your actual form URL

4. **Update Content**
   - Edit `data/fatawa.json` to add/update fatawa
   - Edit `data/books.json` to add/update books
   - Edit `about.html` to update the Sheikh's biography

## 📝 How to Add New Fatawa

Edit `data/fatawa.json`:

```json
{
  "id": "new-fatwa-slug",
  "title": "Fatwa Title",
  "titleAr": "عنوان الفتوى",
  "category": "Fiqh",
  "categoryAr": "فقه",
  "date": "2026-02-06",
  "excerpt": "Short description...",
  "excerptAr": "وصف قصير...",
  "content": "Full fatwa content...",
  "contentAr": "المحتوى الكامل..."
}
```

## 📚 How to Add Books

Edit `data/books.json`:

```json
{
  "id": "book-slug",
  "title": "Book Title",
  "titleAr": "عنوان الكتاب",
  "description": "Book description...",
  "descriptionAr": "وصف الكتاب...",
  "coverImage": "path/to/cover.jpg",
  "language": "Arabic",
  "downloadLink": "https://example.com/book.pdf"
}
```

## 🌐 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings: None needed (static HTML)
4. Deploy!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts

### Manual Deployment

Upload all files to any web hosting service. No build process required.

## 🎨 Design Customization

### Colors

Main colors are defined in `css/style.css`:

- Primary (Deep Green/Teal): `#1a5f5a`
- Gold/Beige: `#c9a961`
- Dark Background: `#1a1a1a`
- Light Background: `#f5f5f5`

### Fonts

Arabic: Amiri (Google Fonts)
English: Lora (Google Fonts)

To change fonts, update the Google Fonts import in each HTML file.

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Tested on iOS and Android

## 📧 Support

For questions about updating content or deployment, refer to this README or contact your web developer.

## 📄 License

© الموقع الرسمي للشيخ ياسر البصري
All rights reserved.
