let launchOverlayTimeout = null;
let launchOverlayHideTimeout = null;

export function showLaunchOverlay(message = "Launching...") {
	const overlay = document.getElementById("launch-overlay");
	if (!overlay) return;

	const textElement = overlay.querySelector(".launch-text");
	if (textElement) {
		textElement.textContent = message;
	}

	clearTimeout(launchOverlayHideTimeout);
	launchOverlayHideTimeout = null;
	overlay.removeAttribute("hidden");
	requestAnimationFrame(() => {
		overlay.classList.add("visible");
	});

	clearTimeout(launchOverlayTimeout);
	launchOverlayTimeout = setTimeout(() => {
		hideLaunchOverlay();
	}, 1400);
}

export function hideLaunchOverlay(immediate = false) {
	const overlay = document.getElementById("launch-overlay");
	if (!overlay) return;

	clearTimeout(launchOverlayTimeout);
	launchOverlayTimeout = null;

	if (immediate) {
		overlay.classList.remove("visible");
		overlay.setAttribute("hidden", "");
		clearTimeout(launchOverlayHideTimeout);
		launchOverlayHideTimeout = null;
		return;
	}

	if (!overlay.classList.contains("visible")) {
		overlay.setAttribute("hidden", "");
		clearTimeout(launchOverlayHideTimeout);
		launchOverlayHideTimeout = null;
		return;
	}

	overlay.classList.remove("visible");

	const handleTransitionEnd = () => {
		overlay.setAttribute("hidden", "");
		overlay.removeEventListener("transitionend", handleTransitionEnd);
		clearTimeout(launchOverlayHideTimeout);
		launchOverlayHideTimeout = null;
	};

	overlay.addEventListener("transitionend", handleTransitionEnd);

	clearTimeout(launchOverlayHideTimeout);
	launchOverlayHideTimeout = setTimeout(() => {
		overlay.setAttribute("hidden", "");
		launchOverlayHideTimeout = null;
	}, 500);
}
