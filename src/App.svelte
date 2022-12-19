<script lang="ts">
import { slide } from "svelte/types/runtime/transition";

import TileView from "./components/TileView.svelte";

import { Rotation, TileModel, Side } from "./models/tile_model";

let tile = TileModel.from_array(["1ab3", "7dc4"])
</script>

<TileView tile_model={tile}/>

<style>
</style>