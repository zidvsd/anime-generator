import { fetchApi } from "./api.js";
import { trendingLoading } from "./loading.js";
import { hoverEffect } from "./thumbnailHover.js";
export const displayTrending = async (maxRetries = 5, retryDelay = 2000) => {
  let data = null;
  let attempts = 0;
  trendingLoading();
  while (!data || !data.data) {
    if (attempts >= maxRetries) {
      console.error("Failed to fetch trending anime after multiple attempts.");
      return;
    }

    console.log(`Fetching trending anime... Attempt ${attempts + 1}`);
    data = await fetchApi(null, "trending");
    attempts++;

    if (!data || !data.data) {
      console.warn("Trending anime data not available. Retrying...");
      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retrying
    }
  }

  const trendingAnimes = data.data.slice(0, 10);
  const trendingImg = document.querySelectorAll(".trending-img");
  const trendingTitle = document.querySelectorAll(".trending-title");

  trendingAnimes.forEach((anime, index) => {
    if (trendingImg[index]) {
      trendingImg[index].src = anime.images.webp.large_image_url;
      trendingImg[index].alt = anime.title;
    }

    if (trendingTitle[index]) {
      trendingTitle[index].innerText = anime.title;
    }
  });
  hoverEffect();
  console.log("Trending anime successfully loaded!");
};
