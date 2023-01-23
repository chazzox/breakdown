<script lang="ts">
    import { page } from "$app/stores";

    const playlist_id = $page.params.slug;

    const fetchAlbumIds = async (pl_id: string): Promise<string[]> => {
        const req = await fetch(
            `https://api.spotify.com/v1/playlists/${pl_id}/tracks`,
            {
                headers: {
                    // @ts-ignore
                    Authorization: `Bearer ${$page.data.session.accessToken}`,
                },
            }
        );
        const data = (await req.json()) as { items: any[] };

        const result = data.items
            // @ts-ignore
            .reduce((pv: any[], cv: any[]) => [...pv, ...cv.track.artists], [])
            .map((artist: any) => artist.id);

        return result;
    };

    const fetchArtistInfo = async (album_ids: Promise<string[]>) => {
        const url = new URL("https://api.spotify.com/v1/artists/");
        url.searchParams.append(
            "ids",
            (await album_ids).slice(0, 49).join(",")
        );
        url.searchParams.append("market", "GB");

        const req = await fetch(url, {
            headers: {
                // @ts-ignore
                Authorization: `Bearer ${$page.data.session.accessToken}`,
            },
        });

        const res = await req.json();
        console.log(res);
        return res;
    };

    const res = fetchArtistInfo(fetchAlbumIds(playlist_id));
</script>

<p>{playlist_id} spotify is the dumbest pos ive ever come across</p>

{#await res}
    <h1>fetching stuff</h1>
{:then result}
    {result.artists.map(
        // @ts-ignore
        (v) => v.genres
    )}
{:catch}
    <h1>something went wrong whoop</h1>
{/await}
