function openLightbox(src, element) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  // get clicked image position
  const rect = element.getBoundingClientRect();

  img.src = src;

  // set starting position (same as clicked image)
  img.style.top = rect.top + "px";
  img.style.left = rect.left + "px";
  img.style.width = rect.width + "px";
  img.style.height = rect.height + "px";

  lightbox.style.display = "block";

  // force reflow so browser registers initial position
  img.getBoundingClientRect();

  // animate to fullscreen
  setTimeout(() => {
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "auto";
    img.style.height = "100vh";
    img.style.maxWidth = "100vw";
  }, 10);
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  // reverse animation
  img.style.transform = "none";

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