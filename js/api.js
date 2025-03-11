import { loadingImage } from "./loading.js";
export const fetchApi = async () => {
  try {
    // generate random anime id
    loadingImage();
    const randomID = Math.floor(Math.random() * 20000) + 1;
    const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.warn(`Anime ID${randomID} not found. Retring...`);
      return fetchApi();
    }
    const data = await response.json();
    const animeImage = data.data.images.webp.large_image_url;
    console.log(data);
    const heroImg = document.getElementById("hero-img");
    if (heroImg) {
      heroImg.src = animeImage;
      heroImg.alt = "Random Image";
    }

    return data;
  } catch (error) {
    console.log("Unable to fetch API", error);
  }
};
