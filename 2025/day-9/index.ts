import { readFileSync } from "fs";

type Point = [number, number];

const input = readFileSync(0, "utf8");

function getPointsFromInput(): Point[] {
    const points: Point[] = [];
    for (const rawPoint of input.split("\n")) {
        const point = rawPoint.split(',').map(Number) as Point;
        points.push(point);
    }

    return points;
}

const points = getPointsFromInput();

function getMaxAreaRectangle(): number {
    let maxArea = 0;
    for (let i = 0; i < points.length - 1; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const area = (Math.abs(points[i][0] - points[j][0]) + 1) * (Math.abs(points[i][1] - points[j][1]) + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}

console.time("Execution time for part 1");
console.log(getMaxAreaRectangle());
console.timeEnd("Execution time for part 1");