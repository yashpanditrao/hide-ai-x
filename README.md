# Hide AI Generated Posts on X

A simple browser extension that helps you hide potentially AI-generated posts on X (formerly Twitter) by detecting posts containing em dashes (—).

## Features

- Automatically detects and hides posts containing em dashes
- Works on both twitter.com and x.com domains
- Real-time detection of new posts as you scroll
- Console logging of hidden posts with user information and post URLs

## Installation

1. Clone this repository or download the files
2. Open your browser's extension management page
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Firefox: `about:addons`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## How it Works

The extension scans posts on X/Twitter for em dashes (—), which are commonly used in AI-generated content. When a post containing an em dash is found, it's automatically hidden from view. The extension logs details about hidden posts to the browser console for reference.

## Files

- `manifest.json`: Extension configuration and permissions
- `content.js`: Main logic for detecting and hiding posts
- `styles.css`: Styling for hidden posts
- `icon.png`: Extension icon

## License

This project is open source and available for use and modification.
