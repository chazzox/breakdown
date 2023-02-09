<script>
    import Notes1 from "$lib/notes/notes.svelte";
    import Notes2 from "$lib/notes/notes2.svelte";
    import Notes3 from "$lib/notes/notes3.svelte";
    import Notes4 from "$lib/notes/notes4.svelte";
    import { signIn } from "@auth/sveltekit/client";
</script>

<div class="hero flex-1 bg-base-300">
    <div class="hero-overlay">
        <Notes1
            class="h-52 fill-white/10 fixed left-[70vw] top-[45vh] rotate-[35deg]"
        />
        <Notes3
            class="h-52 fill-white/10 fixed -left-[4vh] top-[10vh] -rotate-[25deg]"
        />
        <Notes4
            class="h-52 fill-white/10 fixed left-[17vw] top-[62vh] rotate-[15deg]"
        />
    </div>
    <div
        class="hero-content text-center text-primary-content bg-primary rounded-2xl shadow-2xl mb-36"
    >
        <div class="max-w-2xl">
            <h1 class="mb-5 text-5xl font-bold">Hello!</h1>
            <p class="mb-5">
                I've decided to roll my multiple spotify api projects into one.
                So here it is! In this project you can backup your discover
                weekly playlists and also breakdown your playlist genres.
                Enjoy...!
            </p>
            <button
                class="btn btn-secondary mt-3"
                on:click={() => signIn("spotify", { callbackUrl: "/" })}
            >
                Get Started
            </button>
        </div>
    </div>
</div>
