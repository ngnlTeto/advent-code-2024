<script>
	import LightSwitch from '$lib/components/light-switch.svelte';
	import { Button } from '$lib/components/ui/button';
	import { TreePine } from 'lucide-svelte';
</script>

<div class="m-4 flex flex-row gap-6">
	<div class="flex flex-col">
		<h1 class="pb-4 text-3xl">Henrys solution to "Advent of Code 2024"</h1>
		<div class="flex justify-center">
			<img class="lenny" src="./lenny.jpg" alt="Lenny mit Weinachtsbaum" />
		</div>
	</div>
	<div class="flex flex-grow flex-col">
		<div class="flex justify-end gap-2">
			<Button variant="link" target="_blank" href="https://adventofcode.com/">
				<TreePine />
				Advent of code
			</Button>
			<LightSwitch />
		</div>
		<div class="justify-center">
			<div class="flex flex-col">
				<h2 class="block text-xl">Tasks:</h2>
				{#each { length: 24 }, dayNum}
					<a href="/{dayNum+1}" class="text-blue-600 underline hover:text-blue-800">Day {dayNum+1}</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.lenny {
		height: 90vh;
	}
</style>
