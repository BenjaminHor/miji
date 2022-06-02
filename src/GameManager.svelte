<script lang="ts">
import BoardView from "./components/BoardView.svelte";
import { BoardModel } from "./models/board_model";
import { tile_catalog, color_palettes, config } from "./store"

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
	.then(() => set_theme(null))

function change_board_size(delta: number) {
	board_model.change_board_size(delta)
	$config.board_size += delta
	board_model = board_model
}

function set_theme(theme: string) {
	let chosen_theme = "8008"

	if (theme == null) {
		// Check local storage for a saved theme
		let saved_theme = window.localStorage.getItem('current_theme')
		if (saved_theme != null) {
			chosen_theme = saved_theme
		}
	} else {
		chosen_theme = theme
	}

	$config.current_theme = $color_palettes[chosen_theme]
	$config.current_theme_name = chosen_theme
	window.localStorage.setItem('current_theme', chosen_theme)
	document.documentElement.style.setProperty("--bg-color", $config.current_theme["bg-color"])
	document.documentElement.style.setProperty("--main-color", $config.current_theme["main-color"])
	document.documentElement.style.setProperty("--sub-color", $config.current_theme["sub-color"])
	document.documentElement.style.setProperty("--text-color", $config.current_theme["text-color"])
}

</script>

<div>
	{#await tiles && colors then value}
		<BoardView board_model={board_model}/>
		<br>
		<button on:click={() => change_board_size(1)}>+</button>
		<button on:click={() => change_board_size(-1)}>-</button>
		<button on:click={() => change_board_size(0)}>New</button>
		<div>
			<select name="themes" on:change={event => set_theme(event.target.value)}>
				{#each Object.keys($color_palettes) as theme}
					{#if theme == $config.current_theme_name}
						<option selected value={theme}>{theme}</option>
					{:else}
						<option value={theme}>{theme}</option>
					{/if}
				{/each}
			</select>
		</div>
	{/await}
</div>

<style>
	:root {
		background-color: var(--bg-color);
	}
</style>