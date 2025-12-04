import { readFileSync } from "fs";
import { MinPriorityQueue, Queue } from "datastructures-js";

type Grid = ('.' | '@')[][];

const input = readFileSync(0, "utf8");

function getGridFromInput(): Grid {
    const inputGrid = input.split("\n").map((row) => row.split('')) as Grid;
    const INPUT_ROWS = inputGrid.length;
    const INPUT_COLS = inputGrid[0].length;

    const grid: Grid = Array.from({ length: INPUT_ROWS + 2 }, () => Array.from({ length: INPUT_COLS + 2 }, () => '.'));
    for (let i = 0; i < INPUT_ROWS; i++) {
        for (let j = 0; j < INPUT_COLS; j++) {
            grid[i + 1][j + 1] = inputGrid[i][j];
        }
    }

    return grid;
}

const grid = getGridFromInput();

const ROWS = grid.length;
const COLS = grid[0].length;
const DIRS = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
];

function getNumberOfReachablePaperRollsPart1(): number {
    let reachable = 0;

    for (let r = 1; r < ROWS - 1; r++) {
        for (let c = 1; c < COLS - 1; c++) {
            if (grid[r][c] === '@') {
                let adjacentPaperRolls = 0;
                for (const [dr, dc] of DIRS) {
                    const [newR, newC] = [r + dr, c + dc];
                    if (grid[newR][newC] === '@') {
                        adjacentPaperRolls++;
                    }
                }
                if (adjacentPaperRolls < 4) {
                    reachable++;
                }
            }
        }
    }

    return reachable;
}

function getNumberOfReachablePaperRollsPart2(): number {
    const queue = new Queue<[number, [number, number]]>();
    for (let r = 1; r < ROWS - 1; r++) {
        for (let c = 1; c < COLS - 1; c++) {
            if (grid[r][c] === '@') {
                let adjacentPaperRolls = 0;
                for (const [dr, dc] of DIRS) {
                    const [newR, newC] = [r + dr, c + dc];
                    if (grid[newR][newC] === '@') {
                        adjacentPaperRolls++;
                    }
                }
                queue.push([adjacentPaperRolls, [r, c]]);
            }
        }
    }

    let reachable = 0;
    while (!queue.isEmpty()) {
        const size = queue.size();
        let madeProgress = false;
        for (let i = 0; i < size; i++) {
            const [adjacent, [r, c]] = queue.pop() as [number, [number, number]];

            if (adjacent < 4) {
                madeProgress = true;
                reachable++;
                grid[r][c] = '.';
                continue;
            }

            let updatedAdjacent = 0;
            for (const [dr, dc] of DIRS) {
                const [newR, newC] = [r + dr, c + dc];
                if (grid[newR][newC] === '@') {
                    updatedAdjacent++;
                }
            }
            if (updatedAdjacent < adjacent) {
                madeProgress = true;
            }
            queue.push([updatedAdjacent, [r, c]]);
        }

        if (!madeProgress) {
            break;
        }
    }
    return reachable;
}

console.time("Execution time for part 1");
console.log(getNumberOfReachablePaperRollsPart1());
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getNumberOfReachablePaperRollsPart2());
console.timeEnd("Execution time for part 2");