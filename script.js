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
const heroImg = document.querySelector(".hero-img img");
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

  heroTextExitDistance = viewportHeight * 0.17;
  heroIntroScroll = Math.max(viewportHeight * 0.9, heroTextExitDistance);

  // Full scroll range = image height + viewport height, so image can pan from top to bottom
  heroSection.style.height = `${imageHeight + viewportHeight}px`;
}

function updateHeroOverlay() {
  if (!heroSection || !heroImg || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const totalScrollDistance = rect.height - viewportHeight;
  const rawProgress = totalScrollDistance > 0 ? Math.min(Math.max(-rect.top / totalScrollDistance, 0), 1) : 0;

  const imageHeight = heroImg.getBoundingClientRect().height;
  const maxTranslate = Math.max(imageHeight - viewportHeight, 0);
  heroImg.style.transform = `translate(-50%, -${maxTranslate * rawProgress}px)`;

  const scrolled = Math.min(Math.max(-rect.top, 0), heroIntroScroll || 1);
  const textPhaseEnd = heroIntroScroll * 1.2;
  const overlayRawProgress = Math.min(scrolled / textPhaseEnd, 1);

  const easedProgress =
    overlayRawProgress < 0.5
      ? 4 * overlayRawProgress * overlayRawProgress * overlayRawProgress
      : 1 - Math.pow(-2 * overlayRawProgress + 2, 3) / 2;

  const textTranslateY = easedProgress * -(heroTextExitDistance * 1.3);
  let textOpacity = 1;
  const rawProgressParam = 0.5;
  if (overlayRawProgress > rawProgressParam) {
    textOpacity = 1 - (overlayRawProgress - rawProgressParam) / 0.3;
  }
  textOpacity = Math.max(0, Math.min(1, textOpacity));

  heroOverlay.style.transform = `translateX(-50%) translateY(${textTranslateY}px)`;
  heroOverlay.style.opacity = textOpacity.toString();
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