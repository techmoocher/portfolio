import { showCopyToast } from "./toast.js";

export function initContactCopy() {
	const values = document.querySelectorAll(".contact-value");
	values.forEach((valueSpan) => {
		const value = valueSpan.textContent.trim();
		if (!value) return;

		const triggerCopy = (event) => {
			event.stopPropagation();
			copyToClipboard(value);
		};

		valueSpan.addEventListener("click", triggerCopy);
		valueSpan.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				triggerCopy(event);
			}
		});
	});
}

export function copyToClipboard(text) {
	if (!text) return;

	navigator.clipboard
		.writeText(text)
		.then(() => showCopyToast("Copied to clipboard"))
		.catch(() => showCopyToast("Copy failed"));
}
