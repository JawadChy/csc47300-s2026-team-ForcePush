// HW5: all code from script_old.js is turned to ts here, and compiled to script.js
// --- Types ---
interface Hint {
    text: string;
    duration: number;
}

// HW3: Navigation Logic 
// We use type casting (as HTMLElement) because we know these exist in our HTML
const navToggle = document.getElementById('navToggle') as HTMLElement;
const dropMenu = document.getElementById('dropMenu') as HTMLElement;

// Return type for setTimeout in the browser is 'number'
let hideTimeout: number | undefined;

const showMenu = (): void => {
    clearTimeout(hideTimeout);
    dropMenu.classList.add('show');
};

const hideMenu = (): void => {
    // Start a 500ms timer before hiding
    hideTimeout = window.setTimeout(() => {
        dropMenu.classList.remove('show');
    }, 500);
};

navToggle.addEventListener('mouseenter', showMenu);
navToggle.addEventListener('mouseleave', hideMenu);

dropMenu.addEventListener('mouseenter', showMenu);
dropMenu.addEventListener('mouseleave', hideMenu);

document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        dropMenu.classList.remove('show');
    }
});

// --- HW4: Hint Rotation Logic ---
const hints: Hint[] = [
    { text: "Try to use `vimtutor` to learn more about vim.", duration: 5000 },
    { text: "Use `h`, `j`, `k`, `l` to move the cursor.", duration: 3000 },
    { text: "Press `i` to enter Insert mode and `Esc` to return to Normal mode.", duration: 6000 },
    { text: "To save and quit, type `:wq` and hit Enter.", duration: 4000 },
    { text: "Deleted something by mistake? Press `u` to undo!", duration: 5000 }
];

const chatText = document.querySelector('.chat-text') as HTMLDivElement;
const chatCounter = document.querySelector('.chat-counter') as HTMLSpanElement;
let currentHintIndex: number = 0;

function rotateHints(): void {
    const currentHint: Hint = hints[currentHintIndex];

    // Update the UI
    if (chatText) chatText.innerText = currentHint.text;
    if (chatCounter) chatCounter.innerText = `${currentHintIndex + 1}/${hints.length}`;

    // Prepare next index
    currentHintIndex = (currentHintIndex + 1) % hints.length;

    // Schedule next update
    setTimeout(rotateHints, currentHint.duration);
}

// Start the rotation
rotateHints();