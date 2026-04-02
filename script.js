// =====================
// LIGHTBOX
// =====================
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

// =====================
// NAVBAR HIDE / SHOW
// =====================
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

// =====================
// HERO SCROLL EFFECT
// =====================
const heroSection = document.querySelector(".hero-scroll-section");
const heroImg = document.querySelector(".hero-sticky-frame img");
const heroOverlay = document.querySelector(".hero-overlay");

function getTextExitDistance() {
  if (!heroOverlay) return 0;

  const overlayRect = heroOverlay.getBoundingClientRect();

  // how far the text needs to move upward so its bottom clears the top of the viewport
  return overlayRect.top + overlayRect.height + 80;
}

function setHeroSectionHeight() {
  if (!heroSection || !heroImg || !heroOverlay) return;

  const imageHeight = heroImg.getBoundingClientRect().height;
  const viewportHeight = window.innerHeight;
  const croppedTop = 200;

  // longer pinned intro so image does not begin scrolling until text is fully gone
  const introScroll = Math.max(viewportHeight * 0.9, getTextExitDistance());

  heroSection.style.height = `${imageHeight - croppedTop + introScroll}px`;
}

function updateHeroOverlay() {
  if (!heroSection || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // use the same intro distance here as in setHeroSectionHeight
  const introScroll = Math.max(viewportHeight * 0.9, getTextExitDistance());

  const scrolled = Math.min(Math.max(-rect.top, 0), introScroll);
  const rawProgress = Math.min(scrolled / introScroll, 1);

  // smooth Apple-like easing
  const easedProgress =
    rawProgress < 0.5
      ? 4 * rawProgress * rawProgress * rawProgress
      : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

  // move text fully off the top of the screen
  const textTranslateY = easedProgress * -getTextExitDistance();

  heroOverlay.style.transform = `translateX(-50%) translateY(${textTranslateY}px)`;
  heroOverlay.style.opacity = 1;
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
  if (heroImg.complete) {
    setHeroSectionHeight();
  } else {
    heroImg.addEventListener("load", () => {
      setHeroSectionHeight();
      updateHeroOverlay();
    });
  }
}