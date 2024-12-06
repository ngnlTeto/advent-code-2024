export async function task1(input: string): Promise<string> {
	const map = preprocessor(input);

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

	let count = 0;
	for (const row of map) {
		count += row.filter((x) => x === 'X').length;
	}

	return Promise.resolve(count.toString());
}

export async function task2(input: string): Promise<string> {
	const map = preprocessor(input);

	let rotationCount = 0;
    let goodPosCount = 0;

	let iPos = map.findIndex((x) => x.includes('^'));
	let jPos = map[iPos].indexOf('^') + 1;

	do {
		// check if obstical createsLoop
        if (isPosGoodForObstacle(map, iPos, jPos, rotationCount)) {
            goodPosCount++;
        }

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

	return Promise.resolve(goodPosCount.toString());
}

function isPosValid(map: string[][], i: number, j: number): boolean {
	return acc(map, i, j) !== undefined;
}

function isPosGoodForObstacle(map: string[][], i: number, j: number, rotation: number): boolean {
	let iPos = map.findIndex((x) => x.includes('^'));
	let jPos = map[iPos].indexOf('^') + 1;
	let rotationCount = rotation;
	const stepMax = map.length * map[0].length;
	let stepCount = 0;

    const newMap = structuredClone(map);
    newMap[i][j] = "#"

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

/**
 * Access a two dim matrix securly
 */
function acc<T>(map: T[][], i: number, j: number): T {
	return (map[i] ?? [])[j];
}

function preprocessor(input: string): string[][] {
	return input.split('\n').map((line) => line.split(''));
}
