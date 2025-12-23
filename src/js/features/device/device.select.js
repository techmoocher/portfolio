import { toggleTypingVisibility } from "../../animations/typing.js";
import { enableMusicFeature, disableMusicFeature } from "../music/music.player.js";
import { showLaunchOverlay, hideLaunchOverlay } from "../../ui/overlay.js";

let devicePreference = null;

export function initializeDeviceSelection() {
  const deviceModal = document.getElementById("device-selection-modal");

  devicePreference = null;
  document.body.removeAttribute("data-device-mode");
  hideLaunchOverlay(true);
  disableMusicFeature();

  if (!deviceModal) return;

  const options = deviceModal.querySelectorAll(".device-option");
  options.forEach((option) => option.classList.remove("active"));

  if (!deviceModal.dataset.bound) {
    options.forEach((option) => {
      option.addEventListener("click", () => {
        const device = option.dataset.device || "desktop";
        applyDevicePreference(device);
      });
    });
    deviceModal.dataset.bound = "true";
  }

  deviceModal.style.display = "flex";
  deviceModal.style.opacity = "1";
  deviceModal.style.pointerEvents = "auto";
  deviceModal.classList.add("visible");
}

export function resetDevicePreference() {
  initializeDeviceSelection();
}

function applyDevicePreference(device) {
  const normalizedDevice = device === "mobile" ? "mobile" : "desktop";
  devicePreference = normalizedDevice;

  document.body.setAttribute("data-device-mode", normalizedDevice);
  highlightDeviceOption(normalizedDevice);
  toggleTypingVisibility(normalizedDevice);

  if (normalizedDevice === "desktop") {
    enableMusicFeature();
  } else {
    disableMusicFeature();
  }

  hideDeviceSelectionModal();
  const launchMessage =
    normalizedDevice === "desktop" ? "Launching desktop experience..." : "Launching mobile experience...";
  showLaunchOverlay(launchMessage);
}

function highlightDeviceOption(device) {
  const deviceModal = document.getElementById("device-selection-modal");
  if (!deviceModal) return;

  const options = deviceModal.querySelectorAll(".device-option");
  options.forEach((option) => {
    if (option.dataset.device === device) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });
}

function hideDeviceSelectionModal() {
  const deviceModal = document.getElementById("device-selection-modal");
  if (deviceModal) {
    deviceModal.classList.remove("visible");
    deviceModal.style.display = "";
    deviceModal.style.opacity = "";
    deviceModal.style.pointerEvents = "";
  }
}
