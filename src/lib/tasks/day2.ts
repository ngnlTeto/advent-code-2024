export async function task1(input: string): Promise<string> {
	const reportList = preprocessor(input);

	const safeReportCount = reportList.filter((report) => {
		if (report.at(0)! < report.at(1)!) {
			// increasing
			for (let i = 0; i < report.length - 1; i++) {
				const currentLevel = report[i];
				const nextLevel = report[i + 1];
				const diff = Math.abs(currentLevel - nextLevel);

				if (nextLevel <= currentLevel || 3 < diff) {
					return false;
				}
			}
		} else if (report.at(0)! > report.at(1)!) {
			// decreasing
			for (let i = 0; i < report.length - 1; i++) {
				const currentLevel = report[i];
				const nextLevel = report[i + 1];
				const diff = Math.abs(currentLevel - nextLevel);

				if (currentLevel <= nextLevel || 3 < diff) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}).length;

	return safeReportCount.toString();
}

export async function task2(input: string): Promise<string> {}

function preprocessor(input: string): number[][] {
	return input.split('\n').map((report) => report.split(' ').map((levels) => Number(levels)));
}
