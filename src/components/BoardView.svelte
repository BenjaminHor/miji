<script lang="ts">
import TileView from "./TileView.svelte";
import { onMount } from "svelte";
import { BoardModel } from "../models/board_model";
import { generate_puzzle } from "../puzzle_generator";
import { tile_catalog } from "../store";

export let board_model: BoardModel

let board_ref
let size = .5 * window.innerWidth
$: board_dimensions = board_model.board_dimensions
$: tiles = generate_puzzle(board_model, $tile_catalog)

onMount(() => {
	board_ref.style.setProperty("--board-size", `${size}px`)
	board_ref.style.setProperty("--num-cols", `${board_dimensions.columns}`)
})
</script>

<div
bind:this={board_ref}
class="board"
style="--num-cols:{board_dimensions.columns}"
>
	{#each tiles as tile (tile.id)}
		<TileView tile_model={tile}/>
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
	}
</style>