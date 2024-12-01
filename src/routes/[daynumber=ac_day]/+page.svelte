<script lang="ts">
	import InputForm from '$lib/components/input-form.svelte';
	import LightSwitch from '$lib/components/light-switch.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MoveLeft } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="mx-8 my-6 flex flex-col">
	<div class="flex flex-row gap-2">
		<h1 class="pb-4 text-2xl">Day {data.dayNumber}</h1>
		<div class="grow"></div>
		<Button variant="outline" href="/">
			<MoveLeft /> Home
		</Button>
		<LightSwitch />
	</div>
	<InputForm data={data.form} />
</div>
