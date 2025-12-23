export function setupModal(iconElement, modalElement) {
	if (!iconElement || !modalElement) return;

	const closeButton = modalElement.querySelector(".close-button");
	if (!closeButton) return;

	iconElement.addEventListener("click", () => {
		modalElement.classList.add("visible");
	});

	const hideModal = () => {
		modalElement.classList.remove("visible");
	};

	closeButton.addEventListener("click", hideModal);
	modalElement.addEventListener("click", (event) => {
		if (event.target === modalElement) hideModal();
	});

	const escHandler = (event) => {
		if (event.key === "Escape" && modalElement.classList.contains("visible")) {
			const projectDetailOverlay = document.querySelector(".project-detail-overlay.visible");
			if (projectDetailOverlay) return;
			hideModal();
		}
	};

	document.addEventListener("keydown", escHandler);
}
