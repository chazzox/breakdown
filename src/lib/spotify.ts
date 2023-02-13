const statusCodeSuccess = [200, 201];

async function getUserId(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });
    if (!statusCodeSuccess.includes(result.status))
        throw Error("Creating new playlist was unsuccessful");
    const jsonResponse = (await result.json()) as UserInfo;
    return jsonResponse.id;
}

async function createNewPlaylist(token: string, userId: string, name: string) {
    const result = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            method: "POST",
            headers: { Authorization: "Bearer " + token },
            body: JSON.stringify({
                name: name,
                description: "New playlist description",
                public: false,
            }),
        }
    );
    if (!statusCodeSuccess.includes(result.status))
        throw Error("Creating new playlist was unsuccessful");
    const jsonResponse = (await result.json()) as Playlist;

    return jsonResponse.id;
}

async function getPlaylistByName(token, name) {
    const userPlaylists = await fetchAllPlaylists(token);
    for (const item in userPlaylists)
        if (userPlaylists[item].name === name) return userPlaylists[item];
    throw Error(
        "Could not find Discover weekly playlist in followed playlists"
    );
}

async function fetchAllPlaylists(token: string) {
    const playlists: Playlist[] = [];
    let next: string | null =
        "https://api.spotify.com/v1/me/playlists?limit=50";
    // fetch until we know that the user has no more playlists
    while (next) {
        const res = await fetch(next, {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        });
        if (!statusCodeSuccess.includes(res.status))
            throw Error("Playlist fetch Unsuccessful");
        const jsonResponse = (await res.json()) as AllPlaylists;
        playlists.push(...jsonResponse.items);
        next = jsonResponse.next;
    }

    return playlists;
}

async function getTrackList(token: string, url: string) {
    // since we know that discover weekly playlists are 30 songs max, there is no need to check if we need to refetch
    const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });
    const jsonResponse = (await res.json()) as TrackList;

    if (!statusCodeSuccess.includes(res.status))
        throw Error("Fetching Discover weekly tracklist failed");
    return jsonResponse.items;
}

async function addSongs(token: string, playlistId: string, songs: string[]) {
    const requestUrl = new URL(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    );
    requestUrl.searchParams.append("uris", songs.join());
    const response = await fetch(requestUrl.toString(), {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
    });
    if (!statusCodeSuccess.includes(response.status))
        throw Error("Adding songs failed");
}
