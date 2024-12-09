interface CalibrationEvaluation {
	supposedResult: bigint;
	equationComponents: bigint[];
}

export async function task1(input: string): Promise<string> {
	const equations = preprocessor(input);
	let resultSum = BigInt(0);

	for (const equ of equations) {
		if (evaluatCalibration(equ, false)) {
			resultSum += equ.supposedResult;
		}
	}

	return Promise.resolve(resultSum.toString());
}

export async function task2(input: string): Promise<string> {
	const equations = preprocessor(input);
	let resultSum = BigInt(0);

	for (const equ of equations) {
		if (evaluatCalibration(equ, true)) {
			resultSum += equ.supposedResult;
		}
	}

	return Promise.resolve(resultSum.toString());
}

function evaluatCalibration(
	calibration: CalibrationEvaluation,
	enableConcatenation: boolean
): boolean {
	let possibleResults: bigint[] = [];
	for (const comp of calibration.equationComponents) {
		if (possibleResults.length === 0) {
			possibleResults.push(comp);
		} else {
			const newPossibleResult: bigint[] = [];
			for (const intRes of possibleResults) {
				newPossibleResult.push(intRes * comp);
				newPossibleResult.push(intRes + comp);
				if (enableConcatenation) {
					newPossibleResult.push(BigInt(`${intRes}${comp}`));
				}
			}
			possibleResults = newPossibleResult;
		}
	}
	return possibleResults.includes(calibration.supposedResult);
}

function preprocessor(input: string): CalibrationEvaluation[] {
	const equationStrings = input.split('\n');
	return equationStrings.map((equ) => {
		const [res, numStrings] = equ.split(': ');
		const nums = numStrings.split(' ').map((x) => BigInt(x));

		return { supposedResult: BigInt(res), equationComponents: nums } as CalibrationEvaluation;
	});
}
