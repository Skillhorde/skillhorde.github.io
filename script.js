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

const heroItem = document.querySelector(".hero-gallery-item");
const heroOverlay = document.querySelector(".hero-overlay");

function updateHeroOverlay() {
  if (!heroItem || !heroOverlay) return;

  const rect = heroItem.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // How far the hero has moved upward relative to the viewport
  const progress = Math.min(Math.max((0 - rect.top) / (windowHeight * 0.6), 0), 1);

  // Move text upward as user scrolls
  const translateY = progress * -120;

  // Fade text out as user scrolls
  const opacity = 1 - progress;

  heroOverlay.style.transform = `translateX(-50%) translateY(${translateY}px)`;
  heroOverlay.style.opacity = opacity;
}

window.addEventListener("scroll", updateHeroOverlay);
window.addEventListener("load", updateHeroOverlay);
window.addEventListener("resize", updateHeroOverlay);