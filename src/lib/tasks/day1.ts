export async function task1(input: string): Promise<string> {
	const idLists = preprocessor(input);

	idLists.idList1.sort((a, b) => a - b);
	idLists.idList2.sort((a, b) => a - b);

	const diffList: number[] = [];
	for (let i = 0; i < idLists.idList1.length; i++) {
		diffList.push(Math.abs(idLists.idList1[i] - idLists.idList2[i]));
	}

	const result = diffList.reduce((partial, a) => partial + a, 0).toString();

	return Promise.resolve(result);
}

export async function task2(input: string): Promise<string> {
	const idLists = preprocessor(input);

	idLists.idList1.sort((a, b) => a - b);
	idLists.idList2.sort((a, b) => a - b);
	const { idList1, idList2 } = idLists;

	let similarityCount: number = 0;
	let left = 0;
	let right = 0;
	let count = 0;
	while (left < idList1.length - 1) {
		if (idList1[left] === idList2[right]) {
			count++;
			right++;
		} else if (idList1[left] > idList2[right]) {
			right++;
		} else if (idList1[left] < idList2[right]) {
			similarityCount += idList1[left] * count;
			count = 0;
			left++;
		}
	}
	return Promise.resolve(similarityCount.toString());
}

function preprocessor(input: string): { idList1: number[]; idList2: number[] } {
	const lines = input.split('\n');

	const outputList1: number[] = [];
	const outputList2: number[] = [];
	for (let i = 0; i < lines.length; i++) {
		const lineNums = lines[i].split('   ');
		outputList1.push(Number(lineNums[0]));
		outputList2.push(Number(lineNums[1]));
	}
	return { idList1: outputList1, idList2: outputList2 };
}
