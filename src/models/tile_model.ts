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

	id: string = `tile_${Math.floor(Math.random() * 10000)}`

	// Tile coordinates in grid
	row_pos: number
	col_pos: number

	// Contains the string representation of the lines in a tile
	// A tile can contain up to four line/dot configurations
	// Ex. ["1adc5", "3b"]
	internal_lines: string[] = []

	// Describes which lines and dots are occupied
	lines: number[] = [0,0,0,0,0,0,0,0] // 1,2,3,4,5,6,7,8
	dots: number[] = [0,0,0,0] // a,b,c,d

	constructor(row: number = 0, col: number = 0) {
		this.row_pos = row
		this.col_pos = col
	}

	static from_array(array: string[]): TileModel {
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

	set_position(row: number, col: number) {
		this.row_pos = row
		this.col_pos = col
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