import { task1, task2 } from './day1';

export const tasksMap1 = new Map<number, (a: string) => Promise<string>>([[1, task1]]);
export const tasksMap2 = new Map<number, (a: string) => Promise<string>>([[1, task2]]);
