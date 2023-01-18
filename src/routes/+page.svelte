<script lang="ts">
    import { page } from "$app/stores";

    const session = $page.data.session;

    enum SpotifyTypes {
        user = "user",
        playlist = "playlist",
        track = "track",
    }

    interface SpotifyImage {
        height: number | null;
        url: string;
        width: number | null;
    }
    interface UserInfo {
        display_name: string;
        external_urls: { spotify: string };
        followers: { href: null; total: 15 };
        href: string;
        id: string;
        images: SpotifyImage[];
        type: SpotifyTypes.user;
    }

    interface Playlist {
        collaborative: boolean;
        description: string;
        external_urls: { spotify: string };
        href: string;
        id: string;
        images: SpotifyImage[];
        name: string;
        owner: UserInfo;
        primary_color: string | null;
        public: boolean;
        snapshot_id: string;
        tracks: { href: string };
        type: SpotifyTypes.playlist;
        uri: string;
    }

    interface AllPlaylists {
        href: string;
        items: Playlist[];
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
    }

    const statusCodeSuccess = [200, 201];
    let userList: Playlist[] = [];
    async function fetchAllPlaylists(token: string) {
        const playlists: Playlist[] = [];
        let next: string | null = "https://api.spotify.com/v1/me/playlists";

        // fetch until we know that the user has no more playlists
        while (next) {
            const res = await fetch(next, {
                method: "GET",
                headers: { Authorization: "Bearer " + token },
            });

            const jsonResponse = (await res.json()) as AllPlaylists;
            if (!statusCodeSuccess.includes(res.status)) {
                console.error("Playlist fetch Unsuccessful", jsonResponse);
                next = null;
                continue;
            }
            playlists.push(...jsonResponse.items);
            next = jsonResponse.next;
        }

        return playlists;
    }

    // @ts-expect-error
    fetchAllPlaylists(session?.accessToken).then((playlists) => {
        userList = playlists;
    });
    let choice = "";

    const nav = () => {};
</script>

<div class="flex flex-1 justify-center items-center">
    <div class="bg-base-300 p-10 rounded-xl shadow-2xl flex flex-col gap-4">
        <h1 class="text-2xl">Welcome to breakdown</h1>
        <p>Please select the playlist you wish to analyze below</p>
        <div class="flex flex-wrap max-w-5xl gap-4 justify-center">
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
        </div>
    </div>
</div>
