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
                    token.expires = account.expires;
                }

                console.log("jwt-account", account);
                console.log("jwt-token", token);

                return token;
            },
            async session({ session, token }) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.expires = token.expires;
                console.log("session-session", session);
                console.log("session-token", token);

                return session;
            },
        },
    }),
    middleware
);
