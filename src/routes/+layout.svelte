<script lang="ts">
    import "./app.css";
    import Navbar from "$lib/navbar.svelte";
</script>

<div class="flex min-h-screen flex-col">
    <Navbar />
    <div class="flex-1 flex">
        <slot />
    </div>
</div>
