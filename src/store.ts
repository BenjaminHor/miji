import { writable } from 'svelte/store';

export const count = writable("HELLO");

export const tile_catalog = writable([])