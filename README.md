# Hide AI Generated Posts on X

A browser extension that helps you hide potentially AI-generated posts on X (formerly Twitter) by detecting posts containing em dashes (—) and custom keywords.

## Features

- Automatically detects and hides posts containing em dashes
- Custom keyword blocking - add your own words/phrases to filter
- Works on both twitter.com and x.com domains
- Real-time detection of new posts as you scroll
- Console logging of hidden posts with user information and post URLs
- Options page for managing custom blockers and settings
- Browser action popup for quick enable/disable toggle

## Installation

1. Clone this repository using `git clone https://github.com/yashpanditrao/hide-ai-x/`
2. Open your browser's extension management page
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Firefox: `about:addons`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## How it Works

The extension scans posts on X/Twitter for em dashes (—), which are commonly used in AI-generated content. It also allows you to define custom keywords and phrases to filter. When a post matching any of these criteria is found, it's automatically hidden from view. The extension logs details about hidden posts to the browser console for reference.

## Files

- `manifest.json`: Extension configuration and permissions
- `content.js`: Main logic for detecting and hiding posts
- `styles.css`: Styling for hidden posts
- `options.html/options.js`: Settings page for managing custom blockers
- `popup.html/popup.js`: Browser action popup for quick toggle
- `icon.png`: Extension icon

## Customization

1. Click the extension icon in your browser toolbar to open the popup
2. Toggle the extension on/off or open the full settings page
3. In the settings page, you can:
   - Add custom keywords/phrases to block
   - Remove existing blockers
   - Enable/disable em dash detection
   - Enable/disable the entire extension

## License

This project is open source and available for use and modification.
