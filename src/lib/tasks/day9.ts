enum BlockTypes {
	Free,
	File
}
interface Block {
	id: number | null;
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
	for (let i = 0; i < discMap.length; i++) {
		if (i % 2 === 0) {
			blocks.push({ id: i / 2, space: discMap[i], type: BlockTypes.File });
		} else {
			blocks.push({ id: null, space: discMap[i], type: BlockTypes.Free });
		}
	}

	outerloop: for (let i = blocks.length - 1; 0 <= i; i--) {
		const block = blocks[i];
		if (block.type === BlockTypes.File) {
			for (let j = 0; j < i; j++) {
				if (blocks[j].type === BlockTypes.Free && block.space <= blocks[j].space) {
					// removes block from the back
					blocks.splice(i, 1, { id: null, space: blocks[i].space, type: BlockTypes.Free });

					// removes free space
					blocks[j].space -= block.space;

					if (blocks[j].space === 0) {
						// replaces empty space block
						blocks[j] = block;
					} else {
						// add block to the front
						blocks.splice(j, 0, block);
					}

					continue outerloop;
				}
			}
		}
	}

	let checksum = BigInt(0);
	let id = 0;
	for (const block of blocks) {
		if (block.type === BlockTypes.File) {
			for (let i = 0; i < block.space; i++) {
				checksum += BigInt(block.id as number) * BigInt(id);
				id++;
			}
		} else {
			for (let i = 0; i < block.space; i++) {
				id++;
			}
		}
	}
	return Promise.resolve(checksum.toString());
}
