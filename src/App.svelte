<script lang="ts">
import TileView from "./components/TileView.svelte";
import { Rotation, TileModel, Side } from "./models/tile_model";

let tile = TileModel.from_array(["1abcd7"])
let tile2 = TileModel.from_array(["1ab", "7dc"])
</script>

<div>
	<TileView tile_model={tile}/>
	<TileView tile_model={tile2}/>
</div>

<style>
</style>