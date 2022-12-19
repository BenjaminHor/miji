<script lang="ts">
import TileView from "./components/TileView.svelte";
import { Rotation, TileModel, Side } from "./models/tile_model";

let tile = TileModel.from_array(["1abcd7"])
</script>

<div>
	<TileView tile_model={tile}/>
</div>

<style>
</style>