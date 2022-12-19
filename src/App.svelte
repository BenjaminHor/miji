<script lang="ts">
import TileView from "./components/TileView.svelte";
import { Rotation, TileModel, Side } from "./models/tile_model";

let tiles = []
fetch("data/tiles.json")
  .then(response => response.json())
  .then(json => tiles = json)

let size = 1 * window.innerWidth
document.documentElement.style.setProperty("--board-size", `${size}px`)

</script>

<div class="board">
	{#each tiles as tile}
		<TileView tile_model={TileModel.from_array(tile)}/>
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(9, 1fr);
		gap: 5px;
		width: var(--board-size);
		height: var(--board-size);
	}
</style>