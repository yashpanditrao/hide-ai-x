// Options page script

// Load saved settings and blockers
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['blockers', 'extensionEnabled', 'emDashEnabled'], function(result) {
    const blockers = result.blockers || [];
    const extensionEnabled = result.extensionEnabled !== false; // default to true
    const emDashEnabled = result.emDashEnabled !== false; // default to true
    
    document.getElementById('extension-enabled').checked = extensionEnabled;
    document.getElementById('em-dash-enabled').checked = emDashEnabled;
    
    renderBlockersList(blockers);
  });
});

// Add blocker button
document.getElementById('add-blocker').addEventListener('click', function() {
  const input = document.getElementById('blocker-input');
  const blocker = input.value.trim();
  
  if (blocker) {
    addBlocker(blocker);
    input.value = '';
  }
});

// Add blocker via Enter key
document.getElementById('blocker-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('blocker-input');
    const blocker = input.value.trim();
    
    if (blocker) {
      addBlocker(blocker);
      input.value = '';
    }
  }
});

// Toggle switches
document.getElementById('extension-enabled').addEventListener('change', function() {
  chrome.storage.sync.set({extensionEnabled: this.checked});
  showStatus('Settings saved.');
});

document.getElementById('em-dash-enabled').addEventListener('change', function() {
  chrome.storage.sync.set({emDashEnabled: this.checked});
  showStatus('Settings saved.');
});

// Add a new blocker
function addBlocker(blocker) {
  chrome.storage.sync.get(['blockers'], function(result) {
    const blockers = result.blockers || [];
    
    // Check if blocker already exists
    if (blockers.includes(blocker)) {
      showStatus('This blocker already exists.');
      return;
    }
    
    blockers.push(blocker);
    chrome.storage.sync.set({blockers: blockers}, function() {
      renderBlockersList(blockers);
      showStatus('Blocker added.');
    });
  });
}

// Remove a blocker
function removeBlocker(blocker) {
  chrome.storage.sync.get(['blockers'], function(result) {
    const blockers = result.blockers || [];
    const index = blockers.indexOf(blocker);
    
    if (index > -1) {
      blockers.splice(index, 1);
      chrome.storage.sync.set({blockers: blockers}, function() {
        renderBlockersList(blockers);
        showStatus('Blocker removed.');
      });
    }
  });
}

// Render the list of blockers
function renderBlockersList(blockers) {
  const list = document.getElementById('blockers-list');
  list.innerHTML = '';
  
  blockers.forEach(function(blocker) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = blocker;
    
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.className = 'remove-btn';
    button.addEventListener('click', function() {
      removeBlocker(blocker);
    });
    
    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });
}

// Show status message
function showStatus(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  setTimeout(() => {
    status.textContent = '';
  }, 2000);
}