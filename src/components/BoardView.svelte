<script lang="ts">
import TileView from "./TileView.svelte";
import { onMount } from "svelte";
import { BoardModel } from "../models/board_model";
import { generate_puzzle } from "../puzzle_generator";
import { tile_catalog } from "../store";

export let board_model: BoardModel

let board_ref
let size = .45 * window.innerWidth
$: board_dimensions = board_model.board_dimensions
$: puzzle = generate_puzzle(board_model, $tile_catalog)

if (/Mobi|Android/i.test(navigator.userAgent)) {
	size = .9 * window.innerWidth
}

let left = (window.innerWidth / 2) - (size / 2)

onMount(() => {
	board_ref.style.setProperty("--board-size", `${size}px`)
	board_ref.style.setProperty("--left", `${left}px`)
	board_ref.style.setProperty("--num-cols", `${board_dimensions.columns}`)
})
</script>

<div
bind:this={board_ref}
class="board"
style="--num-cols:{board_dimensions.columns}"
>
	{#each puzzle as row (row)}
		{#each row as tile (tile)}
			<TileView tile_model={tile}/>
		{/each}
	{/each}
</div>

<style>
	.board {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--num-cols), 1fr);
		gap: 5px;
		width: var(--board-size);
		height: var(--board-size);
		left: var(--left);
	}
</style>