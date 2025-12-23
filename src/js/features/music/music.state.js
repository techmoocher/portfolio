export const musicState = {
	isEnabled: false,
	isInitialized: false,
	songModalEventsBound: false,
	isPlaying: false,
	isShuffle: true,
	currentSongIndex: 0,
	playedSongs: [],
	songs: [
		{ title: "Interstellar Main Theme", artist: "Hans Zimmer" },
		{ title: "Nang Tho", artist: "Hoang Dung" },
		{ title: "Perfect", artist: "Ed Sheeran" },
		{ title: "Someone You Loved", artist: "Lewis Capaldi" },
		{ title: "Something Just Like This", artist: "The Chainsmokers & Coldplay" },
		{ title: "Welcome to America", artist: "Lecrae" },
		{ title: "Your Way's Better", artist: "Forrest Frank" },
	],
};

export function resetPlaybackHistory() {
	musicState.currentSongIndex = 0;
	musicState.playedSongs = [];
}
