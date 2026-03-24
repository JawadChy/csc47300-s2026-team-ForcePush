"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const valueEls = document.querySelectorAll(".queue-stats__value");
    const introLine = document.querySelector(".intro-line");
    fetch("data/queue.json")
        .then((res) => res.json())
        .then((data) => {
        let queue = data.inQueue;
        let wait = data.avgWaitSeconds;
        let tick = 0;
        // show initial stats loaded from queue.json
        populate(valueEls, data.playersOnline, queue, wait);
        // simulate queue countdown, ticking every 2 seconds
        const interval = setInterval(() => {
            tick++;
            const lastTick = tick >= data.matchAfterTicks;
            // avg wait drops to 0 on the final tick
            if (lastTick) {
                wait = 0;
            }
            else {
                wait = Math.max(1, wait - randBetween(6, 14));
            }
            // queue drifts down but stays positive, other players are still queuing
            queue = Math.max(1, queue - randBetween(5, 15));
            // players online drifts slightly each tick
            const online = data.playersOnline + randBetween(-20, 20);
            populate(valueEls, online, queue, wait);
            // on the last tick, stop the interval and trigger the match-found animation
            if (lastTick) {
                clearInterval(interval);
                if (introLine !== null) {
                    matchFound(introLine);
                }
            }
        }, 2000);
    });
});
// updates the three stat values in the left panel
function populate(els, online, queue, waitSec) {
    els[0].textContent = online.toLocaleString();
    els[1].textContent = String(queue);
    els[2].textContent = formatWait(waitSec);
}
// adds the css class that triggers the blink-to-fill animation
function matchFound(el) {
    el.classList.add("intro-line--found");
}
// returns a random integer between min and max inclusive
function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// converts a total seconds value into "Xm Ys" or just "Xs"
function formatWait(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
