function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
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