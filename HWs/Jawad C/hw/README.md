# ViFrost Matchmaking Queue Screen

A matchmaking waiting room UI for ViFrost, a 1v1 Vim game. Built with HTML, CSS, and JavaScript. Queue stats are loaded from a JSON file and simulate a live countdown, culminating in a "match found" reveal animation.

## Features

### Flexbox Layout System

The page uses **9 flex containers** for alignment and spacing:

- **Body** (`flex-direction: column`): Stacks the header above the main content area and fills the full viewport height.
- **Header** (`justify-content: space-between`): Pushes the brand group to the left edge and the actions group to the right edge with all remaining space distributed between them.
- **Brand group** (`gap: 18px`): Horizontally aligns the ViFrost logo and name with consistent spacing.
- **Actions group** (`gap: 20px`): Horizontally aligns the queue badge, leaderboard icon, and avatar icon.
- **Left panel** (`align-items: center; justify-content: center`): Centers the status block both horizontally and vertically within the panel.
- **Status block** (`flex-direction: column; gap: 38px`): Vertically stacks the spinner, heading, subtitle, divider, and stats list with uniform spacing.
- **Queue stats list** (`flex-direction: column; gap: 16px`): Stacks stat rows vertically.
- **Queue stats rows** (`justify-content: space-between; align-items: baseline`): Pushes labels left and values right, aligned on the typographic baseline.
- **Intro stage** (`align-items: center; justify-content: center`): Centers the "match found" text in the right panel.

### CSS Grid Layout

The main content area uses `display: grid` with `grid-template-columns: 2fr 3fr` to create a two-column layout. The `fr` (fractional) unit divides available space proportionally, giving the left panel 40% and the right panel 60%. Grid was chosen over flexbox here because it provides explicit control over column sizing rather than relying on content-based widths.

### CSS Animations

Five `@keyframes` animations run across the page:

- **Spinner outer arc** (`spin-cw`): Rotates a partial-border circle 360 degrees clockwise over 2 seconds with a custom `cubic-bezier` easing curve for organic acceleration/deceleration. Uses `filter: drop-shadow` to glow around the arc shape rather than its bounding box.
- **Spinner inner arc** (`spin-ccw`): Rotates counter-clockwise at a slower 2.8 seconds, creating visual complexity through opposing motion at mismatched speeds.
- **Spinner core pulse** (`core-pulse`): Scales between 80% and 100% while oscillating opacity from 45% to 100%, producing a breathing glow effect. Three stacked `box-shadow` layers at different blur radii (12px, 28px, 50px) create the halo.
- **Blinking dots** (`dot-blink`): Three dots animate with staggered `animation-delay` values (0s, 0.27s, 0.54s) using `:nth-child()` selectors. The keyframe holds full opacity between 45% and 65% of each cycle, creating a visible plateau before fading.
- **Match found reveal** (`match-reveal`): A single "MATCH FOUND" text starts hidden, then blinks three times as a stroke-only outline (visible → invisible cycles), before the `color` property transitions from `transparent` to the accent color with a `text-shadow` glow. Uses `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo) for a snappy fill and `animation-fill-mode: forwards` to hold the final solid state. Triggered by JavaScript adding the `--found` modifier class after the queue countdown completes.

### Hover Interaction (CSS Transition)

The avatar icon in the header scales to 115% and gains a glow on hover using the `:hover` pseudo-class. The `transition` property animates `transform` and `box-shadow` over 0.2 seconds with an ease curve, creating a smooth state change rather than an instant snap.

### Other Pseudo-Elements

The left panel uses a `::before` pseudo-element to render a decorative radial glow in the top-right corner. This keeps the decoration out of the HTML markup since it is generated purely by CSS with `content: ''`. The element uses `pointer-events: none` so it doesn't intercept clicks.

### Design Tokens (CSS Custom Properties)

All colors, opacities, and the font family are defined as CSS custom properties in `:root`. This centralizes the visual language so that changing `--accent` in one place updates every element that references `var(--accent)` across the stylesheet. The tokens include base backgrounds, accent colors with glow/dim variants, text colors, and the monospace font stack.

### Spinner Construction (Pure CSS, No Images)

The spinner is built from five `<div>` elements layered with `position: absolute`:

1. **Outer track**: A full circle (`border-radius: 50%`) with a faint border, acting as a static rail.
2. **Outer arc**: All four borders set to transparent, then `border-top-color` and `border-right-color` overridden to create a quarter-to-half circle arc that rotates.
3. **Inner track**: A smaller concentric circle using `inset: 28px`.
4. **Inner arc**: Same border technique, rotating in the opposite direction.
5. **Core**: A small solid circle with layered `box-shadow` for the glow halo, pulsing via `transform: scale()` and `opacity`.

### Frosted Glass Header

The header combines a semi-transparent background (`rgba(44, 81, 76, 0.85)`) with `backdrop-filter: blur(10px)` to create a frosted glass effect. The 85% opacity lets 15% of the content behind bleed through, and that content is blurred.

### JSON Data Simulation

Queue stats (players online, in queue, avg wait) are loaded from `data/queue.json` using `fetch()` and displayed in the left panel. JavaScript simulates a live matchmaking feed: every 2 seconds the queue count and average wait time tick down by random amounts, while players online drifts slightly. After a configurable number of ticks, the avg wait reaches `0s` and the match found animation triggers on the right panel. All data is read from the static JSON file with no backend.
