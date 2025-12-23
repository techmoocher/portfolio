/******
    _              _                                _ 
   | |            | |                              | |
 __| |___ ___  ___| |__  __ _ ___   ___   ___   ___| |__   ___  _ __
|__   __ / _ \/ __|  _ \|  _ ‘ _ \ / _ \ / _ \ / __|  _ \ / _ \/  __\
   | |_ |  __/ (__| | | | | | | | | (_) | (_) | (__| | | |  __/| |
   \_ _ /\___/\___|_| |_|_| |_| |_|\___/ \___/ \___|_| |_|\___/|_|

******/

import { createStars, createShootingStars, addIntermittentBlinkingStars } from "./animations/stars.js";
import { initTypingAnimation } from "./animations/typing.js";
import { setupFakeCursor } from "./animations/fakeCursor.js";
import { initFox } from "./animations/fox.js";

import { setupModal } from "./ui/modal.js";
import { initContactCopy } from "./ui/clipboard.js";

import { initializeProjectTiles } from "./features/projects/projects.init.js";
import { initializeDeviceSelection } from "./features/device/device.select.js";
import { initContactCard } from "./features/contact/contact.card.js";
import { initImageCarousel, openGalleryFolder } from "./features/gallery/gallery.js";

import { updateDateTime } from "./utils/time.js";

import { initMusicPlayer } from "./features/music/music.player.js";

document.addEventListener("DOMContentLoaded", () => {
  createStars();
  createShootingStars();
  addIntermittentBlinkingStars();

  updateDateTime();
  setInterval(updateDateTime, 1000);

  const bioIcon = document.getElementById("bio-icon");
  const bioModal = document.getElementById("bio-modal");
  const miscIcon = document.getElementById("miscellaneous-icon");
  const miscModal = document.getElementById("miscellaneous-modal");
  const galleryIcon = document.getElementById("gallery-icon");
  const galleryModal = document.getElementById("gallery-modal");
  const projectsIcon = document.getElementById("projects-icon");
  const projectsModal = document.getElementById("projects-modal");

  setupModal(bioIcon, bioModal);
  setupModal(miscIcon, miscModal);
  setupModal(galleryIcon, galleryModal);
  setupModal(projectsIcon, projectsModal);

  const showPhotoBtn = document.getElementById("show-photo-btn");
  const photoModal = document.getElementById("photo-modal");
  if (showPhotoBtn && photoModal) {
    showPhotoBtn.addEventListener("click", () => photoModal.classList.add("visible"));
    const closeBtn = photoModal.querySelector(".close-button");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => photoModal.classList.remove("visible"));
    }
    photoModal.addEventListener("click", (event) => {
      if (event.target === photoModal) {
        photoModal.classList.remove("visible");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && photoModal.classList.contains("visible")) {
        photoModal.classList.remove("visible");
      }
    });
  }

  if (miscIcon) {
    miscIcon.addEventListener("click", initImageCarousel);
  }

  document.querySelectorAll(".folder-item").forEach((folder) => {
    folder.addEventListener("click", () => {
      const folderName = folder.getAttribute("data-folder");
      if (folderName) {
        openGalleryFolder(folderName);
      }
    });
  });

  initTypingAnimation();
  setupFakeCursor();
  initFox();

  initializeProjectTiles();
  initContactCopy();
  initContactCard();

  initMusicPlayer();

  initializeDeviceSelection();
});