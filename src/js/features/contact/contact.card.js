export function initContactCard() {
  const contactWidget = document.getElementById("contact-widget");
  const contactCard = document.getElementById("contact-card");
  const closeContact = document.querySelector(".close-contact");

  if (!contactWidget || !contactCard || !closeContact) return;

  contactWidget.addEventListener("click", () => {
    contactCard.classList.toggle("visible");
  });

  closeContact.addEventListener("click", () => {
    contactCard.classList.remove("visible");
  });

  document.addEventListener("click", (event) => {
    if (
      !contactCard.contains(event.target) &&
      !contactWidget.contains(event.target) &&
      contactCard.classList.contains("visible")
    ) {
      contactCard.classList.remove("visible");
    }
  });

  document.querySelectorAll(".widget-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
    });
  });
}
