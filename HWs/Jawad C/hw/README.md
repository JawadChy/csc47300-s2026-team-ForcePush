# JavaScript to TypeScript Conversion

## What Was Converted

- `scripts/queue.js` to `scripts/queue.ts` - Added `QueueData` interface for the JSON structure and typed all functions and DOM elements.
- `scripts/hints.js` to `scripts/hints.ts` - Added a `Hint` interface with `readonly` properties.
- `data/animation.js` to `data/animation.ts` - Typed the frames array as `readonly string[]`. Renamed `frames` to `animationFrames` to avoid conflicting with the DOM global `window.frames`.
- Inline `<script>` in `index.html` extracted to `scripts/lobby.ts` - Added null checks for DOM lookups.

## Why .js Files Still Exist

Browsers cannot run TypeScript directly. The `.ts` files are the source code, and the TypeScript compiler (`tsc`) generates the `.js` files that the HTML actually loads. To recompile after making changes, run `npx -p typescript tsc` from the `hw` directory.

## How to Check JS and TS Line Counts

Run this from the root directory:

```
npx cloc "HWs/Jawad C/hw" 
```

```
      20 text files.
      17 unique files.                              
       3 files ignored.

github.com/AlDanial/cloc v 2.06  T=0.02 s (741.1 files/s, 52702.3 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
CSS                              1             81             22            387
TypeScript                       4             23             12            222
JavaScript                       4              0             12            217
HTML                             2             43             12            115
SVG                              3              0              0             29
JSON                             2              0              0             14
Markdown                         1              7              0             13
-------------------------------------------------------------------------------
SUM:                            17            154             58            997
-------------------------------------------------------------------------------
```
