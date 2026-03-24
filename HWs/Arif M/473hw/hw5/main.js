// "use strict";
// /**
//  * HW5 TypeScript
//  * This is the JavaScript file that is converted to typescript.
//  */

// function parsePercent(text) {
//     // Examples: "92%" or "92 %"
//     const cleaned = text.trim().replace('%', '');
//     const n = Number(cleaned);
//     return Number.isFinite(n) ? n : 0;
// }
// function parseMatchLength(text) {
//     // Examples: "18:23" (minutes:seconds)
//     const [minStr, secStr] = text.trim().split(':');
//     const minutes = Number(minStr);
//     const seconds = Number(secStr);
//     if (!Number.isFinite(minutes) || !Number.isFinite(seconds))
//         return 0;
//     return minutes * 60 + seconds;
// }
// function parseResult(text) {
//     // "W" should come before "L" when sorting ascending by default.
//     return text.trim().toUpperCase() === 'W' ? 1 : 0;
// }
// function compareValues(key, aRow, bRow) {
//     const aCells = Array.from(aRow.cells);
//     const bCells = Array.from(bRow.cells);
//     // Column mapping (based on the table markup in index.html)
//     const getIndexCell = () => [aCells[0], bCells[0]];
//     const getOpponentCell = () => [aCells[1], bCells[1]];
//     const getLengthCell = () => [aCells[2], bCells[2]];
//     const getAccuracyCell = () => [aCells[3], bCells[3]];
//     const getResultCell = () => [aCells[4], bCells[4]];
//     if (key === 'index') {
//         const [aCell, bCell] = getIndexCell();
//         const a = Number(aCell.textContent?.trim() ?? '');
//         const b = Number(bCell.textContent?.trim() ?? '');
//         return (Number.isFinite(a) ? a : 0) - (Number.isFinite(b) ? b : 0);
//     }
//     if (key === 'opponent') {
//         const [aCell, bCell] = getOpponentCell();
//         const a = (aCell.textContent ?? '').trim().toLowerCase();
//         const b = (bCell.textContent ?? '').trim().toLowerCase();
//         return a.localeCompare(b);
//     }
//     if (key === 'length') {
//         const [aCell, bCell] = getLengthCell();
//         return parseMatchLength(aCell.textContent ?? '') - parseMatchLength(bCell.textContent ?? '');
//     }
//     if (key === 'accuracy') {
//         const [aCell, bCell] = getAccuracyCell();
//         return parsePercent(aCell.textContent ?? '') - parsePercent(bCell.textContent ?? '');
//     }
//     // key === 'result'
//     const [aCell, bCell] = getResultCell();
//     return parseResult(aCell.textContent ?? '') - parseResult(bCell.textContent ?? '');
// }
// function setAriaSort(th, key, dir) {
//     // clear other headers first, then set the active one.
//     const ths = Array.from(th.closest('tr')?.querySelectorAll('th[data-sort-key]') ?? []);
//     for (const other of ths) {
//         other.setAttribute('aria-sort', 'none');
//     }
//     const value = dir === 'asc' ? 'ascending' : 'descending';
//     th.setAttribute('aria-sort', value);
//     void key;
// }
// function initMatchHistorySorting() {
//     const table = document.querySelector('table.leaderboard-table');
//     const theadRow = table?.tHead?.rows?.[0];
//     const tbody = table?.tBodies?.[0];
//     if (!table || !theadRow || !tbody)
//         return;
//     const headerCells = Array.from(theadRow.querySelectorAll('th[data-sort-key]'));
//     const state = { key: 'index', dir: 'asc' };
//     const sortRows = (nextKey, nextDir) => {
//         const rows = Array.from(tbody.rows);
//         const withOriginalIndex = rows.map((row, i) => ({ row, i }));
//         withOriginalIndex.sort((a, b) => {
//             const cmp = compareValues(nextKey, a.row, b.row);
//             if (cmp !== 0)
//                 return nextDir === 'asc' ? cmp : -cmp;
//             // tie-breaker by original index.
//             return a.i - b.i;
//         });
//         // Re-append in sorted order.
//         for (const item of withOriginalIndex)
//             tbody.appendChild(item.row);
//         state.key = nextKey;
//         state.dir = nextDir;
//         const activeTh = headerCells.find((th) => th.dataset.sortKey === nextKey);
//         if (activeTh)
//             setAriaSort(activeTh, nextKey, nextDir);
//     };
//     const toggleDir = (key) => {
//         if (state.key !== key)
//             return 'asc';
//         return state.dir === 'asc' ? 'desc' : 'asc';
//     };
//     const getKeyFromTh = (th) => {
//         const raw = th.dataset.sortKey;
//         if (raw === 'index' || raw === 'opponent' || raw === 'length' || raw === 'accuracy' || raw === 'result') {
//             return raw;
//         }
//         return null;
//     };
//     for (const th of headerCells) {
//         th.addEventListener('click', () => {
//             const key = getKeyFromTh(th);
//             if (!key)
//                 return;
//             const nextDir = toggleDir(key);
//             sortRows(key, nextDir);
//         });
//         th.addEventListener('keydown', (e) => {
//             if (e.key !== 'Enter' && e.key !== ' ')
//                 return;
//             e.preventDefault();
//             const key = getKeyFromTh(th);
//             if (!key)
//                 return;
//             const nextDir = toggleDir(key);
//             sortRows(key, nextDir);
//         });
//     }
// }
// document.addEventListener('DOMContentLoaded', () => {
//     initMatchHistorySorting();
// });
