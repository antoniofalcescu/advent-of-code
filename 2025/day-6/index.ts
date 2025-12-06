import {readFileSync} from "fs";

const input = readFileSync(0, "utf8");

const OPS = {
    '+': (nums: number[]) => nums.reduce((acc, num) => acc + num, 0),
    '*': (nums: number[]) => nums.reduce((acc, num) => acc * num, 1),
};

const splitInput = input.split("\n");
const rows = splitInput.length - 1;
const width = splitInput[0].split(" ").filter((x) => x !== '').map(Number).length;

function getNormalNumbers(): number[][] {
    const numbers: number[][] = Array.from({ length: width }, () => []);

    for (let i = 0; i < rows; i++) {
        const row = splitInput[i];
        const splitRow = row.split(" ");
        console.log(splitRow);
        const filteredRow = splitRow.filter((x) => x !== '');
        const rowNumbers = filteredRow.map(Number);
        for (let j = 0; j < rowNumbers.length; j++) {
            numbers[j].push(rowNumbers[j]);
        }
    }

    return numbers;
}

// Couldn't figure out how to parse left/right alignment of numbers
function getCephalopodNumbers(): number[][] {
    const numbers = getNormalNumbers();

    const allSplitNumbers: number[][][] = [];
    for (const numberArr of numbers) {
        const maxDigits = Math.trunc(Math.log10(Math.max(...numberArr)) + 1);
        const splitNumbers: number[][] = [];
        for (const number of numberArr) {
            const digitArray = number.toString().split('').map(Number);
            const remaining = maxDigits - digitArray.length;
            for (let i = 0; i < remaining; i++) {
                digitArray.splice(0, 0, 0);
            }
            splitNumbers.push(digitArray);
        }
        allSplitNumbers.push(splitNumbers);
    }

    console.log(allSplitNumbers);

    const cephalopodNumbers: number[][] = [];
    for (const row of allSplitNumbers) {
        const cephalopodNumbersRow = [];
        const digits = row[0].length;
        for (let i = 0; i < digits; i++) {
            let stringifiedNumber = "";
            for (const digitArr of row) {
                stringifiedNumber += digitArr[i];
            }
            cephalopodNumbersRow.push(Number(stringifiedNumber));
        }
        cephalopodNumbers.push(cephalopodNumbersRow);
    }
    console.log(cephalopodNumbers);
    return cephalopodNumbers;
}

function getResultsSum(part: "P1" | "P2"): number {
    const numbers = part === "P1" ? getNormalNumbers() : getCephalopodNumbers();

    const lastRow = splitInput[rows];
    const signs: ('+' | '*')[] = lastRow.split(' ').filter((x) => Object.keys(OPS).includes(x)) as ('+' | '*')[];

    let totalSum = 0;
    for (let i = 0; i < signs.length; i++) {
        const result = OPS[signs[i]](numbers[i]);
        totalSum += result;
    }

    return totalSum;
}

console.time("Execution time for part 1");
console.log(getResultsSum("P1"));
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getResultsSum("P2"));
console.timeEnd("Execution time for part 2");


