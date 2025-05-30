enum WarehouseItem {
	ROBOT,
	SPACE,
	BOX,
	WALL,
	LEFT_WALL,
	RIGHT_WALL
}

type WarehouseMap = WarehouseItem[][];

enum Direction {
	UP,
	RIGHT,
	DOWN,
	LEFT
}

interface Coordinates {
	x: number;
	y: number;
}

export async function task1(input: string): Promise<string> {
	const { map, instructions } = preprocessor(input);

	for (const instruction of instructions) {
		const robotCroods = findRobot(map);
		moveItem(map, instruction, robotCroods);
		// console.log(drawMap(map));
		// await sleep(100);
	}
	return Promise.resolve(calcScore(map).toString());
}

export async function task2(input: string): Promise<string> {
	const inputWithBiggerMap = input
		.replaceAll('#', '##')
		.replaceAll('O', '[]')
		.replaceAll('.', '..')
		.replaceAll('@', '@.');
	const { map, instructions } = preprocessor(inputWithBiggerMap);

	for (const instruction of instructions) {
		const robotCroods = findRobot(map);
		moveItem(map, instruction, robotCroods);
		// console.log(drawMap(map));
		// await sleep(100);
	}
	return Promise.resolve(calcScore(map).toString());
}

// The return value determins if the move was possible
function moveItem(map: WarehouseMap, direction: Direction, coords: Coordinates): boolean {
	const nextCoords = (() => {
		switch (direction) {
			case Direction.UP:
				return { x: coords.x, y: coords.y - 1 } as Coordinates;
			case Direction.RIGHT:
				return { x: coords.x + 1, y: coords.y } as Coordinates;
			case Direction.DOWN:
				return { x: coords.x, y: coords.y + 1 } as Coordinates;
			case Direction.LEFT:
				return { x: coords.x - 1, y: coords.y } as Coordinates;
		}
	})();

	switch (map[nextCoords.y][nextCoords.x]) {
		case WarehouseItem.LEFT_WALL:
		case WarehouseItem.RIGHT_WALL:
		case WarehouseItem.BOX: {
			if (
				(map[nextCoords.y][nextCoords.x] === WarehouseItem.LEFT_WALL ||
					map[nextCoords.y][nextCoords.x] === WarehouseItem.RIGHT_WALL) &&
				(direction === Direction.UP || direction === Direction.DOWN)
			) {
				// a bit complex...
				const box1Cords = nextCoords;
				const box2Cords: Coordinates =
					map[nextCoords.y][nextCoords.x] === WarehouseItem.LEFT_WALL
						? { x: nextCoords.x + 1, y: nextCoords.y }
						: { x: nextCoords.x - 1, y: nextCoords.y };

				const mapBackup = structuredClone(map);

				// try move
				const movePossible =
					moveItem(map, direction, box1Cords) && moveItem(map, direction, box2Cords);

				if (movePossible) {
					map[nextCoords.y][nextCoords.x] = map[coords.y][coords.x];
					map[coords.y][coords.x] = WarehouseItem.SPACE;
					return true;
				} else {
					// restore backup
					for (let y = 0; y < map.length; y++) {
						for (let x = 0; x < map[y].length; x++) {
							map[y][x] = mapBackup[y][x];
						}
					}
					return false;
				}
			} else {
				const movePossible = moveItem(map, direction, nextCoords);
				if (movePossible) {
					map[nextCoords.y][nextCoords.x] = map[coords.y][coords.x];
					map[coords.y][coords.x] = WarehouseItem.SPACE;
					return true;
				} else {
					return false;
				}
			}
		}
		case WarehouseItem.SPACE:
			map[nextCoords.y][nextCoords.x] = map[coords.y][coords.x];
			map[coords.y][coords.x] = WarehouseItem.SPACE;
			return true;
		case WarehouseItem.WALL:
			return false;
	}
	throw new Error("Robot can't be pushed");
}

function findRobot(map: WarehouseMap): Coordinates {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const tile = map[i][j];
			if (tile === WarehouseItem.ROBOT) {
				return { x: j, y: i };
			}
		}
	}
	throw new Error('Robot not found');
}

function calcScore(map: WarehouseMap): number {
	function calcGpsScore(coords: Coordinates): number {
		return coords.y * 100 + coords.x;
	}

	const boxCoords: Coordinates[] = [];
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			const tile = map[i][j];
			if (tile === WarehouseItem.BOX || tile === WarehouseItem.LEFT_WALL) {
				boxCoords.push({ x: j, y: i });
			}
		}
	}

	return boxCoords.map((x) => calcGpsScore(x)).reduce((sum, x) => (sum += x), 0);
}

function preprocessor(input: string): { map: WarehouseMap; instructions: Direction[] } {
	const [mapString, instructionString] = input.split('\n\n');

	// build map
	const map: WarehouseMap = [];

	for (const mapRow of mapString.split('\n')) {
		const warehouseRow = mapRow.split('').map((tile) => {
			switch (tile) {
				case '#':
					return WarehouseItem.WALL;
				case '.':
					return WarehouseItem.SPACE;
				case 'O':
					return WarehouseItem.BOX;
				case '@':
					return WarehouseItem.ROBOT;
				case '[':
					return WarehouseItem.LEFT_WALL;
				case ']':
					return WarehouseItem.RIGHT_WALL;
				default:
					throw Error('Bad map input');
			}
		});
		map.push(warehouseRow);
	}

	// build instructions
	const instructions = instructionString
		.split('')
		.filter((i) => i !== '\n')
		.map((instruction) => {
			switch (instruction) {
				case '^':
					return Direction.UP;
				case '>':
					return Direction.RIGHT;
				case 'v':
					return Direction.DOWN;
				case '<':
					return Direction.LEFT;
				default:
					throw Error('Bad instruction input');
			}
		});
	return { map, instructions };
}

// const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));
// function drawMap(map: WarehouseMap): string {
// 	function itemToString(item: WarehouseItem): string {
// 		switch (item) {
// 			case WarehouseItem.ROBOT:
// 				return '@';
// 			case WarehouseItem.SPACE:
// 				return '.';
// 			case WarehouseItem.BOX:
// 				return 'O';
// 			case WarehouseItem.WALL:
// 				return '#';
// 			case WarehouseItem.LEFT_WALL:
// 				return '[';
// 			case WarehouseItem.RIGHT_WALL:
// 				return ']';
// 		}
// 	}

// 	return map.reduce(
// 		(aggr, row) => `${aggr}${row.reduce((aggr2, x) => `${aggr2}${itemToString(x)}`, '')}\n`,
// 		''
// 	);
// }
