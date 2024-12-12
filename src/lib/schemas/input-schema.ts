import { z } from 'zod';

export const inputSchema = z.object({
	input: z.string()
});

export type InputFormSchema = typeof inputSchema;
