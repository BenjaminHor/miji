import { writable } from 'svelte/store';

export const tile_catalog = writable([])
export const color_palettes = writable([])

export const current_theme = writable({})

export const config = writable({
	board_size: 2
})