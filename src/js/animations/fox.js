export function initFox() {
	const fox = document.querySelector(".fox");
	if (!fox) return;

	let foxAnimationInProgress = false;

	fox.addEventListener("click", () => {
		if (foxAnimationInProgress) return;
		foxAnimationInProgress = true;

		fox.src = "assets/images/fox/fox-shock-left.png";

		setTimeout(() => {
			fox.src = "assets/images/fox/fox-post-trauma-left-1.png";
		}, 300);

		setTimeout(() => {
			fox.src = "assets/images/fox/fox-post-trauma-left-2.png";
		}, 600);

		setTimeout(() => {
			fox.src = "assets/images/fox/fox-idle-left.png";
		}, 1400);

		setTimeout(() => {
			fox.src = "assets/images/fox-sleeping.gif";
			foxAnimationInProgress = false;
		}, 2400);
	});
}
