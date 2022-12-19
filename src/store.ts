import { writable } from 'svelte/store';

export const tile_catalog = writable([])
export const color_palettes = writable([])

export const config = writable({
	board_size: 2,
	current_theme: {},
	current_theme_name: ""
})