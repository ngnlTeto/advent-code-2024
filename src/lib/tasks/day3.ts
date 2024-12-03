export async function task1(input: string): Promise<string> {
	let sum = 0;
	const mulArray = input.match(/mul\(\d{1,3},\d{1,3}\)/gm)!;

	for (let i = 0; i < mulArray.length; i++) {
		sum += multiplyMulStatement(mulArray[i]);
	}
	return Promise.resolve(sum.toString());
}

export async function task2(input: string): Promise<string> {
	let sum = 0;
	const mulArray = input.match(/(?:(?:mul\(\d{1,3},\d{1,3}\))|(?:do\(\))|(?:don't\(\)))/gm)!;
	let processingActive = true;

	for (let i = 0; i < mulArray.length; i++) {
		switch (mulArray[i]) {
			case "don't()":
				processingActive = false;
				break;

			case 'do()':
				processingActive = true;
				break;

			default:
				if (processingActive) {
					sum += multiplyMulStatement(mulArray[i]);
				}
				break;
		}
	}
	return Promise.resolve(sum.toString());
}

function multiplyMulStatement(mulStatement: string): number {
	mulStatement = mulStatement.replace('mul(', '');
	mulStatement = mulStatement.replace(')', '');
	const mulNums = mulStatement.split(',').map(Number);
	return mulNums.at(0)! * mulNums.at(1)!;
}
