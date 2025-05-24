interface Robot {
	cords: Coordinates;
	velocity: Coordinates;
}

interface Coordinates {
	x: number;
	y: number;
}

const roomSize: Coordinates = { x: 101, y: 103 };

export async function task1(input: string): Promise<string> {
	const robots = preprocessor(input);

	for (let i = 0; i < 100; i++) {
		moveOneTick(robots);
	}

	return Promise.resolve(calcSafetyFactor(robots).toString());
}

export async function task2(input: string): Promise<string> {
	const robots = preprocessor(input);

	for (let i = 1; i < 100000; i++) {
		moveOneTick(robots);
		if (paintMap(robots).includes('*********************************')) {
			return Promise.resolve(i.toString());
		}
	}

	return Promise.resolve('Solution not found');
}

function paintMap(robots: Robot[]): string {
	let map: string = '';
	for (let x = 0; x < roomSize.x; x++) {
		for (let y = 0; y < roomSize.y; y++) {
			const robNumber = robots.filter((r) => r.cords.x === x && r.cords.y === y).length;
			map += robNumber !== 0 ? '*' : ' ';
		}
		map += '\n';
	}
	return map;
}

function calcSafetyFactor(robots: Robot[]): number {
	const quadrant1 = robots.filter(
		(r) => r.cords.x < (roomSize.x - 1) / 2 && r.cords.y < (roomSize.y - 1) / 2
	).length;
	const quadrant2 = robots.filter(
		(r) => (roomSize.x - 1) / 2 < r.cords.x && r.cords.y < (roomSize.y - 1) / 2
	).length;
	const quadrant3 = robots.filter(
		(r) => r.cords.x < (roomSize.x - 1) / 2 && (roomSize.y - 1) / 2 < r.cords.y
	).length;
	const quadrant4 = robots.filter(
		(r) => (roomSize.x - 1) / 2 < r.cords.x && (roomSize.y - 1) / 2 < r.cords.y
	).length;

	return quadrant1 * quadrant2 * quadrant3 * quadrant4;
}

function moveOneTick(robots: Robot[]): Robot[] {
	for (const rob of robots) {
		// move
		rob.cords.x += rob.velocity.x;
		rob.cords.y += rob.velocity.y;

		// teleport
		if (roomSize.x <= rob.cords.x) {
			rob.cords.x %= roomSize.x;
		}
		if (roomSize.y <= rob.cords.y) {
			rob.cords.y %= roomSize.y;
		}
		if (rob.cords.x < 0) {
			rob.cords.x += roomSize.x;
		}
		if (rob.cords.y < 0) {
			rob.cords.y += roomSize.y;
		}
	}
	return robots;
}

function preprocessor(input: string): Robot[] {
	const robotTexts = input.split('\n').filter((l) => l !== '');

	return robotTexts.map((robotTxt) => {
		const [cordTxt, velTxt] = robotTxt.split(' ');
		const cordNums = cordTxt.replace('p=', '').split(',');
		const velNums = velTxt.replace('v=', '').split(',');
		return {
			cords: { x: Number(cordNums?.[0]), y: Number(cordNums?.[1]) },
			velocity: { x: Number(velNums?.[0]), y: Number(velNums?.[1]) }
		} as Robot;
	});
}
