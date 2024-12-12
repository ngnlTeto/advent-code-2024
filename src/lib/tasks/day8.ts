import { strToMat } from "./utils";

type AntennaMap = Map<string, { i: number; j: number }[]>;

export async function task1(input: string): Promise<string> {
	const antennaMatrix = preprocessor(input);

	const antennaMap = createAntennaMap(antennaMatrix);

	const antinodes = findAntinodes(antennaMap);

	// filter entries which aren't on the matrix
	const antinodesOnMatrix = antinodes.filter(
		(antinode) =>
			0 <= antinode.i &&
			antinode.i < antennaMatrix.length &&
			0 <= antinode.j &&
			antinode.j < antennaMatrix[0].length
	);

	// remove duplicates
	const alreadVisited: string[] = [];
	const uniqueAntinodesOnMatrix = antinodesOnMatrix.filter((antinode) => {
		if (!alreadVisited.includes(`${antinode.i}|${antinode.j}`)) {
			alreadVisited.push(`${antinode.i}|${antinode.j}`);
			return true;
		}
		return false;
	});

	return Promise.resolve(uniqueAntinodesOnMatrix.length.toString());
}

export async function task2(input: string): Promise<string> {
	const antennaMatrix = preprocessor(input);

	const antennaMap = createAntennaMap(antennaMatrix);

	const antinodes = findAntinodesWithResonants(antennaMap, antennaMatrix);

	// filter entries which aren't on the matrix
	const antinodesOnMatrix = antinodes.filter(
		(antinode) =>
			0 <= antinode.i &&
			antinode.i < antennaMatrix.length &&
			0 <= antinode.j &&
			antinode.j < antennaMatrix[0].length
	);

	// remove duplicates
	const alreadVisited: string[] = [];
	const uniqueAntinodesOnMatrix = antinodesOnMatrix.filter((antinode) => {
		if (!alreadVisited.includes(`${antinode.i}|${antinode.j}`)) {
			alreadVisited.push(`${antinode.i}|${antinode.j}`);
			return true;
		}
		return false;
	});

	return Promise.resolve(uniqueAntinodesOnMatrix.length.toString());
}

function createAntennaMap(antennaMatrix: string[][]): AntennaMap {
	const resultMap = new Map<string, { i: number; j: number }[]>();

	for (let i = 0; i < antennaMatrix.length; i++) {
		const antennaRow = antennaMatrix[i];
		for (let j = 0; j < antennaRow.length; j++) {
			if (antennaRow[j] !== '.') {
				if (!resultMap.has(antennaRow[j])) {
					resultMap.set(antennaRow[j], []);
				}

				const frequencieLocations = resultMap.get(antennaRow[j])!;
				frequencieLocations.push({ i, j });
				resultMap.set(antennaRow[j], frequencieLocations);
			}
		}
	}
	return resultMap;
}

function findAntinodes(map: AntennaMap): { i: number; j: number }[] {
	const antinodeList: { i: number; j: number }[] = [];

	for (const antennas of map.values()) {
		// match any antenna of one frequencie with the others
		for (let i = 0; i < antennas.length; i++) {
			for (let j = i + 1; j < antennas.length; j++) {
				const antennaA = antennas[i];
				const antennaB = antennas[j];

				antinodeList.push({
					i: antennaA.i - (antennaB.i - antennaA.i),
					j: antennaA.j - (antennaB.j - antennaA.j)
				});
				antinodeList.push({
					i: antennaB.i - (antennaA.i - antennaB.i),
					j: antennaB.j - (antennaA.j - antennaB.j)
				});
			}
		}
	}
	return antinodeList;
}

function findAntinodesWithResonants(map: AntennaMap, mat: string[][]): { i: number; j: number }[] {
	const antinodeList: { i: number; j: number }[] = [];

	for (const antennas of map.values()) {
		// match any antenna of one frequencie with the others
		for (let i = 0; i < antennas.length; i++) {
			for (let j = i + 1; j < antennas.length; j++) {
				let cAntennaA = antennas[i];
				let cAntennaB = antennas[j];

				const antennaADiff = {
					i: cAntennaB.i - cAntennaA.i,
					j: cAntennaB.j - cAntennaA.j
				};
				const antennaBDiff = {
					i: cAntennaA.i - cAntennaB.i,
					j: cAntennaA.j - cAntennaB.j
				};

				for (let i = 0; i < Math.max(mat.length, mat[0].length); i++) {
					antinodeList.push(cAntennaA);
					antinodeList.push(cAntennaB);

					cAntennaA = {
						i: cAntennaA.i - antennaADiff.i,
						j: cAntennaA.j - antennaADiff.j
					};
					cAntennaB = {
						i: cAntennaB.i - antennaBDiff.i,
						j: cAntennaB.j - antennaBDiff.j
					};
				}
			}
		}
	}
	return antinodeList;
}

const preprocessor = strToMat;
