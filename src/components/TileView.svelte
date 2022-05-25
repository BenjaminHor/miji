<script lang="ts">
import { Rotation, TileModel } from "../models/tile_model";

export let tile_model: TileModel
let tile_size = 300
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

	for (let line of tile.internal_lines) {
		for (let i = 0; i < line.length - 1; i++) {
			let key = format_key(line[i], line[i + 1])
			line_mapping[key].visibility = "visible"
		}

		// Check if a dot should be rendered
		// Line should end with [a, b, c, d]
		if (isNaN(parseInt(line[line.length - 1]))) {
			dot_mapping[line[line.length - 1]].visibility = "visible"
		}
	}
}

function format_key(symbol1: string, symbol2: string): string {
	let symbols = [symbol1, symbol2]
	return symbols.sort().join('')
}

function click_handler() {
	tile_model.rotate(Rotation.QUARTER)
	render_tile(tile_model)
}

render_tile(tile_model)
</script>

<!-- HTML -->

<div>{tile_model.internal_lines}</div>
<div>{tile_model.lines}</div>
<div>{tile_model.dots}</div>

<div class="tile"
style:--size="{tile_size}px"
on:click={click_handler}
>
	<div class="vertical line q1_north" style:visibility={line_mapping["1a"].visibility}></div>
	<div class="horizontal line q1_west" style:visibility={line_mapping["8a"].visibility}></div>
	<div class="vertical line q2_north" style:visibility={line_mapping["2b"].visibility}></div>
	<div class="horizontal line q2_east" style:visibility={line_mapping["3b"].visibility}></div>
	<div class="horizontal line q3_east" style:visibility={line_mapping["4c"].visibility}></div>
	<div class="vertical line q3_south" style:visibility={line_mapping["5c"].visibility}></div>
	<div class="vertical line q4_south" style:visibility={line_mapping["6d"].visibility}></div>
	<div class="horizontal line q4_west" style:visibility={line_mapping["7d"].visibility}></div>

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

	.tile {
		position: relative;
		width: var(--size);
		height: var(--size);
		background-color: var(--tile-color);
		border-radius: 15%;
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
		/* background-color: lightgreen; */
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		left: calc(30% - (var(--vertical-line-width) / 2));
	}

	.q2_north {
		/* background-color: lightgreen; */
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.q3_south {
		/* background-color: lightgreen; */
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		top: calc(100% - var(--vertical-line-height));
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.q4_south {
		/* background-color: lightgreen; */
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		top: calc(100% - var(--vertical-line-height));
		left: calc(30% - (var(--vertical-line-width) / 2));
	}

	.q1_west {
		/* background-color: lightblue; */
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		top: calc(30% - (var(--horizontal-line-height) / 2));
	}

	.q2_east {
		/* background-color: lightblue; */
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		top: calc(30% - (var(--horizontal-line-height) / 2));
		left: calc(100% - var(--horizontal-line-width));
	}

	.q3_east {
		/* background-color: lightblue; */
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
		top: calc(70% - (var(--horizontal-line-height) / 2));
		left: calc(100% - var(--horizontal-line-width));
	}

	.q4_west {
		/* background-color: lightblue; */
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		top: calc(70% - (var(--horizontal-line-height) / 2));
	}

	.center_north {
		/* background-color: lightcoral; */
		width: var(--center-line-length);
		top: calc(30% - (var(--horizontal-line-height) / 2));
		left: calc(50% - (var(--center-line-length) / 2));
	}

	.center_south {
		/* background-color: lightcoral; */
		width: var(--center-line-length);
		top: calc(70% - (var(--horizontal-line-height) / 2));
		left: calc(50% - (var(--center-line-length) / 2));
	}

	.center_east {
		/* background-color: lightcoral; */
		height: var(--center-line-length);
		top: calc(50% - (var(--center-line-length) / 2));
		left: calc(70% - (var(--vertical-line-width) / 2));
	}

	.center_west {
		/* background-color: lightcoral; */
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