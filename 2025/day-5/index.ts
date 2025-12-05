import { readFileSync } from "fs";

type Range = {
    start: number;
    end: number;
};

const input = readFileSync(0, "utf8");

function getFreshRangesFromInput(): Range[] {
    const rawRanges = input.split("\n\n")[0].split("\n");

    const ranges: Range[] = [];
    for (const rawRange of rawRanges) {
        const [start, end] = rawRange.split("-").map(Number);
        ranges.push({ start, end });
    }

    ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [ranges[0]];
    for (let i = 1; i < ranges.length; i++) {
        const range = ranges[i];
        const compareRange = mergedRanges[mergedRanges.length - 1];
        if (range.start <= compareRange.end) {
            mergedRanges[mergedRanges.length - 1].end = Math.max(compareRange.end, range.end);
        } else {
            mergedRanges.push(range);
        }
    }
    console.log(mergedRanges);
    return mergedRanges;
}

function getIdsFromInput(): number[] {
    return input.split("\n\n")[1].split("\n").map(Number);
}

const freshRanges = getFreshRangesFromInput();
const ids = getIdsFromInput();

function getNumberOfFreshIds(): number {
    let freshIds = 0;
    for (const id of ids) {
        for (const { start, end } of freshRanges) {
            if (id >= start && id <= end) {
                freshIds++;
                break;
            }
        }
    }
    return freshIds;
}

function getTotalNumberOfFreshIds(): number {
    let freshIds = 0;
    for (const { start, end } of freshRanges) {
        freshIds += end - start + 1;
    }
    return freshIds;
}

console.time("Execution time for part 1");
console.log(getNumberOfFreshIds());
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getTotalNumberOfFreshIds());
console.timeEnd("Execution time for part 2");