// Popup script

// Load saved settings
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['extensionEnabled'], function(result) {
    const extensionEnabled = result.extensionEnabled !== false; // default to true
    document.getElementById('extension-toggle').checked = extensionEnabled;
    updateStatusText(extensionEnabled);
  });
  
  // Add event listener to the toggle
  document.getElementById('extension-toggle').addEventListener('change', function() {
    const enabled = this.checked;
    chrome.storage.sync.set({extensionEnabled: enabled}, function() {
      updateStatusText(enabled);
    });
  });
  
  // Add event listener to the options button
  document.getElementById('options-btn').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
  });
});

// Update status text
function updateStatusText(enabled) {
  const statusText = document.getElementById('status-text');
  statusText.textContent = enabled ? 'Extension is ON' : 'Extension is OFF';
}