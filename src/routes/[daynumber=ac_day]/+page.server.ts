import { inputSchema } from '$lib/schemas/input-schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { tasksMap } from '$lib/tasks';

export const load = (async ({ params }) => {
	if (!Number.isInteger(Number(params.daynumber))) {
		throw new Error('Path is not an Integer');
	}

	return {
		dayNumber: params.daynumber,
		form: await superValidate(zod(inputSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	task1: async (event) => {
		const form = await superValidate(event, zod(inputSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let taskOutput;
		try {
			taskOutput = await doDayTask(Number(event.params.daynumber), form.data.input);
		} catch (error) {
			taskOutput = (error as Error).message;
			fail(400, { form });
		}

		return message(form, taskOutput);
	},
	task2: async (event) => {
		const form = await superValidate(event, zod(inputSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		let taskOutput;
		try {
			taskOutput = await doSecondDayTask(Number(event.params.daynumber), form.data.input);
		} catch (error) {
			taskOutput = (error as Error).message;
			fail(400, { form });
		}

		return message(form, taskOutput);
	}
};

async function doDayTask(day: number, input: string): Promise<string> {
	const task = tasksMap.get(day)?.task1;
	if (task === undefined) {
		throw Error('No logic for the selected day');
	}
	return await task(input);
}

async function doSecondDayTask(day: number, input: string): Promise<string> {
	const task = tasksMap.get(day)?.task2;
	if (task === undefined) {
		throw Error('No logic for the selected day');
	}
	return await task(input);
}
