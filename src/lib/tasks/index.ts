import * as day1 from './day1';
import * as day2 from './day2';
import * as day3 from './day3';
import * as day4 from './day4';
import * as day5 from './day5';
import * as day6 from './day6';
import * as day7 from './day7';
import * as day8 from './day8';
import * as day9 from './day9';
import * as day10 from './day10';
import * as day11 from './day11';
import * as day12 from './day12';

export interface TaskDuo {
	task1: (a: string) => Promise<string>;
	task2: (a: string) => Promise<string>;
}

export const tasksMap = new Map<number, TaskDuo>([
	[1, { task1: day1.task1, task2: day1.task2 }],
	[2, { task1: day2.task1, task2: day2.task2 }],
	[3, { task1: day3.task1, task2: day3.task2 }],
	[4, { task1: day4.task1, task2: day4.task2 }],
	[5, { task1: day5.task1, task2: day5.task2 }],
	[6, { task1: day6.task1, task2: day6.task2 }],
	[7, { task1: day7.task1, task2: day7.task2 }],
	[8, { task1: day8.task1, task2: day8.task2 }],
	[9, { task1: day9.task1, task2: day9.task2 }],
	[10, { task1: day10.task1, task2: day10.task2 }],
	[11, { task1: day11.task1, task2: day11.task2 }],
	[12, { task1: day12.task1, task2: day12.task2 }],
]);
