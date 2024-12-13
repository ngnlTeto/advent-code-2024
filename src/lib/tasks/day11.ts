const markovMap: Map<bigint, { firstVal: bigint; secondVal?: bigint }> = new Map();

export async function task1(input: string): Promise<string> {
	let stones = input.split(' ').map(BigInt);

	for (let i = 0; i < 25; i++) {
		stones = executeRules(stones);
	}

	return Promise.resolve(stones.length.toString());
}

export async function task2(input: string): Promise<string> {
	const stones = input.split(' ').map(BigInt);
	const iterations = 75;

	// Build markovChain
	for await (const stone of stones) {
		resolveStoneToMarkovChain(stone, iterations);
	}

	let count = 0n;
	for (const stone of stones) {
		count += stoneCount(stone, iterations);
		console.log('Done: ', stone);
	}

	return Promise.resolve(count.toString());
}

function resolveStoneToMarkovChain(stone: bigint, maxDepth: number, curDepth: number = 0): void {
	let newTupel: { firstVal: bigint; secondVal?: bigint };

	// Rule #1
	if (stone === 0n) {
		newTupel = { firstVal: 1n };
	}

	// Rule #2
	if (stone.toString().length % 2 === 0) {
		const stoneStr = stone.toString();
		newTupel = {
			firstVal: BigInt(stoneStr.substring(0, stoneStr.length / 2)),
			secondVal: BigInt(stoneStr.substring(stoneStr.length / 2, stoneStr.length))
		};
	} else {
		// Rule #3
		newTupel = { firstVal: stone * 2024n };
	}

	markovMap.set(stone, newTupel);
	if (!markovMap.has(newTupel.firstVal) && curDepth < maxDepth) {
		resolveStoneToMarkovChain(newTupel.firstVal, maxDepth, curDepth + 1);
	}
	if (
		newTupel.secondVal !== undefined &&
		!markovMap.has(newTupel.secondVal) &&
		curDepth < maxDepth
	) {
		resolveStoneToMarkovChain(newTupel.secondVal, maxDepth, curDepth + 1);
	}
}

function stoneCount(stone: bigint, maxDepth: number, curDepth: number = 0): bigint {
	if (!(curDepth < maxDepth)) {
		return 1n;
	}

	const results = markovMap.get(stone);
	let count = 0n;

	count += stoneCount(results!.firstVal, maxDepth, curDepth + 1);
	if (results?.secondVal !== undefined) {
		count += stoneCount(results!.secondVal, maxDepth, curDepth + 1);
	}

	return count;
}

function executeRules(stones: bigint[]): bigint[] {
	const newStones: bigint[] = [];
	for (const stone of stones) {
		// Rule #1
		if (stone === 0n) {
			newStones.push(1n);
		} else {
			// Rule #2
			if (stone.toString().length % 2 === 0) {
				const stoneStr = stone.toString();
				newStones.push(BigInt(stoneStr.substring(0, stoneStr.length / 2)));
				newStones.push(BigInt(stoneStr.substring(stoneStr.length / 2, stoneStr.length)));
			} else {
				// Rule #3
				newStones.push(stone * 2024n);
			}
		}
	}
	return newStones;
}
