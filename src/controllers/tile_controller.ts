import { Rotation, Side, TileModel } from "../models/tile_model"


export function rotate(tile: TileModel, rotation: Rotation): TileModel {
	let new_lines = []

	for (let line of tile.internal_lines) {
		let new_line = ""
		// Convert each symbol to it's rotated symbol
		for (let symbol of line) {
			let new_symbol = parseInt(symbol)
			if(!isNaN(new_symbol)) {
				new_symbol = (new_symbol + (rotation * 2)) % 8 // Returns a value between 1 and 8
				if (new_symbol == 0) {
					// 8 % 8 is 0, which doesn't fit the tile format
					new_symbol = 8
				}
				new_line += new_symbol
			} else {
				let index = ("abcd".indexOf(symbol) + rotation) % 4 // Returns a value between 0 and 3
				new_line += "abcd".charAt(index)
			}
		}
		new_lines.push(new_line)
	}

	tile.reset()
	for (let line of new_lines) {
		tile.add_line(line)
	}

	return this
}

export function does_tile_fit(this_tile: TileModel, other_tile: TileModel, side: Side): boolean {
	function get_opposite_side(side: Side): Side {
		switch(side) {
			case Side.NORTH:
				return Side.SOUTH
			case Side.SOUTH:
				return Side.NORTH
			case Side.EAST:
				return Side.WEST
			case Side.WEST:
				return Side.EAST
		}
	}

	function helper(this_tile: TileModel, other_tile: TileModel, side: Side): boolean {
		let side_mapping = new Map()
		side_mapping[Side.NORTH] = [1, 2]
		side_mapping[Side.EAST] = [3, 4]
		side_mapping[Side.SOUTH] = [6, 5]
		side_mapping[Side.WEST] = [8, 7]

		let opposite_side = get_opposite_side(side)
		let this_side_lines = side_mapping[side]
		let other_side_lines = side_mapping[opposite_side]

		for (let index in this_side_lines) {
			let this_line = this_side_lines[index]
			// Check if this tile is using this_line
			if (this_tile.lines[this_line - 1] == 1) {
				// Check if other tile is using other line because this line and other line can connect
				let other_line = other_side_lines[index]
				if (other_tile.lines[other_line - 1] == 0) {
					// We have an invalid connection
					return false
				}
			}
		}
		return true
	}

	return helper(this_tile, other_tile, side)
		&& helper(other_tile, this_tile, get_opposite_side(side))
}