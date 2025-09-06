// Function to check if an element contains an em dash
function containsEmDash(element) {
    return element.textContent.includes('—');
}

// Function to hide posts with em dashes
function hideEmDashPosts() {
    // Find all tweet/post articles
    const posts = document.querySelectorAll('article[role="article"]');
    
    posts.forEach(post => {
        // Find the tweet text element within the post
        const tweetText = post.querySelector('[data-testid="tweetText"]');
        
        if (tweetText && containsEmDash(tweetText)) {
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
                reason: 'Contains em dash'
            });
            
            post.classList.add('hide-em-dash-post');
        }
    });
}

// Run initially
hideEmDashPosts();

// Create a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            hideEmDashPosts();
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
    childList: true,
    subtree: true
});
