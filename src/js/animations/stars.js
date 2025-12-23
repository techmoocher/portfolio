export function createStars() {
	const nightSky = document.querySelector(".night-sky");
	if (!nightSky) return;

	for (let i = 0; i < 200; i++) {
		const star = document.createElement("div");
		star.classList.add("star");

		const sizeClass = Math.random() < 0.6 ? "small" : Math.random() < 0.8 ? "medium" : "large";
		star.classList.add(sizeClass);

		const posX = Math.random() * 100;
		const posY = Math.random() * 100;

		star.style.left = `${posX}%`;
		star.style.top = `${posY}%`;

		const colors = ["#ffffff", "#fffae0", "#FFE87C", "#e0e8ff", "#e0f0ff", "#d1d1ff"];
		const randomColor = colors[Math.floor(Math.random() * colors.length)];
		star.style.backgroundColor = randomColor;

		const baseOpacity = Math.random() * 0.5 + 0.3;
		star.style.opacity = baseOpacity;

		if (Math.random() > 0.7) {
			star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px ${randomColor}`;
		}

		if (Math.random() > 0.5) {
			star.classList.add("blink");

			const duration = 2 + Math.random() * 6;
			const delay = Math.random() * 7;
			star.style.animationDuration = `${duration}s`;
			star.style.animationDelay = `${delay}s`;
		} else {
			const duration = 3 + Math.random() * 4;
			star.style.animation = `twinkle ${duration}s infinite ${Math.random() * 5}s`;
		}

		nightSky.appendChild(star);
	}

	setInterval(() => {
		const stars = document.querySelectorAll(".star");
		stars.forEach((star) => {
			if (Math.random() > 0.95) {
				star.style.opacity = Math.random() * 0.5 + 0.3;
			}
		});
	}, 3000);
}

export function createShootingStars() {
	const nightSky = document.querySelector(".night-sky");
	if (!nightSky) return;

	const existingStars = document.querySelectorAll(".shooting-star");
	existingStars.forEach((star) => star.remove());

	for (let i = 0; i < 6; i++) {
		const shootingStar = document.createElement("div");
		shootingStar.classList.add("shooting-star");

		const width = Math.random() * 150 + 50;
		shootingStar.style.width = `${width}px`;

		const startX = Math.random() * -100;
		const startY = Math.random() * window.innerHeight;

		shootingStar.style.left = `${startX}px`;
		shootingStar.style.top = `${startY}px`;

		const delay = Math.random() * 15;
		const duration = Math.random() * 2 + 2;

		shootingStar.style.animationDelay = `${delay}s`;
		shootingStar.style.animationDuration = `${duration}s`;

		nightSky.appendChild(shootingStar);
	}

	setTimeout(() => {
		createShootingStars();
	}, 8000);
}

export function addIntermittentBlinkingStars() {
	const nightSky = document.querySelector(".night-sky");
	if (!nightSky) return;

	setInterval(() => {
		if (Math.random() > 0.7) {
			const brightStar = document.createElement("div");
			brightStar.classList.add("star", "large");

			const posX = Math.random() * 100;
			const posY = Math.random() * 100;

			brightStar.style.left = `${posX}%`;
			brightStar.style.top = `${posY}%`;
			brightStar.style.backgroundColor = "#ffffff";
			brightStar.style.boxShadow = "0 0 8px 2px rgba(255, 255, 255, 0.8)";

			nightSky.appendChild(brightStar);

			setTimeout(() => {
				brightStar.style.animation = "blink 1s 3";
				setTimeout(() => {
					brightStar.remove();
				}, 3000);
			}, 100);
		}
	}, 2000);
}
