<script lang="ts">
    import { page } from "$app/stores";

    const session = $page.data.session;

    const statusCodeSuccess = [200, 201];

    async function fetchAllPlaylists(token: string) {
        const playlists: Playlist[] = [];
        let next: string | null = "https://api.spotify.com/v1/me/playlists";

        // fetch until we know that the user has no more playlists
        while (next) {
            const res = await fetch(next, {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            });

            const jsonResponse: any = await res.json();
            if (res.status !== 200 && res.status !== 201) {
                throw jsonResponse.error.message;
            }
            playlists.push(...(jsonResponse.items as Playlist[]));
            next = jsonResponse.next;
        }

        return playlists;
    }

    const playListPromise = fetchAllPlaylists(session?.access_token || "");
</script>

<div class="flex flex-1 justify-center items-center">
    <div class="bg-base-300 p-10 rounded-xl shadow-2xl flex flex-col gap-4">
        <h1 class="text-2xl">Welcome to breakdown</h1>
        <p>Please select the playlist you wish to analyze below</p>
        <div class="flex flex-wrap max-w-5xl gap-4 justify-center">
            {#await playListPromise then userList}
                {#each userList as playlist}
                    <a
                        class="btn btn-accent text-accent-content"
                        href={`/p/${playlist.id}`}
                    >
                        <div class="avatar">
                            <div class="w-10 mr-2 rounded-full">
                                <img
                                    src={playlist.images[0].url}
                                    alt="user profile"
                                />
                            </div>
                        </div>
                        <p>{playlist.name}</p>
                    </a>
                {/each}
            {:catch error}
                <p class="text-warning">Something went wrong: {error}</p>
            {/await}
        </div>
    </div>
</div>
