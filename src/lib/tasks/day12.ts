import { acc, strToMat } from './utils';

class Region {
	plots: Plot[] = [];

	get area(): number {
		return this.plots.length;
	}

	get perimeter(): number {
		return this.plotSides.length;
	}

	get plotSides(): PlotSide[] {
		const plotSides: PlotSide[] = [];

		for (const plot of this.plots) {
			// north
			if (!this.plots.some((p) => plot.i - 1 === p.i && plot.j === p.j)) {
				plotSides.push({ ...plot, direction: Direction.North });
			}
			// eath
			if (!this.plots.some((p) => plot.i === p.i && plot.j + 1 === p.j)) {
				plotSides.push({ ...plot, direction: Direction.East });
			}
			// south
			if (!this.plots.some((p) => plot.i + 1 === p.i && plot.j === p.j)) {
				plotSides.push({ ...plot, direction: Direction.South });
			}
			// west
			if (!this.plots.some((p) => plot.i === p.i && plot.j - 1 === p.j)) {
				plotSides.push({ ...plot, direction: Direction.West });
			}
		}

		return plotSides;
	}

	get areaSideCount(): number {
		const plotSides: PlotSide[] = this.plotSides;

		// remove attached plotsides without a corner inbetween
		outerLoop: while (true) {
			for (const plotSide of plotSides) {
				if (plotSide.direction === Direction.North || plotSide.direction === Direction.South) {
					if (
						plotSides.some(
							(ps) =>
								(ps.i === plotSide.i &&
									ps.j === plotSide.j - 1 &&
									ps.direction === plotSide.direction) ||
								(ps.i === plotSide.i &&
									ps.j === plotSide.j + 1 &&
									ps.direction === plotSide.direction)
						)
					) {
						removeAttachedSides(plotSides, plotSide);
						continue outerLoop;
					}
				} else {
					if (
						plotSides.some(
							(ps) =>
								(ps.i === plotSide.i - 1 &&
									ps.j === plotSide.j &&
									ps.direction === plotSide.direction) ||
								(ps.i === plotSide.i + 1 &&
									ps.j === plotSide.j &&
									ps.direction === plotSide.direction)
						)
					) {
						removeAttachedSides(plotSides, plotSide);
						continue outerLoop;
					}
				}
			}
			break;
		}
		return plotSides.length;
	}

	get price(): number {
		return this.area * this.perimeter;
	}

	get bulkPrice(): number {
		return this.area * this.areaSideCount;
	}
}

enum Direction {
	North,
	East,
	South,
	West
}

interface Plot {
	i: number;
	j: number;
}

interface PlotSide extends Plot {
	direction: Direction;
}

export async function task1(input: string): Promise<string> {
	const matrix = preprocesser(input);

	const regions = discoverRegions(matrix);

	const totalPrice = regions.reduce((sum, reg) => sum + reg.price, 0);

	return Promise.resolve(totalPrice.toString());
}

export async function task2(input: string): Promise<string> {
	const matrix = preprocesser(input);

	const regions = discoverRegions(matrix);

	const totalPrice = regions.reduce((sum, reg) => sum + reg.bulkPrice, 0);

	return Promise.resolve(totalPrice.toString());
}

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

function removeAttachedSides(plotSides: PlotSide[], scopedSide: PlotSide): void {
	const dir = scopedSide.direction;
	let mutator = -1;

	if (dir === Direction.North || dir === Direction.South) {
		while (
			plotSides.some(
				(ps) => ps.direction === dir && ps.i === scopedSide.i && ps.j === scopedSide.j + mutator
			)
		) {
			const plotIndex = plotSides.findIndex(
				(ps) => ps.direction === dir && ps.i === scopedSide.i && ps.j === scopedSide.j + mutator
			);
			plotSides.splice(plotIndex, 1);
			mutator--;
		}
		mutator = 1;
		while (
			plotSides.some(
				(ps) => ps.direction === dir && ps.i === scopedSide.i && ps.j === scopedSide.j + mutator
			)
		) {
			const plotIndex = plotSides.findIndex(
				(ps) => ps.direction === dir && ps.i === scopedSide.i && ps.j === scopedSide.j + mutator
			);
			plotSides.splice(plotIndex, 1);
			mutator++;
		}
	} else {
		while (
			plotSides.some(
				(ps) => ps.direction === dir && ps.i === scopedSide.i + mutator && ps.j === scopedSide.j
			)
		) {
			const plotIndex = plotSides.findIndex(
				(ps) => ps.direction === dir && ps.i === scopedSide.i + mutator && ps.j === scopedSide.j
			);
			plotSides.splice(plotIndex, 1);
			mutator--;
		}
		mutator = 1;
		while (
			plotSides.some(
				(ps) => ps.direction === dir && ps.i === scopedSide.i + mutator && ps.j === scopedSide.j
			)
		) {
			const plotIndex = plotSides.findIndex(
				(ps) => ps.direction === dir && ps.i === scopedSide.i + mutator && ps.j === scopedSide.j
			);
			plotSides.splice(plotIndex, 1);
			mutator++;
		}
	}
}

const preprocesser = strToMat;
