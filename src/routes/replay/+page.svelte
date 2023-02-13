<script>
    import Notes from "$lib/notes/index.svelte";
    let isSuccess = false;
</script>
<Notes />
<div class="flex flex-1 items-center justify-center">
    <div
        class="flex min-h-[400px] max-w-4xl overflow-hidden rounded-2xl bg-white p-3 text-black"
    >
        <div class="flex flex-1 flex-col justify-center gap-3 px-10">
            <h2 class="my-10 text-center text-2xl font-bold">
                Save your Discover Weekly
            </h2>
            <h3>Name your Backup:</h3>
            <input
                type="text"
                placeholder="New Playlist Name"
                class="input !text-primary-content"
            />
            <button class="btn-primary btn block" type="submit">
                Backup Now
            </button>
        </div>
        <div
            class="flex w-5/12 flex-col justify-center bg-[#f9f5f2] p-12 text-center"
        >
            <h1 class="my-10 text-3xl">What is RePLAY?</h1>
            <p>
                Replay is a simple tool that lets you backup your discover
                weekly playlist at the press of a button!
            </p>
            <p>
                For those times you find yourself frequently forgetting to
                listen to the whole of it and the clock is ticking towards
                midnight on the final day.
            </p>
        </div>
    </div>
</div>
