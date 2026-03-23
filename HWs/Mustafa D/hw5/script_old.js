
// hw3
const navToggle = document.getElementById('navToggle');
const dropMenu = document.getElementById('dropMenu');
let hideTimeout;

// Function to show the menu
const showMenu = () => {
    clearTimeout(hideTimeout); // Stop any pending hide timer
    dropMenu.classList.add('show');
};

// Function to hide the menu
const hideMenu = () => {
    // Start a 1-second (1000ms) timer before hiding
    hideTimeout = setTimeout(() => {
        dropMenu.classList.remove('show');
    }, 500);
};

// Trigger on Hover (Enter/Leave)
navToggle.addEventListener('mouseenter', showMenu);
navToggle.addEventListener('mouseleave', hideMenu);

// Also keep menu open if mouse is inside the dropdown itself
dropMenu.addEventListener('mouseenter', showMenu);
dropMenu.addEventListener('mouseleave', hideMenu);

// Optional: Close immediately on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dropMenu.classList.remove('show');
    }
});
// hw4 part
// --- Hint Rotation Logic ---
const hints = [
    { text: "Try to use `vimtutor` to learn more about vim.", duration: 5000 },
    { text: "Use `h`, `j`, `k`, `l` to move the cursor.", duration: 3000 },
    { text: "Press `i` to enter Insert mode and `Esc` to return to Normal mode.", duration: 6000 },
    { text: "To save and quit, type `:wq` and hit Enter.", duration: 4000 },
    { text: "Deleted something by mistake? Press `u` to undo!", duration: 5000 }
];

const chatText = document.querySelector('.chat-text');
const chatCounter = document.querySelector('.chat-counter');
let currentHintIndex = 0;

function rotateHints() {
    const currentHint = hints[currentHintIndex];

    // Update the UI
    chatText.innerText = currentHint.text;
    chatCounter.innerText = `${currentHintIndex + 1}/${hints.length}`;

    // Prepare the next index (looping back to 0 at the end)
    currentHintIndex = (currentHintIndex + 1) % hints.length;

    // Schedule the next update based on the current hint's specific duration
    setTimeout(rotateHints, currentHint.duration);
}

// Start the rotation
rotateHints();