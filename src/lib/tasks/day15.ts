enum WarehouseItem {
	ROBOT,
	SPACE,
	BOX,
	WALL
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
	const preprocessorResults = preprocessor(input, false);
	const map = preprocessorResults.map as WarehouseMap;
	const instructions = preprocessorResults.instructions;

	for (const instruction of instructions) {
		const robotCroods = findRobot(map);
		moveItem(map, instruction, robotCroods);
		// console.log(drawMap(map));
		// await sleep(100);
	}
	return Promise.resolve(calcScore(map).toString());
}

export async function task2(input: string): Promise<string> {}

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

	if (map[nextCoords.y][nextCoords.x] === WarehouseItem.BOX) {
		const movePossible = moveItem(map, direction, nextCoords);
		if (movePossible) {
			map[nextCoords.y][nextCoords.x] = map[coords.y][coords.x];
			map[coords.y][coords.x] = WarehouseItem.SPACE;
			return true;
		} else {
			return false;
		}
	}

	switch (map[nextCoords.y][nextCoords.x]) {
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
			if (tile === WarehouseItem.BOX) {
				boxCoords.push({ x: j, y: i });
			}
		}
	}

	return boxCoords.map((x) => calcGpsScore(x)).reduce((sum, x) => (sum += x), 0);
}

function preprocessor(
	input: string,
	rawMap: boolean
): { map: WarehouseMap | string; instructions: Direction[] } {
	const [mapString, instructionString] = input.split('\n\n');

	// build map
	let map: WarehouseMap | string = [];
	if (rawMap) {
		map = mapString;
	} else {
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
					default:
						throw Error('Bad map input');
				}
			});
			map.push(warehouseRow);
		}
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
// 		}
// 	}

// 	return map.reduce(
// 		(aggr, row) => `${aggr}${row.reduce((aggr2, x) => `${aggr2}${itemToString(x)}`, '')}\n`,
// 		''
// 	);
// }
