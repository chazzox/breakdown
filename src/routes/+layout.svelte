<script lang="ts">
    import "./app.css";
    import Navbar from "$lib/navbar.svelte";
</script>

<div class="flex min-h-screen flex-col bg-neutral font-['Montserrat']">
    <Navbar />
    <div class="flex flex-1">
        <slot />
    </div>
</div>
