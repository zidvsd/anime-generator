import { fetchApi } from "./api.js";
import { heroTitleLoop } from "./loading.js";
export async function loadHeroSection() {
  heroTitleLoop();
  const data = await fetchApi(); // Get random anime
  if (!data) return;

  const animeImage = data.data.images.webp.large_image_url;
  const animeTitle = data.data.title;

  const heroImg = document.getElementById("hero-img");
  const heroTitle = document.getElementById("hero-title");

  if (heroImg) {
    heroImg.src = animeImage;
    heroImg.alt = animeTitle;
    heroTitle.innerText = animeTitle;
    heroTitle.style.display = "block";
  }
}
