<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
</script>

<nav class="navbar bg-base-300 shadow-xl">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">breakdown</a>
    </div>
    <div class="flex-none">
        {#if $page.data.session}
            <ul class="menu menu-horizontal px-1">
                <li>
                    <button
                        class="btn-primary rounded-xl px-8"
                        on:click={signOut}
                        data-sveltekit-preload-data="off"
                    >
                        Sign out
                    </button>
                </li>
            </ul>
        {/if}
    </div>
</nav>
