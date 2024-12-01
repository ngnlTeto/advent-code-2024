<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select/index.js';
	import { inputSchema, type InputFormSchema } from '$lib/schemas/input-schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { CircleAlert, CircleCheck } from 'lucide-svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { onMount } from 'svelte';

	let { data }: { data: SuperValidated<Infer<InputFormSchema>> } = $props();
	let selectedTask = $state('task1');

	export const form = superForm(data, {
		validators: zodClient(inputSchema),
		delayMs: 300,
		resetForm: false
	});

	const { form: formData, enhance, constraints, message, delayed, validateForm } = form;
	let isFormValid = $state(false);

	onMount(async () => {
		const { valid } = await validateForm({ update: true });
		isFormValid = valid;
	});

	function copyResult() {
		if ($message !== undefined) {
			navigator.clipboard.writeText($message);
			toast('successfully copied', { icon: CircleCheck });
		} else {
			toast('there is nothing to copy yet', { icon: CircleAlert });
		}
	}
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="input">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Input Task</Form.Label>
				<Textarea {...props} {...$constraints.input} bind:value={$formData.input} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="flex flex-row gap-2">
		<Form.Button formaction="?/{selectedTask}">
			Submit
			{#if $delayed}
				<LoaderCircle class="animate-spin" />
			{/if}
		</Form.Button>
		<Select.Root type="single" bind:value={selectedTask}>
			<Select.Trigger class="w-[180px]">{selectedTask}</Select.Trigger>
			<Select.Content>
				<Select.Item value="task1">Task 1</Select.Item>
				<Select.Item value="task2">Task 1</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
</form>
<div class="h-2"></div>
<div class="flex flex-row gap-2">
	<Input value={$message} placeholder="result" readonly />
	<Button variant="secondary" class="shrink-0" onclick={copyResult} disabled={!isFormValid}>
		Copy Result
	</Button>
</div>
