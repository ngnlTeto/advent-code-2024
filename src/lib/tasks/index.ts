import * as day1 from './day1';
import * as day2 from './day2';

export interface TaskDuo {
	task1: (a: string) => Promise<string>;
	task2: (a: string) => Promise<string>;
}

export const tasksMap = new Map<number, TaskDuo>([
	[1, { task1: day1.task1, task2: day1.task2 }],
	[2, { task1: day2.task1, task2: day2.task2 }]
]);
