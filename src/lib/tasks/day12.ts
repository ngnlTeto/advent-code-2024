import { acc, strToMat } from './utils';

class Region {
	plots: Plot[] = [];

	get area(): number {
		return this.plots.length;
	}

	get perimeter(): number {
		let totalSides = 0;

		for (const plot of this.plots) {
			// north
			if (!this.plots.some((p) => plot.i - 1 === p.i && plot.j === p.j)) {
				totalSides++;
			}
			// eath
			if (!this.plots.some((p) => plot.i === p.i && plot.j + 1 === p.j)) {
				totalSides++;
			}
			// south
			if (!this.plots.some((p) => plot.i + 1 === p.i && plot.j === p.j)) {
				totalSides++;
			}
			// west
			if (!this.plots.some((p) => plot.i === p.i && plot.j - 1 === p.j)) {
				totalSides++;
			}
		}

		return totalSides;
	}

	get price(): number {
		return this.area * this.perimeter;
	}
}

interface Plot {
	i: number;
	j: number;
}

export async function task1(input: string): Promise<string> {
	const matrix = preprocesser(input);

	const regions = discoverRegions(matrix);

	const totalPrice = regions.reduce((sum, reg) => sum + reg.price, 0);

	return Promise.resolve(totalPrice.toString());
}

export async function task2(input: string): Promise<string> {}

function discoverRegions(mat: string[][]): Region[] {
	const alreadyFoundPlots: Plot[] = [];
	const regions: Region[] = [];

	for (let i = 0; i < mat.length; i++) {
		for (let j = 0; j < mat[i].length; j++) {
			if (!alreadyFoundPlots.some((p) => i === p.i && j === p.j)) {
				const plots = findAttachedPlots(i, j, mat);
				alreadyFoundPlots.push(...plots);
				const region = new Region();
				region.plots = plots;
				regions.push(region);
			}
		}
	}
	return regions;
}

function findAttachedPlots(
	i: number,
	j: number,
	mat: string[][],
	excludedPlots: Plot[] = []
): Plot[] {
	const plots: Plot[] = [{ i, j }];
	const regionType = mat[i][j];
	excludedPlots.push({ i, j });

	if (acc(mat, i - 1, j) === regionType && !excludedPlots.some((p) => i - 1 === p.i && j === p.j)) {
		plots.push(...findAttachedPlots(i - 1, j, mat, excludedPlots));
	}
	if (acc(mat, i + 1, j) === regionType && !excludedPlots.some((p) => i + 1 === p.i && j === p.j)) {
		plots.push(...findAttachedPlots(i + 1, j, mat, excludedPlots));
	}
	if (acc(mat, i, j - 1) === regionType && !excludedPlots.some((p) => i === p.i && j - 1 === p.j)) {
		plots.push(...findAttachedPlots(i, j - 1, mat, excludedPlots));
	}
	if (acc(mat, i, j + 1) === regionType && !excludedPlots.some((p) => i === p.i && j + 1 === p.j)) {
		plots.push(...findAttachedPlots(i, j + 1, mat, excludedPlots));
	}

	return plots;
}

const preprocesser = strToMat;
