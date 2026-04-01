function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "flex";

  requestAnimationFrame(() => {
    lightbox.classList.add("active");
  });
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");

  lightbox.classList.remove("active");

  setTimeout(() => {
    lightbox.style.display = "none";
  }, 300);
}

// Navbar hide/show on scroll
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 50) {
    navbar.classList.add("hidden");
  } else {
    navbar.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

// Hero scroll behavior
const heroSection = document.querySelector(".hero-scroll-section");
const heroImg = document.querySelector(".hero-sticky-frame img");
const heroOverlay = document.querySelector(".hero-overlay");

function setHeroSectionHeight() {
  if (!heroSection || !heroImg) return;

  const displayedImageHeight = heroImg.offsetHeight;
  const viewportHeight = window.innerHeight;
  const introScroll = viewportHeight * 0.45;

  heroSection.style.height = `${displayedImageHeight + introScroll}px`;
}

function updateHeroOverlay() {
  if (!heroSection || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const introScroll = viewportHeight * 0.45;

  const scrolled = Math.min(Math.max(-rect.top, 0), introScroll);
  const progress = Math.min(scrolled / introScroll, 1);

  const translateY = progress * -140;
  const opacity = 1 - progress;

  heroOverlay.style.transform = `translateX(-50%) translateY(${translateY}px)`;
  heroOverlay.style.opacity = opacity;
}

window.addEventListener("load", () => {
  setHeroSectionHeight();
  updateHeroOverlay();
});

window.addEventListener("resize", () => {
  setHeroSectionHeight();
  updateHeroOverlay();
});

window.addEventListener("scroll", updateHeroOverlay);

if (heroImg) {
  heroImg.addEventListener("load", () => {
    setHeroSectionHeight();
    updateHeroOverlay();
  });
}