import { SvelteKitAuth } from "@auth/sveltekit";
import Spotify from "@auth/core/providers/spotify";
import { SPOTIFY_AUTH_ID, SPOTIFY_AUTH_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
    providers: [
        // @ts-expect-error svelte adapter related issue :( fix should be out in later version
        Spotify({
            clientId: SPOTIFY_AUTH_ID,
            clientSecret: SPOTIFY_AUTH_SECRET,
        }),
    ],
});
