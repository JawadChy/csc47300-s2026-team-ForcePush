// pick a random hint and display it
const hint: Hint = hints[Math.floor(Math.random() * hints.length)];
const hintTextEl: Element | null = document.querySelector(".hint_text");
if (hintTextEl !== null) {
    hintTextEl.textContent = "Hint: " + hint.title;
}

// play ascii animation at 30 fps, looping through all frames
const asciiEl: HTMLElement | null = document.getElementById("ascii-stage");
let frameIndex: number = 0;

if (asciiEl !== null) {
    setInterval((): void => {
        asciiEl.textContent = animationFrames[frameIndex];
        frameIndex = (frameIndex + 1) % animationFrames.length;
    }, 1000 / 30);
}
