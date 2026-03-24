interface QueueData {
    playersOnline: number;
    inQueue: number;
    avgWaitSeconds: number;
    matchAfterTicks: number;
}

document.addEventListener("DOMContentLoaded", (): void => {

    const valueEls: NodeListOf<Element> = document.querySelectorAll(".queue-stats__value");
    const introLine: Element | null = document.querySelector(".intro-line");

    fetch("data/queue.json")
        .then((res: Response): Promise<QueueData> => res.json() as Promise<QueueData>)
        .then((data: QueueData): void => {

            let queue: number = data.inQueue;
            let wait: number  = data.avgWaitSeconds;
            let tick: number  = 0;

            // show initial stats loaded from queue.json
            populate(valueEls, data.playersOnline, queue, wait);

            // simulate queue countdown, ticking every 2 seconds
            const interval: number = setInterval((): void => {

                tick++;
                const lastTick: boolean = tick >= data.matchAfterTicks;

                // avg wait drops to 0 on the final tick
                if (lastTick) {
                    wait = 0;
                } else {
                    wait = Math.max(1, wait - randBetween(6, 14));
                }

                // queue drifts down but stays positive, other players are still queuing
                queue = Math.max(1, queue - randBetween(5, 15));

                // players online drifts slightly each tick
                const online: number = data.playersOnline + randBetween(-20, 20);

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
function populate(els: NodeListOf<Element>, online: number, queue: number, waitSec: number): void {
    els[0].textContent = online.toLocaleString();
    els[1].textContent = String(queue);
    els[2].textContent = formatWait(waitSec);
}

// adds the css class that triggers the blink-to-fill animation
function matchFound(el: Element): void {
    el.classList.add("intro-line--found");
}

// returns a random integer between min and max inclusive
function randBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// converts a total seconds value into "Xm Ys" or just "Xs"
function formatWait(totalSeconds: number): string {
    const m: number = Math.floor(totalSeconds / 60);
    const s: number = totalSeconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
}
