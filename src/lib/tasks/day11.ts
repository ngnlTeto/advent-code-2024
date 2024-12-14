const cacheMap: Map<string, bigint> = new Map();

export async function task1(input: string): Promise<string> {
	const stones = input.split(' ').map(BigInt);

	let count = 0n;
	for (const stone of stones) {
		count += countStones(stone, 25);
	}

	return Promise.resolve(count.toString());
}

export async function task2(input: string): Promise<string> {
	const stones = input.split(' ').map(BigInt);

	let count = 0n;
	for (const stone of stones) {
		count += countStones(stone, 75);
	}

	return Promise.resolve(count.toString());
}

function countStones(stone: bigint, maxDepth: number): bigint {
	if (maxDepth === 0) {
		return 1n;
	}

	if (cacheMap.has(`${stone}|${maxDepth}`)) {
		return cacheMap.get(`${stone}|${maxDepth}`)!;
	}

	if (stone === 0n) {
		const result = countStones(1n, maxDepth - 1);
		cacheMap.set(`${stone}|${maxDepth}`, result);
		return result;
	}

	if (stone.toString().length % 2 !== 0) {
		const result = countStones(stone * 2024n, maxDepth - 1);
		cacheMap.set(`${stone}|${maxDepth}`, result);
		return result;
	}

	const num1 = BigInt(stone.toString().substring(0, stone.toString().length / 2));
	const num2 = BigInt(
		stone.toString().substring(stone.toString().length / 2, stone.toString().length)
	);

	const result = countStones(num1, maxDepth - 1) + countStones(num2, maxDepth - 1);
	cacheMap.set(`${stone}|${maxDepth}`, result);
	return result
}
