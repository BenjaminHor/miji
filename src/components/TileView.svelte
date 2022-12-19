<script lang="ts">
import { Rotation, TileModel } from "../models/tile_model";
import * as TileController from "../controllers/tile_controller"

export let tile_model: TileModel

let line_mapping = {}
let dot_mapping = {}

function reset_view() {
	line_mapping = {
		"1a": { visibility: "hidden" },
		"2b": { visibility: "hidden" },
		"3b": { visibility: "hidden" },
		"4c": { visibility: "hidden" },
		"5c": { visibility: "hidden" },
		"6d": { visibility: "hidden" },
		"7d": { visibility: "hidden" },
		"8a": { visibility: "hidden" },
		"ab": { visibility: "hidden" },
		"bc": { visibility: "hidden" },
		"cd": { visibility: "hidden" },
		"ad": { visibility: "hidden" },
	}
	dot_mapping = {
		"a": { visibility: "hidden" },
		"b": { visibility: "hidden" },
		"c": { visibility: "hidden" },
		"d": { visibility: "hidden" },
	}
}

function render_tile(tile: TileModel) {
	reset_view()

	function format_key(symbol1: string, symbol2: string): string {
		let symbols = [symbol1, symbol2]
		return symbols.sort().join('')
	}

	for (let line of tile.internal_lines) {
		for (let i = 0; i < line.length - 1; i++) {
			let key = format_key(line[i], line[i + 1])
			line_mapping[key].visibility = "visible"
		}

		if (isNaN(parseInt(line[line.length - 1]))) {
			dot_mapping[line[line.length - 1]].visibility = "visible"
		}
	}
}

let prev_rotation = 0
let curr_rotation = 0

function click_handler(event) {
	let node = document.getElementById(tile_model.id)

	curr_rotation = curr_rotation + 1
	node.style.setProperty("--prev-rotation", `${prev_rotation * 90}deg`)
	node.style.setProperty("--curr-rotation", `${curr_rotation * 90}deg`)
	prev_rotation = curr_rotation

	node.classList.remove("rotate_animation")
	void node.offsetWidth
	node.classList.add("rotate_animation")

	TileController.rotate(tile_model, Rotation.QUARTER)
}

render_tile(tile_model)
</script>

<!-- HTML -->

<div
id={tile_model.id}
class="tile"
on:click={click_handler}
>
	<div class="vertical line q1_north" style:visibility={line_mapping["1a"].visibility}></div>
	<div class="vertical line q2_north" style:visibility={line_mapping["2b"].visibility}></div>
	<div class="horizontal line q2_east" style:visibility={line_mapping["3b"].visibility}></div>
	<div class="horizontal line q3_east" style:visibility={line_mapping["4c"].visibility}></div>
	<div class="vertical line q3_south" style:visibility={line_mapping["5c"].visibility}></div>
	<div class="vertical line q4_south" style:visibility={line_mapping["6d"].visibility}></div>
	<div class="horizontal line q4_west" style:visibility={line_mapping["7d"].visibility}></div>
	<div class="horizontal line q1_west" style:visibility={line_mapping["8a"].visibility}></div>

	<div class="horizontal line center_north" style:visibility={line_mapping["ab"].visibility}></div>
	<div class="vertical line center_east" style:visibility={line_mapping["bc"].visibility}></div>
	<div class="horizontal line center_south" style:visibility={line_mapping["cd"].visibility}></div>
	<div class="vertical line center_west" style:visibility={line_mapping["ad"].visibility}></div>

	<div class="dot a" style:visibility={dot_mapping["a"].visibility}></div>
	<div class="dot b" style:visibility={dot_mapping["b"].visibility}></div>
	<div class="dot c" style:visibility={dot_mapping["c"].visibility}></div>
	<div class="dot d" style:visibility={dot_mapping["d"].visibility}></div>
</div>

<!-- CSS -->

<style>
	:root {
		--vertical-line-width: 13%;
		--vertical-line-height: calc(var(--vertical-line-width) * 0.5 + 30%);
		--horizontal-line-width: var(--vertical-line-height);
		--horizontal-line-height: var(--vertical-line-width);
		--center-line-length: calc(var(--vertical-line-width) + 40%);
		--dot-size: 30%;

		--line-color: white;
		--dot-color: white;
		--tile-color: slategrey;
	}

	div {
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		-webkit-transform-style: preserve-3d;
		-webkit-transform:translate3d(0,0,0);
	}

	.tile {
		position: relative;
		background-color: var(--tile-color);
		border-radius: 15%;
		border-style: solid;
		border-width: 5px;
		border-color: rgb(97, 122, 148);
	}

	:global(.rotate_animation) {
		animation-name: rotation;
		animation-duration: 150ms;
		animation-fill-mode: forwards;
	}

	@keyframes rotation {
		from {
			transform: rotate(var(--prev-rotation));
		}
		to {
			transform: rotate(var(--curr-rotation));
		}
	}

	.line {
		position: absolute;
		background-color: var(--line-color);
		border-radius: 100px;
	}

	.dot {
		position: absolute;
		background-color: var(--dot-color);
		border-radius: 50%;
		width: var(--dot-size);
		height: var(--dot-size);
	}

	.vertical {
		width: var(--vertical-line-width);
		height: var(--vertical-line-height);
	}

	.horizontal {
		width: var(--horizontal-line-width);
		height: var(--horizontal-line-height);
	}

	.q1_north {
		left: calc(30% - (var(--vertical-line-width) / 2));
	}

	.q2_north {
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.q3_south {
		top: calc(100% - var(--vertical-line-height));
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.q4_south {
		top: calc(100% - var(--vertical-line-height));
		left: calc(30% - (var(--vertical-line-width) / 2));
	}

	.q1_west {
		top: calc(30% - (var(--horizontal-line-height) / 2));
	}

	.q2_east {
		top: calc(30% - (var(--horizontal-line-height) / 2));
		left: calc(100% - var(--horizontal-line-width));
	}

	.q3_east {
		top: calc(70% - (var(--horizontal-line-height) / 2));
		left: calc(100% - var(--horizontal-line-width));
	}

	.q4_west {
		top: calc(70% - (var(--horizontal-line-height) / 2));
	}

	.center_north {
		width: var(--center-line-length);
		top: calc(30% - (var(--horizontal-line-height) / 2));
		left: calc(50% - (var(--center-line-length) / 2));
	}

	.center_south {
		width: var(--center-line-length);
		top: calc(70% - (var(--horizontal-line-height) / 2));
		left: calc(50% - (var(--center-line-length) / 2));
	}

	.center_east {
		height: var(--center-line-length);
		top: calc(50% - (var(--center-line-length) / 2));
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.center_west {
		height: var(--center-line-length);
		top: calc(50% - (var(--center-line-length) / 2));
		left: calc(30% - (var(--vertical-line-width) / 2))
	}

	.a {
		top: calc(30% - (var(--dot-size) / 2));
		left: calc(30% - (var(--dot-size) / 2));
	}

	.b {
		top: calc(30% - (var(--dot-size) / 2));
		left: calc(70% - (var(--dot-size) / 2));
	}

	.c {
		top: calc(70% - (var(--dot-size) / 2));
		left: calc(70% - (var(--dot-size) / 2));
	}

	.d {
		top: calc(70% - (var(--dot-size) / 2));
		left: calc(30% - (var(--dot-size) / 2));
	}
</style>