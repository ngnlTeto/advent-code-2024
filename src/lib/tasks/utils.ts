/**
 * Access a two dim matrix securly
 */
export function acc<T>(mat: T[][], i: number, j: number): T {
	return (mat[i] ?? [])[j];
}

/**
 * Creates a matrix from a multiline string
 */
export function strToMat(input: string): string [][] {
  return input.split('\n').map((line) => line.split(''));
}

/**
 * Creates a multiline string from a matrix
 */
export function matToStr(mat: string[][]): string {
	const drawMat: string[] = [];
	for (const row of mat) {
		drawMat.push(row.join(''));
	}
	return drawMat.join('\n');
}
