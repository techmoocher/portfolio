export function initTypingAnimation() {
	const isMobile = document.body.getAttribute("data-device-mode") === "mobile";
	if (isMobile) {
		toggleTypingVisibility("mobile");
		return;
	}

	const textElement = document.getElementById("typing-text");
	if (!textElement) return;

	const plainText = "Welcome to ";
	const highlightText = "techmoocher's portfolio";
	const exclamation = "!";

	const fullText = plainText + highlightText + exclamation;
	let index = 0;
	let isTyping = true;
	const typingSpeed = 90;
	const erasingSpeed = 30;
	const pauseTime = 1500;

	const updateText = () => {
		if (isTyping) {
			index += 1;

			if (index <= plainText.length) {
				textElement.innerHTML = fullText.substring(0, index);
			} else if (index <= plainText.length + highlightText.length) {
				const highlightPart = highlightText.substring(0, index - plainText.length);
				textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
			} else {
				textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightText}</span>${fullText.substring(plainText.length + highlightText.length, index)}`;
			}

			if (index >= fullText.length) {
				isTyping = false;
				setTimeout(updateText, pauseTime);
				return;
			}

			setTimeout(updateText, typingSpeed);
		} else {
			index -= 1;

			if (index > plainText.length + highlightText.length) {
				textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightText}</span>${fullText.substring(plainText.length + highlightText.length, index)}`;
			} else if (index > plainText.length) {
				const highlightPart = highlightText.substring(0, index - plainText.length);
				textElement.innerHTML = `${plainText}<span class="tech-highlight">${highlightPart}</span>`;
			} else {
				textElement.innerHTML = fullText.substring(0, index);
			}

			if (index === 0) {
				isTyping = true;
				setTimeout(updateText, pauseTime);
				return;
			}

			setTimeout(updateText, erasingSpeed);
		}
	};

	setTimeout(updateText, pauseTime);
}

export function toggleTypingVisibility(mode) {
	const typingContainer = document.querySelector(".typing-container");
	if (!typingContainer) return;

	if (mode === "mobile") {
		typingContainer.classList.add("typing-hidden");
	} else {
		typingContainer.classList.remove("typing-hidden");
	}
}
