import fs from 'fs';
import path from 'path';

//Read each line of input txt file
const file: string = fs.readFileSync(
	path.join(import.meta.dir, 'input.txt'),
	'utf8'
);
const lines: string[] = file.split('\n');

const cubeLimts: Map<string, number> = new Map([
	['red', 12],
	['green', 13],
	['blue', 14],
]);

function partOne(game: string): number {
	const gameId = game.split(':')[0].replace('Game ', '');
	const gameCubes = game.split(':')[1];

	for (const limit of cubeLimts) {
		const regex = new RegExp(`\\d{1,}(?=\\s(?=${limit[0]}))`, 'g');
		const cubes = gameCubes.match(regex) || [];

		for (const cube of cubes) {
			if (parseInt(cube) > limit[1]) {
				return 0;
			}
		}
	}

	return parseInt(gameId);
}

function partTwo(game: string): number {
	const gameCubes = game.split(':')[1];
	const maxCubes: number[] = [];

	for (const limit of cubeLimts) {
		const regex = new RegExp(`\\d{1,}(?=\\s(?=${limit[0]}))`, 'g');
		const cubes: number[] =
			gameCubes.match(regex)?.map((match) => parseInt(match)) || [];

		maxCubes.push(Math.max(...cubes));
	}

	return maxCubes.reduce((a, b) => a * b);
}

function main() {
	let totalValidGames: number = 0;
	let totalMaxCubes: number = 0;

	for (const game of lines) {
		totalValidGames += partOne(game);
		totalMaxCubes += partTwo(game);
	}

	return [totalValidGames, totalMaxCubes];
}

console.log(main());
