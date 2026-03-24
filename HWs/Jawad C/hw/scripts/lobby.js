"use strict";
// pick a random hint and display it
const hint = hints[Math.floor(Math.random() * hints.length)];
const hintTextEl = document.querySelector(".hint_text");
if (hintTextEl !== null) {
    hintTextEl.textContent = "Hint: " + hint.title;
}
// play ascii animation at 30 fps, looping through all frames
const asciiEl = document.getElementById("ascii-stage");
let frameIndex = 0;
if (asciiEl !== null) {
    setInterval(() => {
        asciiEl.textContent = animationFrames[frameIndex];
        frameIndex = (frameIndex + 1) % animationFrames.length;
    }, 1000 / 30);
}
