import { readFileSync } from "fs";

type Instruction = {
	direction: "L" | "R";
	amount: number;
};
const START_POINT = 50;

function mod(num: number): number {
	return (100 + (num % 100)) % 100;
}

const input = readFileSync(0, "utf8");

function getInstructionsFromInput(): Instruction[] {
	const instructions: Instruction[] = [];
	for (const line of input.split("\n")) {
		const direction = line[0] as Instruction["direction"];
		const amount = Number(line.slice(1));
		instructions.push({ direction, amount });
	}

	return instructions;
}

const instructions = getInstructionsFromInput();

function getPassword(part: "P1" | "P2"): number {
	let currentPoint = START_POINT;
	let password1 = 0;
	let password2 = 0;

	for (const instruction of instructions) {
		const { direction, amount } = instruction;
		if (direction === "L") {
			if (currentPoint === 0) {
				password2--;
			}

			const difference = currentPoint - amount;
			currentPoint = mod(difference);

			if (difference <= 0) {
				password2 += Math.trunc(difference / -100) + 1;
			}
		} else {
			const sum = currentPoint + amount;
			currentPoint = mod(sum);
			password2 += Math.trunc(sum / 100);
		}
		if (currentPoint === 0) {
			password1++;
		}
	}

	return part === "P1" ? password1 : password2;
}

console.log("Password for part 1: ", getPassword("P1"));
console.log("Password for part 2: ", getPassword("P2"));
