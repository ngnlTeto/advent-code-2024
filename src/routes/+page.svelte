<script>
	import LightSwitch from '$lib/components/light-switch.svelte';
	import { Button } from '$lib/components/ui/button';
	import { TreePine } from 'lucide-svelte';
</script>

<div class="flex flex-row p-4">
	<h1 class="text-3xl">Henrys solution to "Advent of Code 2024"</h1>
	<div class="grow"></div>
	<Button variant="link" target="_blank" href="https://adventofcode.com/">
		<TreePine />
		Advent of code
	</Button>
	<LightSwitch />
</div>

<div class="flex flex-row gap-6">
	<img class="lenny mx-12 mb-4" src="./lenny.jpg" alt="Lenny mit Weinachtsbaum" />
	<div class="flex flex-grow flex-col">
		<div class="justify-center">
			<div class="flex flex-col">
				<h2 class="block text-xl">Tasks:</h2>
				{#each { length: 24 }, dayNum}
					<a href="/{dayNum + 1}" class="text-blue-600 underline hover:text-blue-800">
						Day {dayNum + 1}
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.lenny {
		height: calc(100vh - 3rem - 40px);
	}
</style>
