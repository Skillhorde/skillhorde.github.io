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

const heroSection = document.querySelector(".hero-scroll-section");
const heroOverlay = document.querySelector(".hero-overlay");

function updateHeroOverlay() {
  if (!heroSection || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const sectionHeight = heroSection.offsetHeight;
  const viewportHeight = window.innerHeight;

  // total scroll distance through the sticky section
  const totalScrollable = sectionHeight - viewportHeight;

  // how far user has scrolled through that section
  const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);

  // only use the first part of the scroll for text animation
  const textAnimationDistance = viewportHeight * 0.45;
  const progress = Math.min(scrolled / textAnimationDistance, 1);

  const translateY = progress * -220;
  const opacity = 1 - progress;

  heroOverlay.style.transform = `translateX(-50%) translateY(${translateY}px)`;
  heroOverlay.style.opacity = opacity;
}

window.addEventListener("scroll", updateHeroOverlay);
window.addEventListener("load", updateHeroOverlay);
window.addEventListener("resize", updateHeroOverlay);