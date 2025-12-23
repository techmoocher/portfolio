export function renderSongList({ songs, currentSongIndex, onPlay, tryLoadImage }) {
    const songListContainer = document.querySelector(".song-list");
    if (!songListContainer || !Array.isArray(songs) || songs.length === 0) return;

    songListContainer.innerHTML = "";

    const sortedSongs = [...songs].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

    const searchContainer = document.createElement("div");
    searchContainer.className = "song-search-container";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search songs...";
    searchInput.className = "song-search-input";

    searchContainer.appendChild(searchInput);
    songListContainer.appendChild(searchContainer);

    const songListWrapper = document.createElement("div");
    songListWrapper.className = "song-list-wrapper";
    songListContainer.appendChild(songListWrapper);

    const currentSong = songs[currentSongIndex] || songs[0];

    sortedSongs.forEach((song) => {
        const folderName = song.title.replace(/\s+/g, "-").replace(/'/g, "");
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");

        const isCurrentlyPlaying = song.title === currentSong.title && song.artist === currentSong.artist;
        if (isCurrentlyPlaying) {
            songItem.classList.add("active");
        }

        const basePath = `assets/music/${folderName}`;

        const thumbnail = document.createElement("img");
        thumbnail.classList.add("song-thumbnail");
        thumbnail.src = "assets/images/techmoocher.png";

        if (typeof tryLoadImage === "function") {
            tryLoadImage(`${basePath}/thumbnail.jpg`)
                .catch(() => tryLoadImage(`${basePath}/thumbnail.png`))
                .catch(() => tryLoadImage(`${basePath}/thumbnail.jpeg`))
                .then((src) => {
                    if (src) thumbnail.src = src;
                });
        }

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("song-info-container");

        const titleEl = document.createElement("div");
        titleEl.classList.add("song-item-title");
        titleEl.textContent = song.title;

        const artistEl = document.createElement("div");
        artistEl.classList.add("song-item-artist");
        artistEl.textContent = song.artist;

        infoContainer.appendChild(titleEl);
        infoContainer.appendChild(artistEl);

        const playBtn = document.createElement("button");
        playBtn.classList.add("song-item-play");
        playBtn.innerHTML = isCurrentlyPlaying ? `<i class="fas fa-volume-up"></i>` : `<i class="fas fa-play"></i>`;
        playBtn.setAttribute("aria-label", `Play ${song.title}`);

        songItem.appendChild(thumbnail);
        songItem.appendChild(infoContainer);
        songItem.appendChild(playBtn);

        const handlePlay = () => {
            if (typeof onPlay === "function") onPlay(song);
        };

        songItem.addEventListener("click", handlePlay);
        playBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            handlePlay();
        });

        songListWrapper.appendChild(songItem);
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();

        document.querySelectorAll(".song-item").forEach((item) => {
            const title = item.querySelector(".song-item-title").textContent.toLowerCase();
            const artist = item.querySelector(".song-item-artist").textContent.toLowerCase();

            if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });

    setTimeout(() => searchInput.focus(), 300);
}