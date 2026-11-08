const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
const dateInput = document.getElementById("bookingDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10);
dateInput.min = localToday;

const form = document.getElementById("bookingForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const message = [
    "Hello! I would like to request a barber appointment.",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Preferred date: ${data.date}`,
    `Preferred time: ${data.time}`,
    data.notes ? `Notes: ${data.notes}` : ""
  ].filter(Boolean).join("\\n");
  // Replace this number with the shop's verified WhatsApp number (international format, digits only).
  const whatsappNumber = "";
  if (!whatsappNumber) {
    status.textContent = "Your request is ready. Add the shop's verified WhatsApp number in script.js to send it. No appointment has been booked yet.";
    return;
  }
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  status.textContent = "WhatsApp opened with your appointment request. The shop must confirm your booking.";
});