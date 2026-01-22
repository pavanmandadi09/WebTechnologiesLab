// Requirement 2: Store activity in an array of objects
let activityLog = [];

// DOM Elements
const logPanel = document.getElementById('logPanel');
const warningBanner = document.getElementById('warningBanner');
const captureZone = document.getElementById('captureZone');

// --- Helper: Update DOM ---
// Requirement 4: Dynamically display the activity log
function renderLog(entry) {
    const logEntry = document.createElement('div');
    logEntry.classList.add('log-entry');
    
    // Format: [Time] [Event Type] Target: ...
    logEntry.innerHTML = `
        <span class="log-timestamp">[${entry.timestamp}]</span>
        <span class="log-type">${entry.type.toUpperCase()}</span> 
        | Target: &lt;${entry.target}&gt; | Phase: ${entry.phase}
    `;
    
    logPanel.prepend(logEntry); // Add new logs to the top
}

// --- Helper: Main Logger Function ---
function logActivity(eventType, targetElement, eventPhase) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString() + ":" + now.getMilliseconds();
    
    const entry = {
        id: Date.now() + Math.random(),
        type: eventType,
        target: targetElement.tagName,
        phase: eventPhase === 1 ? "Capturing" : (eventPhase === 3 ? "Bubbling" : "Target"),
        timestamp: timestamp,
        fullTime: now.getTime() // stored for calculations
    };

    activityLog.push(entry);
    renderLog(entry);
    checkSuspiciousActivity();
}

// --- Requirement 5: Suspicious Activity Thresholds ---
function checkSuspiciousActivity() {
    // Rule: More than 5 clicks in 2 seconds is suspicious
    const recentClicks = activityLog.filter(a => 
        a.type === 'click' && 
        (Date.now() - a.fullTime) < 2000 // Happened in last 2 seconds
    );

    if (recentClicks.length > 5) {
        warningBanner.style.display = 'block';
        setTimeout(() => {
            warningBanner.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    }
}

// --- Requirement 1 & 3: Event Listeners (Bubbling & Capturing) ---

// 1. GLOBAL LISTENERS (Using Bubbling - Default)
// These catch events from children that bubble up to the document
document.addEventListener('click', (e) => {
    // Ignore clicks on the log panel itself to prevent loop confusion
    if (e.target.closest('#logPanel')) return; 
    logActivity('click', e.target, e.eventPhase);
});

document.addEventListener('keydown', (e) => {
    logActivity(`key: ${e.key}`, e.target, e.eventPhase);
});

// Focus events do not bubble by default in some contexts, but 'focusin' does.
// However, to satisfy Requirement 1 specifically for 'focus', we often use capture.
document.addEventListener('focus', (e) => {
    logActivity('focus', e.target, e.eventPhase);
}, true); // Use Capture phase for focus to ensure we catch it globally


// 2. SPECIFIC CAPTURING LISTENER (To demonstrate Requirement 3)
// This catches the event on its way DOWN to the target, before the bubble phase.
captureZone.addEventListener('click', (e) => {
    logActivity('click (captured)', e.currentTarget, e.eventPhase);
}, true); // 'true' enables Capturing Phase


// --- Requirement 6: Reset and Export ---

document.getElementById('resetBtn').addEventListener('click', () => {
    activityLog = [];
    logPanel.innerHTML = '';
    // Log the reset itself as a system action
    logActivity('SYSTEM', { tagName: 'RESET_BUTTON' }, 2);
});

document.getElementById('exportBtn').addEventListener('click', () => {
    if (activityLog.length === 0) {
        alert("No activity to export.");
        return;
    }

    // Format log as text
    let textContent = "USER ACTIVITY LOG REPORT\n========================\n\n";
    activityLog.forEach(entry => {
        textContent += `${entry.timestamp} - ${entry.type} on <${entry.target}> (${entry.phase})\n`;
    });

    // Create a Blob to trigger a file download
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "activity_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});