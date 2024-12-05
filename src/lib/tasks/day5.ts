interface Day5Input {
	rules: Rule[];
	printOrder: number[][];
}

interface Rule {
	before: number;
	after: number;
}

export async function task1(input: string): Promise<string> {
	const updatePlan = preprocessor(input);
	let sum = 0;

	const validPrints = filterValidPrints(updatePlan);
	for (const print of validPrints) {
		sum += print[print.length / 2 - 0.5];
	}

	return Promise.resolve(sum.toString());
}

export async function task2(input: string): Promise<string> {
	const updatePlan = preprocessor(input);
	const validPrints = filterValidPrints(updatePlan);
	const invalidPrints = updatePlan.printOrder.filter((x) => !validPrints.includes(x));
	let sum = 0;

	for (const print of invalidPrints) {
		const applyingRules = updatePlan.rules.filter(
			(x) => print.includes(x.before) && print.includes(x.before)
		);

		while (true) {
			const brokenRule = isPrintValid(print, applyingRules);
			if (brokenRule === null) {
				break;
			}

			const beforeIndex = print.findIndex((p) => p === brokenRule.before);
			const afterIndex = print.findIndex((p) => p === brokenRule.after);

			// swap
			const temp = print[beforeIndex];
			print[beforeIndex] = print[afterIndex];
			print[afterIndex] = temp;
		}
	}

	for (const print of invalidPrints) {
		sum += print[print.length / 2 - 0.5];
	}

	return Promise.resolve(sum.toString());
}

function filterValidPrints(updatePlan: Day5Input): number[][] {
	const validPrints: number[][] = [];
	printloop: for (const print of updatePlan.printOrder) {
		for (let i = 0; i < updatePlan.rules.length; i++) {
			const rule = updatePlan.rules[i];
			const beforeIndex = print.findIndex((p) => p === rule.before);
			const afterIndex = print.findIndex((p) => p === rule.after);

			if (beforeIndex !== -1 && afterIndex !== -1) {
				if (!(beforeIndex < afterIndex)) {
					continue printloop;
				}
			}
		}
		validPrints.push(print);
	}
	return validPrints;
}

function isPrintValid(print: number[], rules: Rule[]): Rule | null {
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		const beforeIndex = print.findIndex((p) => p === rule.before);
		const afterIndex = print.findIndex((p) => p === rule.after);

		if (beforeIndex !== -1 && afterIndex !== -1) {
			if (!(beforeIndex < afterIndex)) {
				return rule;
			}
		}
	}
	return null;
}

function preprocessor(input: string): Day5Input {
	const splitInput = input.split('\n\n');
	const rawRules = splitInput.at(0);
	const rawPrintOrder = splitInput.at(1);

	const rules: Rule[] = rawRules!.split('\n')!.map((line) => {
		const theTwoNumbers = line.split('|').map((x) => Number(x));
		return { before: theTwoNumbers[0], after: theTwoNumbers[1] } satisfies Rule;
	});

	const printOrder = rawPrintOrder!
		.split('\n')
		.map((line) => line.split(',').map((x) => Number(x)));

	return { rules, printOrder };
}
