enum BlockTypes {
	Free,
	File
}
interface Block {
	id: number;
	space: number;
	type: BlockTypes;
}

export async function task1(input: string): Promise<string> {
	const discMap = input.split('').map(Number);

	const fileBlocks: (string | number)[] = [];
	for (let i = 0; i < discMap.length; i++) {
		if (i % 2 === 0) {
			const id = i / 2;
			for (let j = 0; j < discMap[i]; j++) {
				fileBlocks.push(id);
			}
		} else {
			for (let j = 0; j < discMap[i]; j++) {
				fileBlocks.push('.');
			}
		}
	}

	const defragedFileBlocks: number[] = [];
	let left = 0;
	let right = fileBlocks.length;

	while (left < right) {
		if (fileBlocks[left] !== '.') {
			defragedFileBlocks.push(fileBlocks[left] as number);
			left++;
		} else {
			right--;
			if (fileBlocks[right] !== '.') {
				left++;
				defragedFileBlocks.push(fileBlocks[right] as number);
			}
		}
	}

	let checksum = BigInt(0);
	for (let i = 0; i < defragedFileBlocks.length; i++) {
		const block = defragedFileBlocks[i];
		checksum += BigInt(i) * BigInt(block);
	}
	return Promise.resolve(checksum.toString());
}

export async function task2(input: string): Promise<string> {
	const discMap = input.split('').map(Number);
	const blocks: Block[] = [];
}

