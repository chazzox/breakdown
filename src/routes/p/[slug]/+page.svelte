<script lang="ts">
    // @ts-expect-error
    import { page } from "$app/stores";
    import * as d3 from "d3";
    import { onMount } from "svelte";

    const playlist_id = $page.params.slug;

    const fetchAlbumIds = async (pl_id: string): Promise<string[]> => {
        const req = await fetch(
            `https://api.spotify.com/v1/playlists/${pl_id}/tracks`,
            {
                headers: {
                    // @ts-ignore
                    Authorization: `Bearer ${$page.data.session.access_token}`,
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
                Authorization: `Bearer ${$page.data.session.access_token}`,
            },
        });

        const res = await req.json();
        return res;
    };

    let asdfasdf: any[] = [];

    onMount(async () => {
        var data = [2, 4, 8, 10];

        var svg = d3.select("svg"),
            width = parseInt(svg.attr("width")),
            height = parseInt(svg.attr("height")),
            radius = Math.min(width, height) / 2.5,
            g = svg
                .append("g")
                .attr(
                    "transform",
                    "translate(" + width / 2 + "," + height / 2 + ")"
                );

        var color = d3.scaleOrdinal([
            "#4daf4a",
            "#377eb8",
            "#ff7f00",
            "#984ea3",
            "#e41a1c",
        ]);

        // Generate the pie
        var pie = d3.pie();

        // Generate the arcs
        var arc = d3.arc().innerRadius(0).outerRadius(radius);

        const res = await fetchArtistInfo(fetchAlbumIds(playlist_id));

        // @ts-expect-error
        const flatten_res = res.artists.map((v) => v.genres).flat();
        asdfasdf = flatten_res;
        const test = Object.fromEntries(
            Array.from(new Set(flatten_res)).map((v) => [
                v,
                100 *
                    // @ts-expect-error
                    (flatten_res.find((a) => a == v)?.length /
                        res.artists.length),
            ])
        );

        //Generate groups
        var arcs = g
            .selectAll("arc")
            .data(pie(Object.values(test)))
            .enter()
            .append("g")
            .attr("class", "arc");

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function (d, i) {
                // @ts-expect-error
                return color(i);
            })
            // @ts-expect-error
            .attr("d", arc);
    });
</script>

<div>
    <p>{playlist_id} spotify is the dumbest pos ive ever come across</p>
    <p>{asdfasdf}</p>
    <p>
        {(asdfasdf?.find((v) => v.includes("jazz"))?.length / asdfasdf.length) *
            100}
    </p>
    <svg width="500" height="400" />
</div>

<style>
    :global(.arc text) {
        font: 10px sans-serif;
        text-anchor: middle;
    }

    :global(.arc path) {
        stroke: #fff;
    }

    :global(.arc :hover) {
        transform: scale(1.15);
        transition: transform 0.5s;
    }

    :global(.title) {
        fill: teal;
        font-weight: bold;
    }
    :global(.chart :global(div)) {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>
