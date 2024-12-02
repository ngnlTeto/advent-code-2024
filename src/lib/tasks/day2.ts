enum Direction {
	increasing,
	decreasing
}

export async function task1(input: string): Promise<string> {
	const reportList = preprocessor(input);
	let counter = 0;

	for (let i = 0; i < reportList.length; i++) {
		if (validateReport(reportList[i])) {
			counter++;
		}
	}

	return counter.toString();
}

export async function task2(input: string): Promise<string> {
	const reportList = preprocessor(input);
	let counter = 0;
	const naughtyList: number[][] = [];

	// Search for pure good lists :)
	for (const report of reportList) {
		if (validateReport(report)) {
			counter++;
		} else {
			naughtyList.push(report);
		}
	}

	// Search for the kinda good lists ?
	reportItr: for (const report of naughtyList) {
		for (let i = 0; i < report.length; i++) {
			const maybeFixedReport = report.toSpliced(i, 1);
			if (validateReport(maybeFixedReport)) {
				counter++;
				continue reportItr;
			}
		}
	}

	return counter.toString();
}

function validateReport(report: number[]): boolean {
	let direction: Direction;

	if (report.at(0)! < report.at(1)!) {
		direction = Direction.increasing;
	}
	if (report.at(0)! > report.at(1)!) {
		direction = Direction.decreasing;
	}
	if (report.at(0)! === report.at(1)!) {
		return false;
	}

	for (let j = 0; j < report.length - 1; j++) {
		const currentLevel = report[j];
		const nextLevel = report[j + 1];
		const diff = Math.abs(currentLevel - nextLevel);

		if (3 < diff) {
			return false;
		}

		switch (direction!) {
			case Direction.increasing:
				if (currentLevel >= nextLevel) {
					return false;
				}
				break;
			case Direction.decreasing:
				if (currentLevel <= nextLevel) {
					return false;
				}
				break;
		}
	}
	return true;
}

function preprocessor(input: string): number[][] {
	return input.split('\n').map((report) => report.split(' ').map((level) => Number(level)));
}
