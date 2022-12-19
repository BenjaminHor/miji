import { BoardModel } from "./models/board_model"
import { TileModel } from "./models/tile_model"

export function generate_puzzle(board_model: BoardModel, tile_catalog: Array<Array<string>>) {
	let generated_tiles = []
	let columns = board_model.board_dimensions.columns
	let rows = board_model.board_dimensions.rows

	for (let i = 0; i < columns * rows; i++) {
		let tile = tile_catalog[Math.floor(Math.random() * tile_catalog.length)]
		generated_tiles.push(TileModel.from_array(tile))
	}

	// Update the board model with the newly generated tiles
	board_model.generated_tiles = [...generated_tiles]

	return generated_tiles
}