import { TileModel, Side, Rotation } from "../../models/tile_model"

describe("tile_model.ts", () => {
	describe(".from_array", () => {
		it("correctly creates a tile from provided data", () => {
			let tile_data = ["1ab3", "7dc4"]
			let tile = TileModel.from_array(tile_data)

			expect(tile.internal_lines).toEqual(["1ab3", "7dc4"])
			expect(tile.lines).toEqual([1,0,1,1,0,0,1,0])
			expect(tile.dots).toEqual([1,1,1,1])
		})
	})

	describe(".add_line", () => {
		it("added line correctly set in tile", () => {
			let tile = new TileModel()

			tile.add_line("1ad6")
			tile.add_line("2bc5")
			expect(tile.internal_lines).toEqual(["1ad6", "2bc5"])
			expect(tile.lines).toEqual([1,1,0,0,1,1,0,0])
			expect(tile.dots).toEqual([1,1,1,1])
		})
	})

	describe(".copy", () => {

		it("copied tile contains correct data", () => {
			let tile = TileModel.from_array(["1ad6"])
			let copy = tile.copy()

			expect(copy.internal_lines).toEqual(["1ad6"])
			expect(copy.lines).toEqual([1,0,0,0,0,1,0,0])
			expect(copy.dots).toEqual([1,0,0,1])
		})
	})

	describe(".reset", () => {
		it("tile is properly reset", () => {
			let tile = TileModel.from_array(["1ad6", "2bc5"])
			tile.reset()

			expect(tile.lines).toEqual([0,0,0,0,0,0,0,0])
			expect(tile.dots).toEqual([0,0,0,0])
		})
	})
})
