import { task1 as day1task1, task2 as day1task2 } from './day1';
import { task1 as day2task1, task2 as day2task2 } from './day2';

export const tasksMap1 = new Map<number, (a: string) => Promise<string>>([
	[1, day1task1],
	[2, day2task1]
]);
export const tasksMap2 = new Map<number, (a: string) => Promise<string>>([
	[1, day1task2],
	[2, day2task2]
]);
