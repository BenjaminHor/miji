<script lang="ts">
import BoardView from "./components/BoardView.svelte";
import { BoardModel } from "./models/board_model";
import { tile_catalog, color_palettes, config } from "./store"
import { tile_fits_adjacent_tiles, get_tile, generate_puzzle } from "./puzzle_generator"
import { TileModel } from "./models/tile_model";

let board_model = new BoardModel($config.board_size, $config.board_size)
let puzzle

// Initialize the tile catalog
let tiles = fetch("data/tiles.json")
	.then(response => response.json())
	.then(json => {
		$tile_catalog = json
		puzzle = generate_puzzle(board_model, $tile_catalog)
		determine_highlight_state()
	})

// Load in the color palettes
let colors = fetch("data/color_palettes.json")
	.then(response => response.json())
	.then(json => $color_palettes = json)
	.then(() => set_theme(null))

function change_board_size(delta: number) {
	board_model.change_board_size(delta)
	$config.board_size += delta
	puzzle = generate_puzzle(board_model, $tile_catalog)
	determine_highlight_state()
	board_model = board_model // Need this to trigger dom update from change_board_size
}

function set_theme(theme: string) {
	let chosen_theme = "8008"

	if (theme == null) {
		// Check local storage for a saved theme
		let saved_theme = window.localStorage.getItem('saved_theme')
		if (saved_theme != null) {
			chosen_theme = saved_theme
		}
	} else {
		chosen_theme = theme
	}

	$config.current_theme = $color_palettes[chosen_theme]
	$config.current_theme_name = chosen_theme
	window.localStorage.setItem('saved_theme', chosen_theme)
	document.documentElement.style.setProperty("--bg-color", $config.current_theme["bg-color"])
	document.documentElement.style.setProperty("--main-color", $config.current_theme["main-color"])
	document.documentElement.style.setProperty("--sub-color", $config.current_theme["sub-color"])
	document.documentElement.style.setProperty("--text-color", $config.current_theme["text-color"])
}

function determine_highlight_state() {
	for (let row = 0; row < board_model.board_dimensions.rows; row++) {
		for (let col = 0; col < board_model.board_dimensions.columns; col++) {
			let tile = board_model.generated_tiles[row][col]
			tile.is_highlighted = tile_fits_adjacent_tiles(tile, board_model.generated_tiles, row, col)
		}
	}
	puzzle = puzzle // Trigger reactivity
}

function handle_tile_rotation() {
	determine_highlight_state()
}

</script>

<div>
	{#await tiles && colors then value}
		<BoardView on:rotated={(event) => handle_tile_rotation()} board_model={board_model} puzzle={puzzle}/>
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