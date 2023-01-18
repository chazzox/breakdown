<script>
    import { page } from "$app/stores";

    const playlist_id = $page.params.slug;

    fetch(
        `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=100`,
        {
            headers: {
                // @ts-ignore
                Authorization: `Bearer ${$page.data.session.accessToken}`,
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
</script>

<p>{playlist_id} spotify is the dumbest pos ive ever come across</p>
