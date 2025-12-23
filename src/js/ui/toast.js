export function showCopyToast(message) {
	const existing = document.querySelector(".copy-toast");
	if (existing) existing.remove();

	const toast = document.createElement("div");
	toast.className = "copy-toast";
	toast.textContent = message;
	document.body.appendChild(toast);

	requestAnimationFrame(() => {
		toast.classList.add("visible");
	});

	setTimeout(() => {
		toast.classList.remove("visible");
		setTimeout(() => toast.remove(), 250);
	}, 2500);
}
