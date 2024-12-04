export async function task1(input: string): Promise<string> {
	const xmasMat = preprocessor(input);
	let counter = 0;

	const xLength = xmasMat.length;
	const yLength = xmasMat.at(0)!.length;
	const summax = xLength + yLength - 1;

	// horizontal
	for (let i = 0; i < xLength; i++) {
		let forwardLine = '';
		for (let j = 0; j < yLength; j++) {
			forwardLine += xmasMat[i][j];
		}
		counter += matchXmas(forwardLine).length;

		let backwardLine = '';
		for (let j = yLength - 1; 0 <= j; j--) {
			backwardLine += xmasMat[i][j];
		}
		counter += matchXmas(backwardLine).length;
	}

	// vertical
	for (let i = 0; i < yLength; i++) {
		let forwardLine = '';
		for (let j = 0; j < xLength; j++) {
			forwardLine += xmasMat[j][i];
		}
		counter += matchXmas(forwardLine).length;

		let backwardLine = '';
		for (let j = xLength - 1; 0 <= j; j--) {
			backwardLine += xmasMat[j][i];
		}
		counter += matchXmas(backwardLine).length;
	}

	// #region diagonal

	// 45° rotate and evaluation
	const rotated45: string[][] = [];
	for (let i = 0; i < summax; i++) rotated45.push([]);
	for (let j = 0; j < xmasMat[0].length; j++)
		for (let i = 0; i < xmasMat.length; i++) rotated45[i + j].push(xmasMat[i][j]);

	for (let i = 0; i < rotated45.length; i++) {
		let forwardLine = '';
		for (let j = 0; j < rotated45[i].length; j++) {
			forwardLine += rotated45[i][j];
		}
		counter += matchXmas(forwardLine).length;

		let backwardLine = '';
		for (let j = rotated45[i].length - 1; 0 <= j; j--) {
			backwardLine += rotated45[i][j];
		}
		counter += matchXmas(backwardLine).length;
	}

	// 315° rotate and evaluation
	const rotated315: string[][] = [];
	for (let i = 0; i < summax; i++) rotated315.push([]);

	for (let i = xmasMat.length - 1; 0 <= i; i--)
		for (let j = 0; j < xmasMat[0].length; j++) rotated315[(xmasMat.length - 1- i) + j].push(xmasMat[i][j]);

	for (let i = 0; i < rotated315.length; i++) {
		let forwardLine = '';
		for (let j = 0; j < rotated315[i].length; j++) {
			forwardLine += rotated315[i][j];
		}
		counter += matchXmas(forwardLine).length;

		let backwardLine = '';
		for (let j = rotated315[i].length - 1; 0 <= j; j--) {
			backwardLine += rotated315[i][j];
		}
		counter += matchXmas(backwardLine).length;
	}


	//#endregion

	return Promise.resolve(counter.toString());
}

export async function task2(input: string): Promise<string> {}

function preprocessor(input: string): string[][] {
	return input.split('\n').map((l) => l.split(''));
}

function matchXmas(input: string): string[] {
	return input.match(/XMAS/gm) || [];
}

function logMatrix(matrix: string[][]): void {
	const lines: string[] = [];
	for (const col of matrix) {
		lines.push(col.reduce((acc, line) => `${acc} ${line}`));
	}
	console.log(lines.reduce((acc, line) => `${acc}\n${line}`));
}
