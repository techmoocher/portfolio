export function setupFakeCursor() {
	const fox = document.querySelector(".fox");
	if (!fox) return;

	const fakeCursor = document.createElement("div");
	fakeCursor.classList.add("fake-cursor");
	document.body.appendChild(fakeCursor);

	const showCursorHint = () => {
		const updatedFoxRect = fox.getBoundingClientRect();

		const cursorX = updatedFoxRect.left + updatedFoxRect.width * 0.6;
		const cursorY = updatedFoxRect.top + updatedFoxRect.height * 0.4;

		fakeCursor.style.left = `${cursorX}px`;
		fakeCursor.style.top = `${cursorY}px`;

		fakeCursor.classList.add("visible");

		setTimeout(() => {
			fakeCursor.classList.add("clicking");

			setTimeout(() => {
				fakeCursor.classList.remove("clicking");

				setTimeout(() => {
					fakeCursor.classList.remove("visible");
				}, 1000);
			}, 300);
		}, 800);
	};

	setInterval(showCursorHint, 10000);
	setTimeout(showCursorHint, 5000);
}
