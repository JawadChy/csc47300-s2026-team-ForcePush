// HW3: Navigation Logic 
// We use type casting (as HTMLElement) because we know these exist in our HTML
var navToggle = document.getElementById('navToggle');
var dropMenu = document.getElementById('dropMenu');
// Return type for setTimeout in the browser is 'number'
var hideTimeout;
var showMenu = function () {
    clearTimeout(hideTimeout);
    dropMenu.classList.add('show');
};
var hideMenu = function () {
    // Start a 500ms timer before hiding
    hideTimeout = window.setTimeout(function () {
        dropMenu.classList.remove('show');
    }, 500);
};
navToggle.addEventListener('mouseenter', showMenu);
navToggle.addEventListener('mouseleave', hideMenu);
dropMenu.addEventListener('mouseenter', showMenu);
dropMenu.addEventListener('mouseleave', hideMenu);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        dropMenu.classList.remove('show');
    }
});
// --- HW4: Hint Rotation Logic ---
var hints = [
    { text: "Try to use `vimtutor` to learn more about vim.", duration: 5000 },
    { text: "Use `h`, `j`, `k`, `l` to move the cursor.", duration: 3000 },
    { text: "Press `i` to enter Insert mode and `Esc` to return to Normal mode.", duration: 6000 },
    { text: "To save and quit, type `:wq` and hit Enter.", duration: 4000 },
    { text: "Deleted something by mistake? Press `u` to undo!", duration: 5000 }
];
var chatText = document.querySelector('.chat-text');
var chatCounter = document.querySelector('.chat-counter');
var currentHintIndex = 0;
function rotateHints() {
    var currentHint = hints[currentHintIndex];
    // Update the UI
    if (chatText)
        chatText.innerText = currentHint.text;
    if (chatCounter)
        chatCounter.innerText = "".concat(currentHintIndex + 1, "/").concat(hints.length);
    // Prepare next index
    currentHintIndex = (currentHintIndex + 1) % hints.length;
    // Schedule next update
    setTimeout(rotateHints, currentHint.duration);
}
// Start the rotation
rotateHints();
