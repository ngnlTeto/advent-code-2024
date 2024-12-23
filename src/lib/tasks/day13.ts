interface ClawMachine {
	a: Coordinates;
	b: Coordinates;
	sol: Coordinates;
}

interface Coordinates {
	x: number;
	y: number;
}

export async function task1(input: string): Promise<string> {
	const clawMachines = preprocessor(input);

	const solution = calcMachines(clawMachines);

	return Promise.resolve(solution.toString());
}

export async function task2(input: string): Promise<string> {
	const clawMachines = preprocessor(input);

	clawMachines.forEach((cm) => {
		cm.sol.x += 10000000000000;
		cm.sol.y += 10000000000000;
	});

	const solution = calcMachines(clawMachines);

	return Promise.resolve(solution.toString());
}

function preprocessor(input: string): ClawMachine[] {
	const clawMachineText = input.split('\n\n');

	return clawMachineText.map((clawMachineRows) => {
		const rows = clawMachineRows.split('\n');
		const buttonAResult = rows[0].match(/\d+/g);
		const buttonBResult = rows[1].match(/\d+/g);
		const prizeResult = rows[2].match(/\d+/g);

		return {
			a: { x: Number(buttonAResult?.[0]), y: Number(buttonAResult?.[1]) },
			b: { x: Number(buttonBResult?.[0]), y: Number(buttonBResult?.[1]) },
			sol: { x: Number(prizeResult?.[0]), y: Number(prizeResult?.[1]) }
		} as ClawMachine;
	});
}

function calcMachines(clawMachines: ClawMachine[]): number {
	let sum = 0;

	for (const cm of clawMachines) {
		const bPresses = (cm.a.x * cm.sol.y - cm.sol.x * cm.a.y) / (cm.a.x * cm.b.y - cm.b.x * cm.a.y);
		const aPresses = (cm.sol.y - bPresses * cm.b.y) / cm.a.y;

		if (Number.isInteger(aPresses) && Number.isInteger(bPresses)) {
			sum += aPresses * 3 + bPresses;
		}
	}
	return sum;
}
