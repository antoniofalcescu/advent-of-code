import { readFileSync } from "fs";

type Range = {
	start: number;
	end: number;
};

const input = readFileSync(0, "utf8");

function getRangesFromInput(): Range[] {
	const ranges: Range[] = [];
	for (const rawRange of input.split(",")) {
		const [start, end] = rawRange.split("-").map(Number);
		ranges.push({ start, end });
	}

	return ranges;
}

const ranges = getRangesFromInput();

function isIdInvalidPart1(id: number): boolean {
	const stringId = id.toString();
	if (stringId.length % 2 === 1) {
		return false;
	}

	const mid = stringId.length / 2;
	return stringId.slice(0, mid) === stringId.slice(mid);
}

function isIdInvalidPart2(id: number): boolean {
	const stringId = id.toString();
	for (let i = 2; i <= stringId.length; i++) {
		if (stringId.length % i !== 0) {
			continue;
		}

		const cut = stringId.length / i;
        const sample = stringId.slice(0, cut);
        if (sample.repeat(i) === stringId) {
            return true;
        }
	}
	return false;
}

function getSumOfInvalidIds(part: "P1" | "P2"): number {
	let sum = 0;
	for (const { start, end } of ranges) {
		for (let num = start; num <= end; num++) {
            const method = part === "P1" ? isIdInvalidPart1 : isIdInvalidPart2;
			if (method(num)) {
				sum += num;
			}
		}
	}

	return sum;
}

console.time("Execution Time Part 1");
console.log("Sum of invalid ids for part 1: ", getSumOfInvalidIds("P1"));
console.timeEnd("Execution Time Part 1");

console.time("Execution Time Part 2");
console.log("Sum of invalid ids for part 2: ", getSumOfInvalidIds("P2"));
console.timeEnd("Execution Time Part 2");