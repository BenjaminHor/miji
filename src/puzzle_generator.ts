import { BoardModel } from "./models/board_model"
import { Rotation, Side, TileModel } from "./models/tile_model"
import * as tile_controller from "./controllers/tile_controller"

export function generate_puzzle(board_model: BoardModel, tile_catalog: string[][]) {
	let columns = board_model.board_dimensions.columns
	let rows = board_model.board_dimensions.rows
	let generated_tiles: TileModel[][] = []

	//Initialize the generated tiles grid
	for (let row = 0; row < rows; row++) {
		generated_tiles.push([])
	}

	// Add a root tile
	// generated_tiles[0].push(TileModel.from_array(["1a8", "2b3", "4c5", "6d7"]))

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			// if (row == 0 && col == 0) {
			// 	continue
			// }

			let tile_found = false
			let discarded_choices = new Map()

			while (!tile_found && discarded_choices.keys.length < tile_catalog.length) {
				// Find a search index that hasn't been used before
				let search_index = random(0, tile_catalog.length - 1)
				while (discarded_choices.has(search_index)) {
					search_index = random(0, tile_catalog.length - 1)
				}

				// Choose a random tile and determine if it fits in the puzzle
				let potential_tile = TileModel.from_array(tile_catalog[search_index])
				let fits = does_tile_fit(potential_tile, generated_tiles, row, col)
				if (fits) {
					// If it fits, then we add it to the generated_tiles
					potential_tile.set_position(row, col)
					generated_tiles[row].push(potential_tile)
					tile_found = true
				} else {
					// Add that choice to the set of discarded choices
					discarded_choices[search_index] = true
				}
			}
		}
	}

	randomize_puzzle(generated_tiles)

	// Update the board model with the newly generated tiles
	board_model.generated_tiles = [...generated_tiles]

	return generated_tiles
}

function randomize_puzzle(puzzle: TileModel[][]) {
	// Then randomize the rotation of the tiles
	for (let row of puzzle) {
		for (let tile of row) {
			tile_controller.rotate(tile, random(Rotation.QUARTER, Rotation.THREE_QUARTER))
		}
	}
}

function does_tile_fit(tile: TileModel, generated_tiles: TileModel[][], row: number, col: number) {
	// Check each rotation and return the first rotation that fits the puzzle
	for (let i = 0; i <= 4; i++) {
		tile_controller.rotate(tile, i)
		let rotation_valid = tile_fits_adjacent_tiles(tile, generated_tiles, row, col)
		if (rotation_valid) {
			return true
		}
	}

	return false
}

function tile_fits_adjacent_tiles(tile: TileModel, generated_tiles: TileModel[][], row: number, col: number) {
	// Fetch the tiles adjacent to the tile passed in
	let north_tile = get_tile(generated_tiles, row - 1, col)
	let south_tile = get_tile(generated_tiles, row + 1, col)
	let east_tile = get_tile(generated_tiles, row, col + 1)
	let west_tile = get_tile(generated_tiles, row, col - 1)

	let adjacent_tiles = [
		{tile: north_tile, side: Side.SOUTH},
		{tile: south_tile, side: Side.NORTH},
		{tile: east_tile, side: Side.WEST},
		{tile: west_tile, side: Side.EAST}
	]

	// Validate that the tile fits with all adjacent tiles
	for (let adj of adjacent_tiles) {
		if (adj.tile != undefined) {
			if (!tile_controller.does_tile_fit(adj.tile, tile, adj.side)) {
				return false
			}
		}
	}

	// If we get to this point, tile has fit all adjacent tiles
	return true
}

function get_tile(generated_tiles: TileModel[][], row: number, col: number) {
	if (generated_tiles[row] != undefined) {
		return generated_tiles[row][col]
	}
	return undefined
}

function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}