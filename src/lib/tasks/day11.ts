export async function task1(input: string): Promise<string> {
	let stones = input.split(' ').map(BigInt);

	for (let i = 0; i < 25; i++) {
		stones = executeRules(stones);
	}

	return Promise.resolve(stones.length.toString());
}

export async function task2(input: string): Promise<string> {
	const stones = input.split(' ').map(BigInt);
  let count = 0;

  for await (const stone of stones) {
    let sepStone = [stone];
    console.count('Stone');
    for (let i = 0; i < 75; i++) {
      console.count('  Iterations');

      sepStone = executeRules(sepStone);
      console.log('  Stone count:', sepStone.length);
    }
    count += sepStone.length;
  }
	return Promise.resolve(count.toString());
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
