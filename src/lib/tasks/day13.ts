interface ClawMachine {
	buttonA: Coordinates;
	buttonB: Coordinates;
	prize: Coordinates;
}

interface Coordinates {
	x: number;
	y: number;
}

export async function task1(input: string): Promise<string> {
	const clawMachines = preprocessor(input);
	let sum = 0;

	for (const cm of clawMachines) {
		let winningCost = Number.MAX_VALUE;
		for (let i = 0; i < 101; i++) {
			for (let j = 0; j < 101; j++) {
				const y = cm.buttonA.y * i + cm.buttonB.y * j;
				const x = cm.buttonA.x * i + cm.buttonB.x * j;
				if (cm.prize.x === x && cm.prize.y === y) {
					const cost = i * 3 + j;
					if (cost < winningCost) {
						winningCost = cost;
					}
				}
			}
		}

		sum += Number.MAX_VALUE !== winningCost ? winningCost : 0;
	}

	return Promise.resolve(sum.toString());
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function task2(input: string): Promise<string> {
	// Sooo..., I know how to solve this one. There are three versions in my head how to solve this.
	// 1. Simple Vectorization: Making 2 vectors for x and y
	// 2. Semi-Vectorization: Making 3 dimonsional vectors for x, y and a machine dim.
	// 3. Full-Vectorization: Making 4 dimonsional vectors  for x, y, a machine dim. and a dim. for the pricing scale
	return Promise.resolve("Soooorrrrryyyyy. No solution for that one");
}

function preprocessor(input: string): ClawMachine[] {
	const clawMachineText = input.split('\n\n');

	return clawMachineText.map((clawMachineRows) => {
		const rows = clawMachineRows.split('\n');
		const buttonAResult = rows[0].match(/\d+/g);
		const buttonBResult = rows[1].match(/\d+/g);
		const prizeResult = rows[2].match(/\d+/g);

		return {
			buttonA: { x: Number(buttonAResult?.[0]), y: Number(buttonAResult?.[1]) },
			buttonB: { x: Number(buttonBResult?.[0]), y: Number(buttonBResult?.[1]) },
			prize: { x: Number(prizeResult?.[0]), y: Number(prizeResult?.[1]) }
		} as ClawMachine;
	});
}
