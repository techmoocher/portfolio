import { musicState, resetPlaybackHistory } from "./music.state.js";
import { renderSongList } from "./music.library.js";

let audioPlayer;
let coverArt;
let songTitle;
let songArtist;
let playBtn;
let prevBtn;
let nextBtn;
let shuffleBtn;
let volumeBtn;
let volumeContainer;
let volumeSlider;
let volumeProgress;
let volumeHandle;
let progressBar;
let progress;
let currentTimeEl;
let totalTimeEl;
let libraryBtn;
let musicWidget;

export function initMusicPlayer() {
  cacheElements();
  if (!audioPlayer || !playBtn || !progressBar) return;

  if (!musicState.isInitialized) {
    bindPlayerEvents();
    startPlayer();
    musicState.isInitialized = true;
  }

  bindLibraryOpeners();
}

export function enableMusicFeature() {
  document.body.classList.remove("music-disabled");

  if (libraryBtn) {
    libraryBtn.disabled = false;
    libraryBtn.removeAttribute("aria-hidden");
  }

  if (musicWidget) {
    musicWidget.removeAttribute("aria-hidden");
    musicWidget.removeAttribute("aria-disabled");
  }

  bindSongListModalEvents();
  if (!musicState.isInitialized) {
    initMusicPlayer();
  }

  musicState.isEnabled = true;
}

export function disableMusicFeature() {
  document.body.classList.add("music-disabled");

  const songListModal = document.getElementById("song-list-modal");

  if (libraryBtn) {
    libraryBtn.disabled = true;
    libraryBtn.setAttribute("aria-hidden", "true");
  }

  if (musicWidget) {
    musicWidget.setAttribute("aria-hidden", "true");
    musicWidget.setAttribute("aria-disabled", "true");
    musicWidget.classList.remove("active");
  }

  if (songListModal) {
    songListModal.classList.remove("visible");
  }

  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  musicState.isEnabled = false;
}

export function openSongLibrary() {
  if (!musicState.isEnabled) return;

  const modal = document.getElementById("song-list-modal");
  if (!modal) return;

  bindSongListModalEvents();
  renderSongList({
    songs: musicState.songs,
    currentSongIndex: musicState.currentSongIndex,
    onPlay: playSongFromLibrary,
    tryLoadImage,
  });
  modal.classList.add("visible");
}

function startPlayer() {
  resetPlaybackHistory();
  musicState.isShuffle = true;

  musicState.currentSongIndex = Math.floor(Math.random() * musicState.songs.length);
  musicState.playedSongs.push(musicState.currentSongIndex);

  loadSong(musicState.songs[musicState.currentSongIndex]);

  audioPlayer.volume = 1.0;
  updateVolumeUI();

  shuffleBtn.classList.add("active");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBtn.title = "Play";
  musicState.isPlaying = false;
}

function cacheElements() {
  audioPlayer = document.getElementById("audio-player");
  coverArt = document.getElementById("cover-art");
  songTitle = document.getElementById("song-title");
  songArtist = document.getElementById("song-artist");
  playBtn = document.getElementById("play-btn");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  shuffleBtn = document.getElementById("shuffle-btn");
  volumeBtn = document.getElementById("volume-btn");
  volumeContainer = document.querySelector(".volume-container");
  volumeSlider = document.querySelector(".volume-slider");
  volumeProgress = document.querySelector(".volume-progress");
  volumeHandle = document.querySelector(".volume-handle");
  progressBar = document.getElementById("progress-bar");
  progress = document.getElementById("progress");
  currentTimeEl = document.getElementById("current-time");
  totalTimeEl = document.getElementById("total-time");
  libraryBtn = document.getElementById("library-btn");
  musicWidget = document.getElementById("music-widget");
}

function bindPlayerEvents() {
  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  shuffleBtn.addEventListener("click", toggleShuffle);
  volumeBtn.addEventListener("click", toggleVolumeControls);
  volumeSlider.addEventListener("click", setVolume);
  volumeHandle.addEventListener("mousedown", startVolumeHandleDrag);
  volumeHandle.addEventListener("touchstart", startVolumeHandleDrag, { passive: false });
  progressBar.addEventListener("click", setProgress);

  audioPlayer.addEventListener("timeupdate", updateProgress);
  audioPlayer.addEventListener("ended", nextSong);

  document.addEventListener("click", (e) => {
    if (volumeContainer.classList.contains("active") && !volumeContainer.contains(e.target) && e.target !== volumeBtn) {
      volumeContainer.classList.remove("active");
    }
  });
}

function bindLibraryOpeners() {
  if (musicWidget && !musicWidget.dataset.bound) {
    musicWidget.addEventListener("click", () => openSongLibrary());
    musicWidget.dataset.bound = "true";
  }

  if (libraryBtn && !libraryBtn.dataset.bound) {
    libraryBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      openSongLibrary();
    });
    libraryBtn.dataset.bound = "true";
  }
}

function loadSong(song) {
  const folderName = song.title.replace(/\s+/g, "-").replace(/'/g, "");
  const fileName = `${song.title.replace(/\s+/g, "-").replace(/'/g, "")}_${song.artist.replace(/\s+/g, "-").replace(/'/g, "")}.mp3`;

  const basePath = `assets/music/${folderName}`;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  audioPlayer.src = `${basePath}/${fileName}`;

  tryLoadImage(`${basePath}/thumbnail.jpg`)
    .catch(() => tryLoadImage(`${basePath}/thumbnail.png`))
    .catch(() => tryLoadImage(`${basePath}/thumbnail.jpeg`))
    .catch(() => (coverArt.src = "assets/images/techmoocher.png"))
    .then((src) => {
      if (src) coverArt.src = src;
    });

  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  progress.style.width = "0%";
  currentTimeEl.textContent = "0:00";
}

function tryLoadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject();
    img.src = src;
  });
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.title = "Pause";
    musicState.isPlaying = true;
  } else {
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.title = "Play";
    musicState.isPlaying = false;
  }
}

function nextSong() {
  if (musicState.isShuffle) {
    if (musicState.playedSongs.length >= musicState.songs.length) {
      resetPlaybackHistory();
    }

    const unplayedSongs = musicState.songs.filter((song, index) => !musicState.playedSongs.includes(index));

    if (unplayedSongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      const nextSongIndex = musicState.songs.findIndex(
        (song, i) => song.title === unplayedSongs[randomIndex].title && song.artist === unplayedSongs[randomIndex].artist,
      );

      musicState.currentSongIndex = nextSongIndex;
      musicState.playedSongs.push(musicState.currentSongIndex);
    } else {
      musicState.currentSongIndex = Math.floor(Math.random() * musicState.songs.length);
      musicState.playedSongs = [musicState.currentSongIndex];
    }
  } else {
    musicState.currentSongIndex = (musicState.currentSongIndex + 1) % musicState.songs.length;
  }

  loadSong(musicState.songs[musicState.currentSongIndex]);
  if (musicState.isPlaying) {
    audioPlayer.play().then(() => {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
  }
  markActiveSong(musicState.songs[musicState.currentSongIndex]);
}

function prevSong() {
  musicState.currentSongIndex = (musicState.currentSongIndex - 1 + musicState.songs.length) % musicState.songs.length;
  loadSong(musicState.songs[musicState.currentSongIndex]);
  if (musicState.isPlaying) {
    audioPlayer.play().then(() => {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
  }
  markActiveSong(musicState.songs[musicState.currentSongIndex]);
}

function toggleShuffle() {
  musicState.isShuffle = !musicState.isShuffle;
  if (musicState.isShuffle) {
    shuffleBtn.classList.add("active");
    shuffleBtn.title = "Shuffle: On";
  } else {
    shuffleBtn.classList.remove("active");
    shuffleBtn.title = "Shuffle: Off";
  }
}

function toggleVolumeControls() {
  if (audioPlayer.volume > 0) {
    volumeBtn.dataset.previousVolume = audioPlayer.volume;
    audioPlayer.volume = 0;
  } else {
    const previousVolume = parseFloat(volumeBtn.dataset.previousVolume) || 1.0;
    audioPlayer.volume = previousVolume;
  }
  updateVolumeUI();
}

function updateVolumeUI() {
  volumeProgress.style.width = `${audioPlayer.volume * 100}%`;
  volumeHandle.style.left = `${audioPlayer.volume * 100}%`;

  if (audioPlayer.volume > 0.5) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeBtn.title = "Volume: High";
  } else if (audioPlayer.volume > 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    volumeBtn.title = "Volume: Low";
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeBtn.title = "Volume: Mute";
  }
}

function setVolume(e) {
  const rect = volumeSlider.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  let volumePercent = clickX / rect.width;

  volumePercent = Math.max(0, Math.min(1, volumePercent));
  audioPlayer.volume = volumePercent;

  updateVolumeUI();
}

function startVolumeHandleDrag(e) {
  e.preventDefault();
  volumeHandle.classList.add("active");
  volumeContainer.classList.add("active");

  document.addEventListener("mousemove", handleVolumeDrag);
  document.addEventListener("touchmove", handleVolumeDrag, { passive: false });
  document.addEventListener("mouseup", stopVolumeHandleDrag);
  document.addEventListener("touchend", stopVolumeHandleDrag);
}

function handleVolumeDrag(e) {
  const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;

  const rect = volumeSlider.getBoundingClientRect();
  const dragX = clientX - rect.left;
  let volumePercent = dragX / rect.width;

  volumePercent = Math.max(0, Math.min(1, volumePercent));
  audioPlayer.volume = volumePercent;

  updateVolumeUI();

  if (e.cancelable) e.preventDefault();
}

function stopVolumeHandleDrag() {
  volumeHandle.classList.remove("active");

  document.removeEventListener("mousemove", handleVolumeDrag);
  document.removeEventListener("touchmove", handleVolumeDrag);
  document.removeEventListener("mouseup", stopVolumeHandleDrag);
  document.removeEventListener("touchend", stopVolumeHandleDrag);

  setTimeout(() => {
    if (!volumeContainer.matches(":hover")) {
      volumeContainer.classList.remove("active");
    }
  }, 1500);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function setProgress(e) {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  if (duration) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
}

function updateProgress() {
  const { duration, currentTime } = audioPlayer;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    totalTimeEl.textContent = formatTime(duration);
  }
}

function bindSongListModalEvents() {
  if (musicState.songModalEventsBound) return;

  const modal = document.getElementById("song-list-modal");
  if (!modal) return;

  const closeButton = modal.querySelector(".close-button");
  const hideModal = () => modal.classList.remove("visible");

  if (closeButton) {
    closeButton.addEventListener("click", hideModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
  });

  document.addEventListener("keydown", handleSongListKeydown);
  musicState.songModalEventsBound = true;
}

function handleSongListKeydown(event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("song-list-modal");
    if (modal && modal.classList.contains("visible")) {
      modal.classList.remove("visible");
    }
  }
}

function markActiveSong(song) {
  const songItems = document.querySelectorAll(".song-item");
  songItems.forEach((item) => {
    item.classList.remove("active");
    const playButton = item.querySelector(".song-item-play");
    if (playButton) {
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }

    const titleEl = item.querySelector(".song-item-title");
    const artistEl = item.querySelector(".song-item-artist");
    if (titleEl && artistEl && titleEl.textContent === song.title && artistEl.textContent === song.artist) {
      item.classList.add("active");
      if (playButton) {
        playButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    }
  });
}

function playSongFromLibrary(song) {
  const songIndex = musicState.songs.findIndex((s) => s.title === song.title && s.artist === song.artist);
  if (songIndex === -1) return;

  musicState.currentSongIndex = songIndex;
  musicState.playedSongs.push(songIndex);

  loadSong(song);

  audioPlayer
    .play()
    .then(() => {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      playBtn.title = "Pause";
      musicState.isPlaying = true;
      markActiveSong(song);
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
    });

  const modal = document.getElementById("song-list-modal");
  if (modal) {
    modal.classList.remove("visible");
  }
}
