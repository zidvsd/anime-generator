import { fetchTenRandomAnimes } from "./api.js";
import { randomSectionLoading } from "./loading.js";

export const randomSection = async () => {
  randomSectionLoading();

  console.log("Fetching random animes...");

  const randomImg = document.querySelectorAll(".random-img");
  const randomTitle = document.querySelectorAll(".random-title");

  // Function to update UI as soon as an anime is fetched
  const updateAnime = (anime, index) => {
    if (randomImg[index]) {
      randomImg[index].src = anime.images.webp.large_image_url;
      randomImg[index].alt = anime.title;
    }

    if (randomTitle[index]) {
      randomTitle[index].innerText = anime.title;
    }

    console.log(`✅ Displayed: ${anime.title}`);
  };

  await fetchTenRandomAnimes(updateAnime);
  console.log("✅ Finished fetching random animes!");
};
