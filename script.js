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

function setHeroSectionHeight() {
  if (!heroSection || !heroImg) return;

  const imageHeight = heroImg.getBoundingClientRect().height;
  const viewportHeight = window.innerHeight;
  const introScroll = viewportHeight * 0.45;
  const croppedTop = 200;

  heroSection.style.height = `${imageHeight - croppedTop + introScroll}px`;
}

function updateHeroOverlay() {
  if (!heroSection || !heroOverlay) return;

  const rect = heroSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const introScroll = viewportHeight * 0.45;

  const scrolled = Math.min(Math.max(-rect.top, 0), introScroll);
  const rawProgress = Math.min(scrolled / introScroll, 1);
  const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

  // move text farther upward
  const textTranslateY = easedProgress * -260;

  // keep text fully visible until late in the animation,
  // then fade it out near the top
  let textOpacity = 1;
  if (rawProgress > 0.72) {
    textOpacity = 1 - (rawProgress - 0.82) / 0.28;
  }
  textOpacity = Math.max(0, Math.min(1, textOpacity));

  heroOverlay.style.transform = `translateX(-50%) translateY(${textTranslateY}px)`;
  heroOverlay.style.opacity = textOpacity;
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
    heroImg.addEventListener("load", setHeroSectionHeight);
  }
}