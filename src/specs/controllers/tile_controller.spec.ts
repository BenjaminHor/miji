import { TileModel, Side, Rotation } from "../../models/tile_model"
import { does_tile_fit, rotate } from "../../controllers/tile_controller"

describe("tile_controller.ts", () => {
	describe(".does_tile_fit", () => {
		it("temp", () => {
			let tile = TileModel.from_array(["1ad6"])
			let tile_2 = TileModel.from_array(["1ab3", "7dc4"])

			let result = does_tile_fit(tile, tile_2, Side.SOUTH)

			expect(result).toBeTruthy()
		})
	})

	describe(".rotate", () => {
		it("rotates tile 0 degrees", () => {
			let tile = TileModel.from_array(["1ad6"])
			rotate(tile, Rotation.NONE)

			expect(tile.internal_lines).toEqual(["1ad6"])
		})
		it("rotates tile 90 degrees", () => {
			let tile = TileModel.from_array(["1ad6"])
			rotate(tile, Rotation.QUARTER)

			expect(tile.internal_lines).toEqual(["3ba8"])
		})
		it("rotates tile 180 degrees", () => {
			let tile = TileModel.from_array(["1ad6"])
			rotate(tile, Rotation.HALF)

			expect(tile.internal_lines).toEqual(["5cb2"])
		})
		it("rotates tile 270 degrees", () => {
			let tile = TileModel.from_array(["1ad6"])
			rotate(tile, Rotation.THREE_QUARTER)

			expect(tile.internal_lines).toEqual(["7dc4"])
		})
		it("rotates tile 360 degrees", () => {
			let tile = TileModel.from_array(["1ad6"])
			rotate(tile, Rotation.FULL)

			expect(tile.internal_lines).toEqual(["1ad6"])
		})
	})
})
