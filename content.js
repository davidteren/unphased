// content.js
let audioContext;
let source;
let splitter;
let merger;
let leftGain;
let rightGain;
let isInverted = false;
let isMono = false;

function initAudio() {
    const videoElement = document.querySelector('video');
    if (!videoElement) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaElementSource(videoElement);
    splitter = audioContext.createChannelSplitter(2);
    merger = audioContext.createChannelMerger(2);
    leftGain = audioContext.createGain();
    rightGain = audioContext.createGain();

    source.connect(splitter);
    splitter.connect(leftGain, 0);
    splitter.connect(rightGain, 1);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(audioContext.destination);
}

function togglePhaseInversion() {
    if (!audioContext) initAudio();
    isInverted = !isInverted;
    rightGain.gain.setValueAtTime(isInverted ? -1 : 1, audioContext.currentTime);
    updateButtonStates();
}

function toggleMono() {
    if (!audioContext) initAudio();
    isMono = !isMono;
    if (isMono) {
        leftGain.connect(merger, 0, 1);
        rightGain.connect(merger, 0, 0);
    } else {
        leftGain.disconnect(merger, 0, 1);
        rightGain.disconnect(merger, 0, 0);
    }
    updateButtonStates();
}

function createButton(id, text, onClick) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.style.padding = '10px';
    button.style.margin = '5px';
    button.style.borderRadius = '5px';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'Arial, sans-serif';
    button.style.fontSize = '14px';
    button.style.fontWeight = 'bold';
    button.addEventListener('click', onClick);
    return button;
}

function createControlPanel() {
    const panel = document.createElement('div');
    panel.id = 'unphased-panel';
    panel.style.position = 'fixed';
    panel.style.top = '20px';
    panel.style.right = '20px';
    panel.style.zIndex = '9999';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    panel.style.padding = '10px';
    panel.style.borderRadius = '5px';

    const phaseButton = createButton('unphased-phase', 'Phase: Normal', togglePhaseInversion);
    const monoButton = createButton('unphased-mono', 'Stereo', toggleMono);

    panel.appendChild(phaseButton);
    panel.appendChild(monoButton);
    document.body.appendChild(panel);

    return { phaseButton, monoButton };
}

function updateButtonStates() {
    const phaseButton = document.getElementById('unphased-phase');
    const monoButton = document.getElementById('unphased-mono');

    if (phaseButton) {
        phaseButton.textContent = isInverted ? 'Phase: Inverted' : 'Phase: Normal';
        phaseButton.style.backgroundColor = isInverted ? '#4CAF50' : '#f44336';
    }

    if (monoButton) {
        monoButton.textContent = isMono ? 'Mono' : 'Stereo';
        monoButton.style.backgroundColor = isMono ? '#2196F3' : '#FF9800';
    }
}

function init() {
    createControlPanel();
    updateButtonStates();
}

// Run the init function when the page is fully loaded
if (document.readyState === 'complete') {
    init();
} else {
    window.addEventListener('load', init);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleControls") {
        const panel = document.getElementById('unphased-panel');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    }
});

// Reinitialize audio context when navigating between YouTube videos
let currentUrl = location.href;
setInterval(() => {
    if (currentUrl !== location.href) {
        currentUrl = location.href;
        if (audioContext) {
            audioContext.close();
            audioContext = null;
        }
        setTimeout(initAudio, 1000); // Wait for the new video to load
    }
}, 1000);
