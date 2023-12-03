import fs from 'fs';
import path from 'path';

//Read each line of input txt file
const file: string = fs.readFileSync(
	path.join(import.meta.dir, 'input.txt'),
	'utf8'
);

const lines: string[] = file.split('\n');
let matrix = lines.map((line) => Array.from(line));

const symbolRegex = /[^A-Za-z0-9\.\s]/; //Regex to match any special character
const numberRegex = /[0-9]/; //Regex to match any number

type Coordinates = {
	x: number;
	y: number;
} | null;

function findNumberLeftRight(row: string[], pos: number) {
	let number: string = row[pos]; //This is the first position of the number

	//Check if there is another number to the left
	for (let i = pos; i > 0; i--) {
		if (row[i - 1].match(numberRegex)) {
			number = row[i - 1].concat(number);
		} else {
			break;
		}
	}

	//Check if there is another number to the right
	for (let i = pos; i < row.length - 1; i++) {
		if (row[i + 1].match(numberRegex)) {
			number = number.concat(row[i + 1]);
		} else {
			break;
		}
	}

	return number;
}

function getNeighbours(
	matrix: string[][],
	x: number,
	y: number
): Coordinates[] {
	const isTop = y == 0;
	const isBottom = y == matrix.length - 1;
	const isLeft = x == 0;
	const isRight = x == matrix[y].length - 1;
	const isTopLeft = isTop && isLeft;
	const isTopRight = isTop && isRight;
	const isBottomLeft = isBottom && isLeft;
	const isBottomRight = isBottom && isRight;

	const top = isTop ? null : { x: x, y: y - 1 };
	const bottom = isBottom ? null : { x: x, y: y + 1 };
	const left = isLeft ? null : { x: x - 1, y: y };
	const right = isRight ? null : { x: x + 1, y: y };
	const topLeft = isTopLeft ? null : { x: x - 1, y: y - 1 };
	const topRight = isTopRight ? null : { x: x + 1, y: y - 1 };
	const bottomLeft = isBottomLeft ? null : { x: x - 1, y: y + 1 };
	const bottomRight = isBottomRight ? null : { x: x + 1, y: y + 1 };

	const neighbours = [
		top,
		bottom,
		left,
		right,
		topLeft,
		topRight,
		bottomLeft,
		bottomRight,
	].filter(
		(neighbour) =>
			neighbour && matrix[neighbour.y][neighbour.x].match(numberRegex)
	);

	return neighbours;
}

function partOne(
	matrix: string[][],
	x: number,
	y: number
): number[] | undefined {
	if (matrix[y][x].match(symbolRegex)) {
		const neighbours = getNeighbours(matrix, x, y);

		const numbers: number[] = neighbours.map((neighbour) =>
			parseInt(findNumberLeftRight(matrix[neighbour!.y], neighbour!.x))
		);

		//remove duplicates
		return [...new Set(numbers)];
	}

	return undefined;
}

function partTwo(
	matrix: string[][],
	x: number,
	y: number
): number[] | undefined {
	const neighbours = getNeighbours(matrix, x, y);

	const numbers: number[] = neighbours.map((neighbour) =>
		parseInt(findNumberLeftRight(matrix[neighbour!.y], neighbour!.x))
	);

	//remove duplicates
	const gears = [...new Set(numbers)];
	if (gears.length == 2) {
		return gears;
	}

	return undefined;
}

function main() {
	let partOneNum: number = 0;
	let partTwoNum: number = 0;

	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			//Part One
			const number = matrix[y][x].match(symbolRegex)
				? partOne(matrix, x, y)
				: undefined;
			number?.forEach((num) => (partOneNum += num));

			//Part Two
			const gears = matrix[y][x].match(/\*/)
				? partTwo(matrix, x, y)
				: undefined;

			if (gears) {
				const mult = gears?.reduce((prev, curr) => prev * curr, 1);
				partTwoNum += mult;
			}
		}
	}

	console.log(`Part One: ${partOneNum}`);
	console.log(`Part Two: ${partTwoNum}`);
}

main();
