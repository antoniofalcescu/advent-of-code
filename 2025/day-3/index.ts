import {readFileSync} from "fs";

type Bank = string;

const input = readFileSync(0, "utf8");

function getBanksFromInput(): Bank[] {
    return input.split("\n");
}

function getBiggestDigitIdx(bank: Bank, start: number, end: number): number {
    let biggestDigitIdx = start;
    for (let i = start + 1; i < end; i++) {
        const biggestDigit = Number(bank[biggestDigitIdx]);
        const currentDigit = Number(bank[i]);
        if (currentDigit > biggestDigit) {
            biggestDigitIdx = i;
        }
    }

    return biggestDigitIdx;
}

function getJoltagePerBankPart1(bank: Bank): number {
    const biggestDigitIdx = getBiggestDigitIdx(bank, 0, bank.length - 1);
    const secondBiggestDigitIdx = getBiggestDigitIdx(bank, biggestDigitIdx + 1, bank.length);

    return Number(bank[biggestDigitIdx]) * 10 + Number(bank[secondBiggestDigitIdx]);
}

function getJoltagePerBankPart2(bank: Bank): number {
    let idx = -1;
    let number = 0;
    for (let digits = 11; digits >= 0; digits--) {
        idx = getBiggestDigitIdx(bank, idx + 1, bank.length - digits);
        const digit = Number(bank[idx]);
        number = number * 10 + digit;
    }

    return number;
}

function getTotalJoltage(part: "P1" | "P2"): number {
    let joltage = 0;
    const banks = getBanksFromInput();
    for (const bank of banks) {
        const method = part === "P1" ? getJoltagePerBankPart1 : getJoltagePerBankPart2;
        joltage += method(bank);
    }

    return joltage;
}

console.time("Execution time for part 1");
console.log(getTotalJoltage("P1"));
console.timeEnd("Execution time for part 1");

console.time("Execution time for part 2");
console.log(getTotalJoltage("P2"));
console.timeEnd("Execution time for part 2");