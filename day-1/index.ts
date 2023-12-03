import fs from 'fs';
import path from 'path';

//Read each line of input txt file
const file: string = fs.readFileSync(
	path.join(import.meta.dir, 'input.txt'),
	'utf8'
);
const lines: string[] = file.split('\n');

const numbersStringMap: Map<string, number> = new Map([
	['one', 1],
	['two', 2],
	['three', 3],
	['four', 4],
	['five', 5],
	['six', 6],
	['seven', 7],
	['eight', 8],
	['nine', 9],
]);

function getNumberFromString(
	str: string,
	numberStringConvertion: boolean = false
): number {
	let regEx: RegExp = /\d/g;

	if (numberStringConvertion) {
		const addToRegex = Array.from(numbersStringMap.keys())
			.map((key) => `${key}`)
			.join('|');

		regEx = new RegExp(`(?=(\\d|${addToRegex}))`, 'g');
	}

	const res =
		Array.from(
			str.matchAll(regEx),
			(match) => match[numberStringConvertion ? 1 : 0]
		) ?? [];

	//convert string numbers to numbers
	const numbers: number[] = res.map((num) => {
		if (numberStringConvertion) {
			const number: number | undefined = numbersStringMap.get(num);

			if (number) return number;
		}

		return Number(num);
	});

	let stringNumber: string = numbers[0]?.toString() ?? '';
	stringNumber += numbers[numbers.length - 1]?.toString() ?? '';

	if (stringNumber === '') return 0;

	return parseInt(stringNumber);
}

function main() {
	let partOneNumber = 0;
	let partTwoNumber = 0;

	for (const line of lines) {
		partOneNumber += getNumberFromString(line);
		partTwoNumber += getNumberFromString(line, true);
	}

	return [partOneNumber, partTwoNumber];
}

const [partOne, partTwo] = main();
console.log(`Part One: ${partOne}`);
console.log(`Part Two: ${partTwo}`);
