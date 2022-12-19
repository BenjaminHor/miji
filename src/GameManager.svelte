<script lang="ts">
import BoardView from "./components/BoardView.svelte";
import { BoardModel } from "./models/board_model";
import { tile_catalog, color_palettes, config, current_theme } from "./store"

let board_model = new BoardModel($config.board_size, $config.board_size)

// Initialize the tile catalog
let tiles = fetch("data/tiles.json")
	.then(response => response.json())
	.then(json => {
		$tile_catalog = json
	})

// Load in the color palettes
let colors = fetch("data/color_palettes.json")
	.then(response => response.json())
	.then(json => $color_palettes = json)
	.then(() => change_theme("8008"))

function change_board_size(delta: number) {
	board_model.change_board_size(delta)
	$config.board_size += delta
	board_model = board_model
}

function change_theme(theme: string) {
	$current_theme = $color_palettes[theme]
	document.documentElement.style.setProperty("--bg-color", $current_theme["bg-color"])
	document.documentElement.style.setProperty("--main-color", $current_theme["main-color"])
	document.documentElement.style.setProperty("--sub-color", $current_theme["sub-color"])
	document.documentElement.style.setProperty("--text-color", $current_theme["text-color"])
}

</script>

<div>
	{#await tiles && colors then value}
		<BoardView board_model={board_model}/>
		<button on:click={() => change_board_size(1)}>+</button>
		<button on:click={() => change_board_size(-1)}>-</button>
		<button on:click={() => change_board_size(0)}>New</button>
		<div>
			<select name="themes" on:change={event => change_theme(event.target.value)}>
				{#each Object.keys($color_palettes) as theme}
					<option value={theme}>{theme}</option>
				{/each}
			</select>
		</div>
	{/await}
</div>

<style>
	:root {
		background-color: var(--bg-color);
		--bg-color: white;
		--main-color: white;
		--sub-color: white;
		--text-color: white;
	}
</style>