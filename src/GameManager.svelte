<script lang="ts">
import BoardView from "./components/BoardView.svelte";
import { BoardModel } from "./models/board_model";
import { tile_catalog } from "./store"

let board_model = new BoardModel(3, 3)

// Initialize the tile catalog
let response = fetch("data/tiles.json")
	.then(response => response.json())
	.then(json => {
		$tile_catalog = json
	})

function change_board_size(delta: number) {
	board_model.change_board_size(delta)
	board_model = board_model
}

</script>

<div>
	{#await response then value}
		<BoardView board_model={board_model}/>
	{/await}
</div>
<button on:click={() => change_board_size(1)}>+</button>
<button on:click={() => change_board_size(-1)}>-</button>

<style>
</style>