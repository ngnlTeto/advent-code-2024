/**
 * Access a two dim matrix securly
 */
export function acc<T>(map: T[][], i: number, j: number): T {
	return (map[i] ?? [])[j];
}
