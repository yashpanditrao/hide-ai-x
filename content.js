// Global variables for settings
let extensionEnabled = true;
let emDashEnabled = true;
let customBlockers = [];

// Load settings from storage
function loadSettings() {
    chrome.storage.sync.get(['extensionEnabled', 'emDashEnabled', 'blockers'], function(result) {
        extensionEnabled = result.extensionEnabled !== false; // default to true
        emDashEnabled = result.emDashEnabled !== false; // default to true
        customBlockers = result.blockers || [];
    });
}

// Listen for changes to settings
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === 'sync') {
        if (changes.extensionEnabled) {
            extensionEnabled = changes.extensionEnabled.newValue !== false;
        }
        if (changes.emDashEnabled) {
            emDashEnabled = changes.emDashEnabled.newValue !== false;
        }
        if (changes.blockers) {
            customBlockers = changes.blockers.newValue || [];
        }
    }
});

// Function to check if an element contains an em dash
function containsEmDash(element) {
    return element.textContent.includes('—');
}

// Function to check if an element contains any custom blockers
function containsCustomBlocker(element) {
    const text = element.textContent.toLowerCase();
    return customBlockers.some(blocker => text.includes(blocker.toLowerCase()));
}

// Function to hide posts with em dashes or custom blockers
function hidePosts() {
    // Check if extension is enabled
    if (!extensionEnabled) {
        // Remove hide classes if extension is disabled
        const hiddenPosts = document.querySelectorAll('.hide-em-dash-post');
        hiddenPosts.forEach(post => {
            post.classList.remove('hide-em-dash-post');
        });
        return;
    }
    
    // Find all tweet/post articles
    const posts = document.querySelectorAll('article[role="article"]');
    
    posts.forEach(post => {
        // Find the tweet text element within the post
        const tweetText = post.querySelector('[data-testid="tweetText"]');
        
        if (tweetText) {
            let shouldHide = false;
            let reason = '';
            
            // Check for em dash if enabled
            if (emDashEnabled && containsEmDash(tweetText)) {
                shouldHide = true;
                reason = 'Contains em dash';
            }
            
            // Check for custom blockers if not already flagged
            if (!shouldHide && customBlockers.length > 0 && containsCustomBlocker(tweetText)) {
                shouldHide = true;
                reason = 'Contains custom blocker';
            }
            
            if (shouldHide) {
                // Get the username
                const userNameElement = post.querySelector('[data-testid="User-Name"] span');
                const userName = userNameElement ? userNameElement.textContent : 'Unknown User';
                
                // Get the tweet text
                const tweetContent = tweetText.textContent;
                
                // Get the post URL
                const postLink = post.querySelector('a[href*="/status/"]');
                const postUrl = postLink ? window.location.origin + postLink.getAttribute('href') : 'URL not found';
                
                // Log the information
                console.log('Hidden post:', {
                    user: userName,
                    content: tweetContent,
                    url: postUrl,
                    reason: reason
                });
                
                post.classList.add('hide-em-dash-post');
            } else {
                // Remove hide class if conditions no longer apply
                post.classList.remove('hide-em-dash-post');
            }
        }
    });
}

// Run initially and load settings
loadSettings();
setTimeout(hidePosts, 1000); // Delay to allow settings to load

// Create a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            hidePosts();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});
