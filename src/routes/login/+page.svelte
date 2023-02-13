<script> 
    import Notes from "$lib/notes/index.svelte";
    import { signIn } from "@auth/sveltekit/client";
</script>

<div class="hero flex-1 px-3">
    <div class="hero-overlay">
        <Notes/>
    </div>
    <div
        class="hero-content text-center text-base-content bg-base-100 rounded-2xl shadow-2xl mb-36 max-w-2xl w-full"
    >
        <div class="flex-1">
            <h1 class="mb-5 text-5xl font-bold">Hello!</h1>
            <p class="mb-5">
                Decided to roll a bunch of spotify api stuff i made into one app
            </p>
            <ul class="list-disc list-inside font-bold">
                <li>RePlay - A service to backup your discover weekly</li>
                <li>
                    Breakdown - A service that lets you see the different genre
                    breakdown of a playlist
                </li>
            </ul>
            <button
                class="btn btn-secondary mt-3 px-20"
                on:click={() => signIn("spotify", { callbackUrl: "/" })}
            >
                Get Started
            </button>
        </div>
    </div>
</div>
