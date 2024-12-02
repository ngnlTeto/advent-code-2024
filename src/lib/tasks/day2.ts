enum Direction {
	increasing,
	decreasing
}

export async function task1(input: string): Promise<string> {
	const reportList = preprocessor(input);

	let counter = 0;
	reportIter: for (let i = 0; i < reportList.length; i++) {
		const report = reportList[i];
		let direction: Direction;

		if (report.at(0)! < report.at(1)!) {
			direction = Direction.increasing;
		}
		if (report.at(0)! > report.at(1)!) {
			direction = Direction.decreasing;
		}
		if (report.at(0)! === report.at(1)!) {
			continue reportIter;
		}

		for (let j = 0; j < report.length - 1; j++) {
			const currentLevel = report[j];
			const nextLevel = report[j + 1];
			const diff = Math.abs(currentLevel - nextLevel);

			if (3 < diff) {
				continue reportIter;
			}

			switch (direction!) {
				case Direction.increasing:
					if (currentLevel >= nextLevel) {
						continue reportIter;
					}
					break;
				case Direction.decreasing:
					if (currentLevel <= nextLevel) {
						continue reportIter;
					}
					break;
			}
		}
		counter++;
	}
	return counter.toString();
}

export async function task2(input: string): Promise<string> {
	const reportList = preprocessor(input);

	let counter = 0;
	reportIter: for (let i = 0; i < reportList.length; i++) {
		const report = reportList[i];
		let direction: Direction;


		if (report.at(0)! < report.at(-1)!) {
			direction = Direction.increasing;
		}
		if (report.at(0)! > report.at(-1)!) {
			direction = Direction.decreasing;
		}
		if (report.at(0)! === report.at(1)!) {
			continue reportIter;
		}

		for (let j = 0; j < report.length - 1; j++) {
			const currentLevel = report[j];
			const nextLevel = report[j + 1];
			const diff = Math.abs(currentLevel - nextLevel);

			if (3 < diff) {
				continue reportIter;
			}

			switch (direction!) {
				case Direction.increasing:
					if (currentLevel >= nextLevel) {
						continue reportIter;
					}
					break;
				case Direction.decreasing:
					if (currentLevel <= nextLevel) {
						continue reportIter;
					}
					break;
			}
		}
		counter++;
	}
	return counter.toString();
}

// function validateReport(report: number[]): boolean {}

function preprocessor(input: string): number[][] {
	return input.split('\n').map((report) => report.split(' ').map((levels) => Number(levels)));
}
