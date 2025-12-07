import {readFileSync} from "fs";
import {Queue} from "datastructures-js";

const input = readFileSync(0, "utf8");

type Grid = ('S' | '.' | '^' | '|')[][];

function getGridFromInput(): Grid {
    return input.split("\n").map((row) => row.split('')) as Grid;
}

const grid = getGridFromInput();
const ROWS = grid.length;
const COLS = grid[0].length;

function parseForVisited(r: number, c: number) {
    return `${r},${c}`;
}

function getBeamSplitsPart1(): number {
    let splits = 0;

    const visited = new Set<string>();
    const queue = new Queue<[number, number]>();
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === 'S') {
                queue.push([r, c]);
            }
        }
    }

    while (!queue.isEmpty()) {
        const qLength = queue.size();
        for (let i = 0; i < qLength; i++) {
            const [r, c] = queue.pop()!;
            if (r + 1 === COLS) {
                continue;
            }

            const down = grid[r + 1][c];
            const downLeft: [number, number] = [r + 1, c - 1];
            const downRight: [number, number] = [r + 1, c + 1];
            if (down === '^') {
                splits++;
                const downLeftParsed = parseForVisited(downLeft[0], downLeft[1]);
                const downRightParsed = parseForVisited(downRight[0], downRight[1]);
                if (c - 1 >= 0 && !visited.has(downLeftParsed)) {
                    queue.push(downLeft);
                    visited.add(downLeftParsed);
                }
                if (c + 1 < COLS && !visited.has(downRightParsed)) {
                    queue.push(downRight);
                    visited.add(downRightParsed);
                }
            } else {
                const downParsed = parseForVisited(r + 1, c);
                if (!visited.has(downParsed)) {
                    queue.push([r + 1, c])
                    visited.add(downParsed);
                }
            }
        }
    }

    return splits;
}

function getBeamSplitsPart2(): number {
    const cache: (number | undefined)[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => undefined));

    function dfs(r: number, c: number): number {
        if (r + 1 === ROWS) {
            return 1;
        }
        if (cache[r][c] !== undefined) {
            return cache[r][c];
        }

        let total = 0;
        if (grid[r + 1][c] === '^') {
            if (c - 1 >= 0) {
                total += dfs(r + 1, c - 1);
            }
            if (c + 1 < COLS) {
                total += dfs(r + 1, c + 1);
            }

        } else {
            total = dfs(r + 1, c);
        }

        cache[r][c] = total;
        return total;
    }

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c] === 'S') {
                return dfs(r, c);
            }
        }
    }

    return -1;
}

console.time("Execution time for part 1");
console.log(getBeamSplitsPart1());
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getBeamSplitsPart2());
console.timeEnd("Execution time for part 2");