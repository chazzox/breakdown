<script lang="ts">
    import "./app.css";
    import { page } from "$app/stores";
    import Navbar from "$lib/navbar.svelte";
</script>

<div>
    <Navbar />
    <slot />
</div>
