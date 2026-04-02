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

let heroIntroScroll = 0;
let heroTextExitDistance = 0;

function measureHeroAnimation() {
  if (!heroSection || !heroImg || !heroOverlay) return;

  // Reset to resting state before measuring
  heroOverlay.style.transform = "translateX(-50%) translateY(0)";
  heroOverlay.style.opacity = "1";

  const imageHeight = heroImg.getBoundingClientRect().height;
  const viewportHeight = window.innerHeight;
  const overlayRect = heroOverlay.getBoundingClientRect();
  const croppedTop = 200;

  // Distance needed to move text fully above viewport
  heroTextExitDistance = overlayRect.top + overlayRect.height + 80;

  // Add a short buffer after text exits so the release feels softer
  const textScrollDistance = Math.max(viewportHeight * 0.9, heroTextExitDistance);
  const releaseBuffer = viewportHeight * 0.18;

  heroIntroScroll = textScrollDistance + releaseBuffer;

  heroSection.style.height = `${imageHeight - croppedTop + heroIntroScroll}px`;
}

function updateHeroOverlay() {
  if (!heroSection || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const scrolled = Math.min(Math.max(-rect.top, 0), heroIntroScroll || 1);

  // Text finishes before the full intro scroll ends
  const textPhaseEnd = heroIntroScroll * 0.82;
  const rawProgress = Math.min(scrolled / textPhaseEnd, 1);

  // Smooth Apple-like easing
  const easedProgress =
    rawProgress < 0.5
      ? 4 * rawProgress * rawProgress * rawProgress
      : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

  const textTranslateY = easedProgress * -heroTextExitDistance;

  heroOverlay.style.transform = `translateX(-50%) translateY(${textTranslateY}px)`;
  heroOverlay.style.opacity = "1";
}

function refreshHeroAnimation() {
  measureHeroAnimation();
  updateHeroOverlay();
}

window.addEventListener("load", refreshHeroAnimation);
window.addEventListener("resize", refreshHeroAnimation);
window.addEventListener("scroll", updateHeroOverlay);

if (heroImg) {
  if (heroImg.complete) {
    refreshHeroAnimation();
  } else {
    heroImg.addEventListener("load", refreshHeroAnimation);
  }
}