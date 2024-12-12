import { strToMat } from "./utils";

export async function task1(input: string): Promise<string> {
	const xmasMat = preprocessor(input);
	let counter = 0;
	const iLength = xmasMat.length;
	const jLength = xmasMat[0].length;

	for (let i = 0; i < iLength; i++) {
		for (let j = 0; j < jLength; j++) {
			if (xmasMat[i][j] === 'X') {
				// North
				if (
					2 < i &&
					xmasMat[i - 1][j] === 'M' &&
					xmasMat[i - 2][j] === 'A' &&
					xmasMat[i - 3][j] === 'S'
				) {
					counter++;
				}
				// North-East
				if (
					2 < i &&
					j < jLength - 3 &&
					xmasMat[i - 1][j + 1] === 'M' &&
					xmasMat[i - 2][j + 2] === 'A' &&
					xmasMat[i - 3][j + 3] === 'S'
				) {
					counter++;
				}
				// East
				if (
					j < jLength - 3 &&
					xmasMat[i][j + 1] === 'M' &&
					xmasMat[i][j + 2] === 'A' &&
					xmasMat[i][j + 3] === 'S'
				) {
					counter++;
				}
				// South-East
				if (
					j < jLength - 3 &&
					i < iLength - 3 &&
					xmasMat[i + 1][j + 1] === 'M' &&
					xmasMat[i + 2][j + 2] === 'A' &&
					xmasMat[i + 3][j + 3] === 'S'
				) {
					counter++;
				}
				// South
				if (
					i < iLength - 3 &&
					xmasMat[i + 1][j] === 'M' &&
					xmasMat[i + 2][j] === 'A' &&
					xmasMat[i + 3][j] === 'S'
				) {
					counter++;
				}
				// South-West
				if (
					i < iLength - 3 &&
					2 < j &&
					xmasMat[i + 1][j - 1] === 'M' &&
					xmasMat[i + 2][j - 2] === 'A' &&
					xmasMat[i + 3][j - 3] === 'S'
				) {
					counter++;
				}
				// West
				if (
					2 < j &&
					xmasMat[i][j - 1] === 'M' &&
					xmasMat[i][j - 2] === 'A' &&
					xmasMat[i][j - 3] === 'S'
				) {
					counter++;
				}
				// North-West
				if (
					2 < j &&
					2 < i &&
					xmasMat[i - 1][j - 1] === 'M' &&
					xmasMat[i - 2][j - 2] === 'A' &&
					xmasMat[i - 3][j - 3] === 'S'
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

	for (let i = 1; i < xmasMat.length - 1; i++) {
		for (let j = 1; j < xmasMat[0].length - 1; j++) {
			if (xmasMat[i][j] === 'A') {
				// M.S
				// .A.
				// M.S
				if (
					xmasMat[i - 1][j - 1] === 'M' &&
					xmasMat[i - 1][j + 1] === 'S' &&
					xmasMat[i + 1][j - 1] === 'M' &&
					xmasMat[i + 1][j + 1] === 'S'
				) {
					counter++;
				}
				// M.M
				// .A.
				// S.S
				if (
					xmasMat[i - 1][j - 1] === 'M' &&
					xmasMat[i - 1][j + 1] === 'M' &&
					xmasMat[i + 1][j - 1] === 'S' &&
					xmasMat[i + 1][j + 1] === 'S'
				) {
					counter++;
				}
				// S.M
				// .A.
				// S.M
				if (
					xmasMat[i - 1][j - 1] === 'S' &&
					xmasMat[i - 1][j + 1] === 'M' &&
					xmasMat[i + 1][j - 1] === 'S' &&
					xmasMat[i + 1][j + 1] === 'M'
				) {
					counter++;
				}
				// S.S
				// .A.
				// M.M
				if (
					xmasMat[i - 1][j - 1] === 'S' &&
					xmasMat[i - 1][j + 1] === 'S' &&
					xmasMat[i + 1][j - 1] === 'M' &&
					xmasMat[i + 1][j + 1] === 'M'
				) {
					counter++;
				}
			}
		}
	}

	return Promise.resolve(counter.toString());
}

const preprocessor = strToMat;
