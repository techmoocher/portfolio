const miscImages = [
  { src: "assets/images/misc/my-zoo.png", caption: "tech zoo" },
  { src: "assets/images/misc/arghhh.jpg", caption: "arghhhhhhh!!!" },
  { src: "assets/images/misc/home.jpg", caption: "coding vibe 👨‍💻" },
  { src: "assets/images/misc/old-thingy.jpg", caption: "didn't know what this is at first glance, am I too young?" },
  { src: "assets/images/misc/with-her.png", caption: "with her 🥰" },
  { src: "assets/images/misc/thinkpad-collection.jpg", caption: "3 ThinkPads (and still counting)." },
  { src: "assets/images/misc/hkico-2025-with-hphong.jpg", caption: "HKICO 2025 with fav friend." },
  { src: "assets/images/misc/piano.jpg", caption: "🎹🎼🎶" },
  { src: "assets/images/misc/labour.jpg", caption: "😅😵‍💫" },
  { src: "assets/images/misc/statue-of-liberty.jpg", caption: "🗽" },
  { src: "assets/images/misc/gambling.jpg", caption: "Wanna do some blackjack? ♠️♦️" },
  { src: "assets/images/misc/church-moments/im-the-pope.jpg", caption: "I'm the Pope! (hehe)" },
  { src: "assets/images/misc/church-moments/secret-meeting.jpg", caption: "Shhh...This is a secret meeting!" },
  { src: "assets/images/misc/church-moments/singing.jpg", caption: "🎤🎶" },
  { src: "assets/images/misc/church-moments/santa.jpg", caption: "Ho Ho Ho! 🎅" },
  { src: "assets/images/misc/camp-moments/cit-25.jpg", caption: "CIT 2025!!! 🔥🕯️" },
  { src: "assets/images/misc/camp-moments/hehe.jpg", caption: "😂😂😂" },
  { src: "assets/images/misc/camp-moments/with-ignacio-and-javier.jpg", caption: "best mirror selfie ever 😎" },
  { src: "assets/images/misc/camp-moments/shark-tank.jpg", caption: "Shark Tank 🦈💼" },
];

const folderImages = {
  camp: [
    { src: "assets/images/misc/camp-moments/staff-2025.jpg", caption: "First time on staff - CIT'25" },
    { src: "assets/images/misc/camp-moments/staff-bio-2025.jpg", caption: "First Staff bio - CIT'25" },
    { src: "assets/images/misc/camp-moments/cabin-2-2024.jpg", caption: "Cabin 2 - LIT'24" },
    { src: "assets/images/misc/camp-moments/cabin-3-2025.jpg", caption: "Cabin 3 - CIT'25" },
    { src: "assets/images/misc/camp-moments/cabin-slime-war.jpg", caption: "Slimey-est cabin!" },
    { src: "assets/images/misc/camp-moments/lit-game.jpg", caption: "LIT'24 was LIT! 🕯️" },
    { src: "assets/images/misc/camp-moments/cit-25.jpg", caption: "CIT'25 was 🔥" },
    { src: "assets/images/misc/camp-moments/fav-pic.jpg", caption: "Fav pic w/ my fav camper!" },
    { src: "assets/images/misc/camp-moments/fav-lits.jpg", caption: "With my fav LIT'24 peers." },
    { src: "assets/images/misc/camp-moments/in-the-pines.jpg", caption: "In the Pines building forts." },
    { src: "assets/images/misc/camp-moments/with-javier.jpg", caption: "Swim across the lake w/ Javier." },
    { src: "assets/images/misc/camp-moments/with-ignacio-and-javier.jpg", caption: "Will visit Spain one day to meet these guys!" },
    { src: "assets/images/misc/camp-moments/with-patrycius.jpg", caption: "Best bunkmate!" },
    { src: "assets/images/misc/camp-moments/after-the-dance.jpg", caption: "Us after the dance (never sweated as much as this)." },
    { src: "assets/images/misc/camp-moments/shark-tank.jpg", caption: "Shark Tank - CIT'25" },
  ],
  church: [
    { src: "assets/images/misc/church-moments/im-the-pope.jpg", caption: "(hehe) 😁😁😁" },
    { src: "assets/images/misc/church-moments/santa.jpg", caption: "Santa's little helper!" },
    { src: "assets/images/misc/church-moments/church-choir.jpg", caption: "my favorite people! 💖" },
    { src: "assets/images/misc/church-moments/singing.jpg", caption: "One day I started singing and I found I'm not that bad 🎤" },
    { src: "assets/images/misc/church-moments/xmas-2024.jpg", caption: "Make some noise!" },
    { src: "assets/images/misc/church-moments/secret-meeting.jpg", caption: "Secret council 😶‍🌫️" },
    { src: "assets/images/misc/church-moments/fav-people.jpg", caption: "My favorite crew!" },
  ],
};

export function initImageCarousel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const captionElement = document.querySelector(".carousel-caption");
  const currentPhotoElement = document.getElementById("current-photo");
  const totalPhotosElement = document.getElementById("total-photos");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!carouselInner || !captionElement || !currentPhotoElement || !totalPhotosElement || !prevBtn || !nextBtn)
    return;

  totalPhotosElement.textContent = miscImages.length.toString();
  carouselInner.innerHTML = "";

  miscImages.forEach((image, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.caption;

    item.appendChild(img);
    carouselInner.appendChild(item);
  });

  if (miscImages.length > 0) {
    captionElement.textContent = miscImages[0].caption;
  }

  let currentIndex = 0;
  let rotationInterval;

  const updateCarousel = () => {
    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item) => item.classList.remove("active"));

    items[currentIndex].classList.add("active");

    captionElement.textContent = miscImages[currentIndex].caption;
    currentPhotoElement.textContent = (currentIndex + 1).toString();
  };

  const rotateImages = () => {
    currentIndex = (currentIndex + 1) % miscImages.length;
    updateCarousel();
  };

  prevBtn.addEventListener("click", () => {
    clearInterval(rotationInterval);
    currentIndex = (currentIndex - 1 + miscImages.length) % miscImages.length;
    updateCarousel();
    startRotation();
  });

  nextBtn.addEventListener("click", () => {
    clearInterval(rotationInterval);
    currentIndex = (currentIndex + 1) % miscImages.length;
    updateCarousel();
    startRotation();
  });

  const startRotation = () => {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateImages, 8000);
  };

  startRotation();
}

export function openGalleryFolder(folderName) {
  const folderModal = document.createElement("div");
  folderModal.classList.add("modal-overlay", "visible");

  folderModal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 class="modal-title">${folderName.charAt(0).toUpperCase() + folderName.slice(1)}</h2>
            <div class="image-counter"><span id="folder-current-photo">1</span> of <span id="folder-total-photos">0</span> photos</div>
            <div class="image-carousel">
                <div class="carousel-container">
                    <button class="carousel-nav prev-btn">&lt;</button>
                    <div class="carousel-inner folder-carousel"></div>
                    <button class="carousel-nav next-btn">&gt;</button>
                </div>
                <div class="carousel-caption"></div>
            </div>
        </div>
    `;

  document.body.appendChild(folderModal);

  const images = folderImages[folderName] || [];
  const carouselInner = folderModal.querySelector(".folder-carousel");
  const captionElement = folderModal.querySelector(".carousel-caption");
  const currentPhotoElement = folderModal.querySelector("#folder-current-photo");
  const totalPhotosElement = folderModal.querySelector("#folder-total-photos");

  if (!carouselInner || !captionElement || !currentPhotoElement || !totalPhotosElement) return;

  totalPhotosElement.textContent = images.length.toString();

  images.forEach((image, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.caption;

    item.appendChild(img);
    carouselInner.appendChild(item);
  });

  if (images.length > 0) {
    captionElement.textContent = images[0].caption;
  }

  let currentIndex = 0;
  const prevBtn = folderModal.querySelector(".prev-btn");
  const nextBtn = folderModal.querySelector(".next-btn");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });
  }

  const updateCarousel = () => {
    const items = folderModal.querySelectorAll(".carousel-item");
    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");
    captionElement.textContent = images[currentIndex].caption;
    currentPhotoElement.textContent = (currentIndex + 1).toString();
  };

  const closeButton = folderModal.querySelector(".close-button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      folderModal.classList.remove("visible");
      setTimeout(() => folderModal.remove(), 300);
    });
  }

  folderModal.addEventListener("click", (event) => {
    if (event.target === folderModal) {
      folderModal.classList.remove("visible");
      setTimeout(() => folderModal.remove(), 300);
    }
  });

  document.addEventListener("keydown", function escCloseHandler(event) {
    if (event.key === "Escape" && folderModal.classList.contains("visible")) {
      folderModal.classList.remove("visible");
      setTimeout(() => folderModal.remove(), 300);
      document.removeEventListener("keydown", escCloseHandler);
    }
  });
}
