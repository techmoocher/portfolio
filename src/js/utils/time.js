export function updateDateTime() {
  const now = new Date();
  const options = { month: "short", day: "numeric", year: "numeric" };
  const dateString = now.toLocaleDateString("en-US", options);

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  const timeString = `${hours}:${minutes} ${ampm}`;
  const dateTimeEl = document.getElementById("datetime");
  if (dateTimeEl) {
    dateTimeEl.textContent = `${dateString} @ ${timeString}`;
  }
}
