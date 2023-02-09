// @ts-expect-error
import { SPOTIFY_AUTH_ID, SPOTIFY_AUTH_SECRET } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import Spotify from "@auth/core/providers/spotify";
import { SvelteKitAuth } from "@auth/sveltekit";
import { sequence } from "@sveltejs/kit/hooks";

const middleware: Handle = async ({ event, resolve }) => {
    if (
        event.url.pathname !== "/login" &&
        event.url.pathname !== "/about" &&
        event.url.pathname !== "/api/auth/signin/google"
    ) {
        const session = await event.locals.getSession();
        if (!session) throw redirect(303, "/login");
    }

    // If the request is still here, just proceed as normally
    const result = await resolve(event, {
        transformPageChunk: ({ html }) => html,
    });
    return result;
};

const refetchToken = async (refresh_token: string) => {
    const req = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                new Buffer(
                    SPOTIFY_AUTH_ID + ":" + SPOTIFY_AUTH_SECRET
                ).toString("base64"),
            "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        }),
    });
    console.log(await req.json());
};

export const handle = sequence(
    SvelteKitAuth({
        providers: [
            // @ts-expect-error svelte adapter related issue :( fix should be out in later version
            Spotify({
                clientId: SPOTIFY_AUTH_ID,
                clientSecret: SPOTIFY_AUTH_SECRET,
            }),
        ],
        pages: { signIn: "/login" },
        callbacks: {
            async jwt({ token, account, user }) {
                if (account && user) {
                    token.access_token = account.access_token;
                    token.refresh_token = account.refresh_token;
                    token.expires_in =
                        new Date().getTime() +
                        (account?.expires_in || 0) * 1000;
                }
                // @ts-expect-error
                if (token.expires_in < new Date().getTime()) {
                    console.log("test", token?.refresh_token);

                    refetchToken((token?.refresh_token as string) || "");
                }
                return token;
            },
            async session({ session, token }) {
                // @ts-expect-error
                session.access_token = token.access_token;
                // @ts-expect-error
                session.refresh_token = token.refresh_token;
                // @ts-expect-error
                session.expires_in = token.expires_in;

                return session;
            },
        },
    }),
    middleware
);
