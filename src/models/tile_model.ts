export enum Rotation {
	NONE = 0,
	QUARTER = 1, // 90
	HALF = 2, // 180
	THREE_QUARTER = 3, // 270
	FULL = 4, // 360
}

export enum Side {
	NORTH = 0, EAST = 1, SOUTH = 2, WEST = 3
}

/*
Visual Representation of a tile

     1  2
  ----------
8 |  a  b  | 3
7 |  d  c  | 4
  ----------
     6  5
 */

export class TileModel {

	// Tile coordinates in grid
	row_pos: number
	col_pos: number

	// Contains the string representation of the lines in a tile
	// A tile can contain up to four line/dot configurations
	// Ex. ["1adc5", "3b"]
	internal_lines: Array<string> = []

	// Describes which lines and dots are occupied
	lines: Array<number> = [0,0,0,0,0,0,0,0] // 1,2,3,4,5,6,7,8
	dots: Array<number> = [0,0,0,0] // a,b,c,d

	constructor(row: number = 0, col: number = 0) {
		this.row_pos = row
		this.col_pos = col
	}

	rotate(rotation: Rotation): TileModel {
		let new_lines = []

		for (let line of this.internal_lines) {
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

		this.reset()
		for (let line of new_lines) {
			this.add_line(line)
		}

		return this
	}

	does_tile_fit(other_tile: TileModel, side: Side): boolean {
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

		return helper(this, other_tile, side)
			&& helper(other_tile, this, get_opposite_side(side))
	}

	static from_array(array: Array<string>): TileModel {
		let new_tile = new TileModel()

		for (let line of array) {
			new_tile.add_line(line)
		}

		return new_tile
	}

	add_line(line: string) {
		this.internal_lines.push(line)

		for(let char of line) {
			let symbol = parseInt(char)
			if(!isNaN(symbol)) {
				this.lines[symbol - 1] = 1
			} else {
				this.dots[100 - char.charCodeAt(0)] = 1
			}
		}
	}

	copy(): TileModel {
		let new_tile = new TileModel()

		new_tile.internal_lines = [...this.internal_lines]
		new_tile.lines = [...this.lines]
		new_tile.dots = [...this.dots]

		return new_tile
	}

	reset() {
		this.internal_lines = []
		this.lines = [0,0,0,0,0,0,0,0]
		this.dots = [0,0,0,0]
	}
}