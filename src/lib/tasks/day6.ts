import { acc } from "./utils";

export async function task1(input: string): Promise<string> {
	const map = preprocessor(input);

	putStepsOnMap(map);

	let count = 0;
	for (const row of map) {
		count += row.filter((x) => x === 'X').length;
	}

	return Promise.resolve(count.toString());
}

export async function task2(input: string): Promise<string> {
	const map = preprocessor(input);

	const wardPos = {
		i: map.findIndex((x) => x.includes('^')),
		j: map[map.findIndex((x) => x.includes('^'))].indexOf('^')
	};

	putStepsOnMap(map);

	map[wardPos.i][wardPos.j] = '^';

	const wayPoints: { i: number; j: number }[] = [];
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === 'X') {
				wayPoints.push({ i, j });
			}
		}
	}

	let counter = 0;
	for (const wayPoint of wayPoints) {
		if (isPosGoodForObstacle(map, wayPoint.i, wayPoint.j)) {
			counter++;
		}
	}

	return Promise.resolve(counter.toString());
}

function isPosValid(map: string[][], i: number, j: number): boolean {
	return acc(map, i, j) !== undefined;
}

function isPosGoodForObstacle(map: string[][], i: number, j: number): boolean {
	let iPos = map.findIndex((x) => x.includes('^'));
	let jPos = map[iPos].indexOf('^');
	let rotationCount = 0;
	const stepMax = map.length * map[0].length;
	let stepCount = 0;

	const newMap = JSON.parse(JSON.stringify(map));

	newMap[i][j] = '#';

	do {
		//move
		switch (rotationCount % 4) {
			// north
			case 0:
				if (acc(newMap, iPos - 1, jPos) === '#') {
					rotationCount++;
				} else {
					iPos--;
					stepCount++;
				}
				break;
			// east
			case 1:
				if (acc(newMap, iPos, jPos + 1) === '#') {
					rotationCount++;
				} else {
					jPos++;
					stepCount++;
				}
				break;
			// south
			case 2:
				if (acc(newMap, iPos + 1, jPos) === '#') {
					rotationCount++;
				} else {
					iPos++;
					stepCount++;
				}
				break;
			// west
			case 3:
				if (acc(newMap, iPos, jPos - 1) === '#') {
					rotationCount++;
				} else {
					jPos--;
					stepCount++;
				}
				break;
		}

		if (stepMax < stepCount) {
			return true;
		}
	} while (isPosValid(newMap, iPos, jPos));
	return false;
}

function putStepsOnMap(map: string[][]): void {
	let rotationCount = 0;
	let iPos = map.findIndex((x) => x.includes('^'));
	let jPos = map[iPos].indexOf('^');

	do {
		// mark field
		map[iPos][jPos] = 'X';

		//move
		switch (rotationCount % 4) {
			// north
			case 0:
				if (acc(map, iPos - 1, jPos) === '#') {
					rotationCount++;
				} else {
					iPos--;
				}
				break;
			// east
			case 1:
				if (acc(map, iPos, jPos + 1) === '#') {
					rotationCount++;
				} else {
					jPos++;
				}
				break;
			// south
			case 2:
				if (acc(map, iPos + 1, jPos) === '#') {
					rotationCount++;
				} else {
					iPos++;
				}
				break;
			// west
			case 3:
				if (acc(map, iPos, jPos - 1) === '#') {
					rotationCount++;
				} else {
					jPos--;
				}
				break;
		}
	} while (isPosValid(map, iPos, jPos));
}



function preprocessor(input: string): string[][] {
	return input.split('\n').map((line) => line.split(''));
}
