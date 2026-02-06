# YouTube API Setup Instructions

## Do You Need to Configure YouTube API?

**Short answer: Only if you want to show real YouTube videos on your website.**

Currently, the website shows **placeholder videos** (example lectures with generic thumbnails). This is fine for testing and development.

## Option 1: Keep Placeholder Videos (Easiest)

If you're happy with placeholder videos for now, you don't need to do anything! The website will display 3 example lecture cards.

## Option 2: Show Real YouTube Videos (Requires API Setup)

To display actual videos from your YouTube channel:

### Step 1: Get Your YouTube Channel ID

1. Go to your YouTube channel
2. Click on your profile/channel
3. Look at the URL - it will be something like:
   - `youtube.com/channel/UC1234567890abcdefghijk`
   - The part after `/channel/` is your Channel ID
   - Copy this ID

### Step 2: Get YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable "YouTube Data API v3":
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

### Step 3: Update Your Website

Open `C:\sheikh-yassir-website\js\youtube.js` and find this section:

```javascript
const YOUTUBE_CONFIG = {
    channelId: 'YOUR_YOUTUBE_CHANNEL_ID',
    apiKey: 'YOUR_YOUTUBE_API_KEY',
    maxResults: 6,
    channelUrl: 'https://www.youtube.com/channel/YOUR_CHANNEL_ID'
};
```

Replace:
- `YOUR_YOUTUBE_CHANNEL_ID` with your actual channel ID
- `YOUR_YOUTUBE_API_KEY` with your API key
- Update the `channelUrl` with your full channel URL

### Step 4: Test

Refresh your website. You should now see real videos from your YouTube channel!

## Troubleshooting

**Videos not loading?**
- Check browser console (F12) for error messages
- Verify API key is correct
- Make sure YouTube Data API v3 is enabled
- Check if you have videos published on your channel

**API Quota Limits:**
- Free tier: 10,000 units per day
- Each page load uses about 100 units
- This is usually plenty for a personal website

## Need Help?

If you run into issues, you can:
1. Check the browser console for detailed error messages (press F12)
2. Verify your API key and channel ID are correct
3. Make sure your YouTube channel is public
