import { fetchTenRandomAnimes } from "./api.js";
import { randomSectionLoading } from "./loading.js";

export const randomSection = async () => {
  randomSectionLoading();

  console.log("Fetching random animes...");

  const randomImg = document.querySelectorAll(".random-img");
  const randomTitle = document.querySelectorAll(".random-title");

  // Function to update UI as soon as an anime is fetched
  const updateAnime = (anime, index) => {
    if (!anime || !anime.imageUrl) {
      console.warn(`❌ Skipping anime at index ${index} due to missing image.`);
      return;
    }

    if (randomImg[index]) {
      randomImg[index].src = anime.imageUrl;
      randomImg[index].alt = anime.title;
    }

    if (randomTitle[index]) {
      randomTitle[index].innerText = anime.title;
    }

    console.log(`✅ Displayed: ${anime.title}`);
  };

  await fetchTenRandomAnimes(updateAnime); // Pass the function as an argument
  console.log("✅ Finished fetching random animes!");
};
