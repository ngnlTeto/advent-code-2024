export async function task1(input: string): Promise<string> {
	const xmasMat = preprocessor(input);
	let counter = 0;

	for (let i = 0; i < xmasMat.length; i++) {
		for (let j = 0; j < xmasMat[0].length; j++) {
			if (xmasMat[i][j] === 'X') {
				// North
				if (
					(xmasMat[i - 1] ?? [])[j] === 'M' &&
					(xmasMat[i - 2] ?? [])[j] === 'A' &&
					(xmasMat[i - 3] ?? [])[j] === 'S'
				) {
					counter++;
				}
				// North-East
				if (
					(xmasMat[i - 1] ?? [])[j + 1] === 'M' &&
					(xmasMat[i - 2] ?? [])[j + 2] === 'A' &&
					(xmasMat[i - 3] ?? [])[j + 3] === 'S'
				) {
					counter++;
				}
				// East
				if (
					(xmasMat[i] ?? [])[j + 1] === 'M' &&
					(xmasMat[i] ?? [])[j + 2] === 'A' &&
					(xmasMat[i] ?? [])[j + 3] === 'S'
				) {
					counter++;
				}
				// South-East
				if (
					(xmasMat[i + 1] ?? [])[j + 1] === 'M' &&
					(xmasMat[i + 2] ?? [])[j + 2] === 'A' &&
					(xmasMat[i + 3] ?? [])[j + 3] === 'S'
				) {
					counter++;
				}
				// South
				if (
					(xmasMat[i + 1] ?? [])[j] === 'M' &&
					(xmasMat[i + 2] ?? [])[j] === 'A' &&
					(xmasMat[i + 3] ?? [])[j] === 'S'
				) {
					counter++;
				}
				// South-West
				if (
					(xmasMat[i + 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i + 2] ?? [])[j - 2] === 'A' &&
					(xmasMat[i + 3] ?? [])[j - 3] === 'S'
				) {
					counter++;
				}
				// West
				if (
					(xmasMat[i] ?? [])[j - 1] === 'M' &&
					(xmasMat[i] ?? [])[j - 2] === 'A' &&
					(xmasMat[i] ?? [])[j - 3] === 'S'
				) {
					counter++;
				}
				// North-West
				if (
					(xmasMat[i - 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i - 2] ?? [])[j - 2] === 'A' &&
					(xmasMat[i - 3] ?? [])[j - 3] === 'S'
				) {
					counter++;
				}
			}
		}
	}

	return Promise.resolve(counter.toString());
}

export async function task2(input: string): Promise<string> {
	const xmasMat = preprocessor(input);
	let counter = 0;

	for (let i = 0; i < xmasMat.length; i++) {
		for (let j = 0; j < xmasMat[0].length; j++) {
			if (xmasMat[i][j] === 'A') {
				// M.S
				// .A.
				// M.S
				if (
					(xmasMat[i - 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i - 1] ?? [])[j + 1] === 'S' &&
					(xmasMat[i + 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i + 1] ?? [])[j + 1] === 'S'
				) {
					counter++;
				}
				// M.M
				// .A.
				// S.S
				if (
					(xmasMat[i - 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i - 1] ?? [])[j + 1] === 'M' &&
					(xmasMat[i + 1] ?? [])[j - 1] === 'S' &&
					(xmasMat[i + 1] ?? [])[j + 1] === 'S'
				) {
					counter++;
				}
				// S.M
				// .A.
				// S.M
				if (
					(xmasMat[i - 1] ?? [])[j - 1] === 'S' &&
					(xmasMat[i - 1] ?? [])[j + 1] === 'M' &&
					(xmasMat[i + 1] ?? [])[j - 1] === 'S' &&
					(xmasMat[i + 1] ?? [])[j + 1] === 'M'
				) {
					counter++;
				}
				// S.S
				// .A.
				// M.M
				if (
					(xmasMat[i - 1] ?? [])[j - 1] === 'S' &&
					(xmasMat[i - 1] ?? [])[j + 1] === 'S' &&
					(xmasMat[i + 1] ?? [])[j - 1] === 'M' &&
					(xmasMat[i + 1] ?? [])[j + 1] === 'M'
				) {
					counter++;
				}
			}
		}
	}

	return Promise.resolve(counter.toString());
}

function preprocessor(input: string): string[][] {
	return input.split('\n').map((l) => l.split(''));
}
