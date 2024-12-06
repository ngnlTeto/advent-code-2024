export async function task1(input: string): Promise<string> {
    const map = preprocessor(input);

    let rotationCount = 0;

    let iPos = map.findIndex // Don't work, don't care 
}

export async function task2(input: string): Promise<string> {}


function preprocessor(input: string): string[][] {
	return input.split('\n').map((line) => line.split(''));
}
