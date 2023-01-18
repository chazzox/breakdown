<script>
    import { signIn } from "@auth/sveltekit/client";
</script>

<div>
    <h1>login</h1>
    <button on:click={() => signIn("spotify", { callbackUrl: "/" })}>
        login button test
    </button>
</div>
