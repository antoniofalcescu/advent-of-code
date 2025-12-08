import {readFileSync} from "fs";
import { MinPriorityQueue } from "datastructures-js";

type Point = [number, number, number];

const input = readFileSync(0, "utf8");

function getDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
}

function getPointsFromInput(): Point[] {
    const points: Point[] = [];
    for (const rawPoint of input.split("\n")) {
        const point = rawPoint.split(',').map(Number) as Point;
        points.push(point);
    }

    return points;
}

const points: Point[] = getPointsFromInput();

function getClosestPointsFromInput(): MinPriorityQueue<[number, number, number]> {
    const minHeap = new MinPriorityQueue<[number, number, number]>((elem) => elem[0]);
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const distance = getDistance(points[i], points[j]);
            minHeap.enqueue([distance, i, j]);
        }
    }

    return minHeap;
}

function getMultipliedSize(limit: number, part: "P1" | "P2"): number {
    const minHeap = getClosestPointsFromInput();

    let size = 1;
    const parents: number[] = [];
    const ranks: number[] = [];
    for (let i = 0; i < points.length; i++) {
        parents[i] = i;
        ranks[i] = 1;
    }

    function find(i: number): number {
        while (i !== parents[i]) {
            parents[i] = parents[parents[i]];
            i = parents[i];
        }

        return i;
    }

    function union(i: number, j: number): number {
        const pi = find(i);
        const pj = find(j);

        if (pi === pj) {
            return 0;
        }

        if (ranks[pi] > ranks[pj]) {
            parents[pj] = pi;
            ranks[pi] += ranks[pj];
        } else {
            parents[pi] = pj;
            ranks[pj] += ranks[pi];
        }

        return 1;
    }


    if (part === "P1") {
        for (let k = 0; k < limit; k++) {
            const [_, i, j] = minHeap.dequeue()!;
            union(i, j)
        }

        const sortedRanks = [...ranks].sort((a, b) => b - a);
        for (let i = 0; i < 3; i++) {
            size *= sortedRanks[i];
        }
    } else {
        while (!minHeap.isEmpty()) {
            const [_, i, j] = minHeap.dequeue()!;
            if (union(i, j)) {
                size = points[i][0] * points[j][0];
            }
        }
    }

    return size;
}

console.time("Execution time for part 1");
console.log(getMultipliedSize(1000, "P1"));
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getMultipliedSize(-1, "P2"));
console.timeEnd("Execution time for part 2");
