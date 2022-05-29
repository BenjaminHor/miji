import { TileModel } from "./tile_model"

export class BoardModel {

	board_dimensions: {columns: number, rows: number} = {
		columns: 2,
		rows: 2
	}

	generated_tiles: Array<TileModel> = []

	constructor(columns: number = 2, rows: number = 2) {
		this.set_board_size(columns, rows)
	}

	change_board_size(delta: number) {
		this.board_dimensions.columns = Math.max(2, this.board_dimensions.columns + delta)
		this.board_dimensions.rows = Math.max(2, this.board_dimensions.rows + delta)
	}

	set_board_size(columns: number, rows: number) {
		this.board_dimensions.columns = Math.max(2, columns)
		this.board_dimensions.rows = Math.max(2, rows)
	}
}