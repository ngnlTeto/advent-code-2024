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
	const fileBlocks = discMapToFileBlocks(discMap);
	const defragedFileBlocks = defragFileBlocks(fileBlocks);
	const checksum = calcChecksum(defragedFileBlocks);
	return Promise.resolve(checksum);
}

export async function task2(input: string): Promise<string> {
	const discMap = input.split('').map(Number);
	const blocks: Block[] = [];
}

//#region task 1 methods
function discMapToFileBlocks(discMap: number[]): (string | number)[] {
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
	return fileBlocks;
}

function defragFileBlocks(fileBlocks: (string | number)[]): number[] {
	const returnBlocks: number[] = [];
	let left = 0;
	let right = fileBlocks.length;

	while (left < right) {
		if (fileBlocks[left] !== '.') {
			returnBlocks.push(fileBlocks[left] as number);
			left++;
		} else {
			right--;
			if (fileBlocks[right] !== '.') {
				left++;
				returnBlocks.push(fileBlocks[right] as number);
			}
		}
	}
	return returnBlocks;
}

function calcChecksum(fileBlocks: number[]): string {
	let checksum = BigInt(0);
	for (let i = 0; i < fileBlocks.length; i++) {
		const block = fileBlocks[i];
		checksum += BigInt(i) * BigInt(block);
	}
	return checksum.toString();
}
//#endregion
