function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;

  lightbox.style.display = "flex";

  // allow browser to register display change before animation
  setTimeout(() => {
    lightbox.classList.add("active");
  }, 10);
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  lightbox.classList.remove("active");

  // wait for animation to finish before hiding
  setTimeout(() => {
    lightbox.style.display = "none";
  }, 300);
}

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // scrolling down
    navbar.classList.add("hidden");
  } else {
    // scrolling up
    navbar.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});