import { acc, strToMat } from './utils';

type Pos = { i: number; j: number };

export async function task1(input: string): Promise<string> {
	const mat = preprocessor(input).map((x) => x.map(Number));
	let sum = 0;

	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[i].length; j++) {
			if (mat[i][j] === 0) {
				const peaks = getRoutePeaks(mat, { i, j });

				const alreadVisited: string[] = [];
				const uniquePeaks = peaks.filter((peak) => {
					if (!alreadVisited.includes(`${peak.i}|${peak.j}`)) {
						alreadVisited.push(`${peak.i}|${peak.j}`);
						return true;
					}
					return false;
				});

				sum += uniquePeaks.length;
			}
		}
	}
	return sum.toString();
}
export async function task2(input: string): Promise<string> {
	const mat = preprocessor(input).map((x) => x.map(Number));
	let sum = 0;

	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[i].length; j++) {
			if (mat[i][j] === 0) {
				sum += getRouteCount(mat, { i, j });
			}
		}
	}
	return sum.toString();
}

function getRoutePeaks(mat: number[][], pos: Pos): Pos[] {
	if (acc(mat, pos.i, pos.j) === 9) {
		return [pos];
	}

	const peaks: Pos[] = [];

	if (acc(mat, pos.i - 1, pos.j) === acc(mat, pos.i, pos.j) + 1) {
		peaks.push(...getRoutePeaks(mat, { i: pos.i - 1, j: pos.j }));
	}
	if (acc(mat, pos.i, pos.j - 1) === acc(mat, pos.i, pos.j) + 1) {
		peaks.push(...getRoutePeaks(mat, { i: pos.i, j: pos.j - 1 }));
	}
	if (acc(mat, pos.i + 1, pos.j) === acc(mat, pos.i, pos.j) + 1) {
		peaks.push(...getRoutePeaks(mat, { i: pos.i + 1, j: pos.j }));
	}
	if (acc(mat, pos.i, pos.j + 1) === acc(mat, pos.i, pos.j) + 1) {
		peaks.push(...getRoutePeaks(mat, { i: pos.i, j: pos.j + 1 }));
	}

	return peaks;
}

function getRouteCount(mat: number[][], pos: { i: number; j: number }): number {
	if (acc(mat, pos.i, pos.j) === 9) {
		return 1;
	}

	let sum = 0;

	sum +=
		acc(mat, pos.i - 1, pos.j) === acc(mat, pos.i, pos.j) + 1
			? getRouteCount(mat, { i: pos.i - 1, j: pos.j })
			: 0;
	sum +=
		acc(mat, pos.i, pos.j - 1) === acc(mat, pos.i, pos.j) + 1
			? getRouteCount(mat, { i: pos.i, j: pos.j - 1 })
			: 0;
	sum +=
		acc(mat, pos.i + 1, pos.j) === acc(mat, pos.i, pos.j) + 1
			? getRouteCount(mat, { i: pos.i + 1, j: pos.j })
			: 0;
	sum +=
		acc(mat, pos.i, pos.j + 1) === acc(mat, pos.i, pos.j) + 1
			? getRouteCount(mat, { i: pos.i, j: pos.j + 1 })
			: 0;

	return sum;
}

const preprocessor = strToMat;
