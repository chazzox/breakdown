<script>
    import { page } from "$app/stores";
    import { signOut } from "@auth/sveltekit/client";
</script>

<nav class="navbar bg-accent shadow-xl text-accent-content">
    <div class="flex-1">
        <a
            data-sveltekit-reload
            href="/"
            class="btn btn-ghost normal-case text-xl"
        >
            {#if $page.data.session}
                <div class="avatar">
                    <div class="w-10 mr-2 rounded-full">
                        <img
                            src={$page.data.session?.user?.image}
                            alt="user profile"
                        />
                    </div>
                </div>
            {/if}
            breakdown
        </a>
    </div>
    <div class="flex-none">
        {#if $page.data.session}
            <ul class="menu menu-horizontal px-1">
                <li>
                    <button
                        class="btn btn-primary px-8 text-primary-content"
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
