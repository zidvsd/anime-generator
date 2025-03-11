import { loading } from "./loading.js";

export const fetchApi = async () => {
  try {
    loading(); // Show loading state

    const randomID = Math.floor(Math.random() * 20000) + 1;
    const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.warn(`Anime ID ${randomID} not found. Retrying...`);
      return fetchApi();
    }

    const data = await response.json();
    const animeImage = data.data.images.webp.large_image_url;
    const animeTitle = data.data.title;

    console.log(data);

    const heroImg = document.getElementById("hero-img");
    const heroTitle = document.getElementById("hero-title");

    if (heroImg) {
      const tempImg = new Image();
      tempImg.src = animeImage;
      tempImg.onload = () => {
        heroImg.src = animeImage;
        heroImg.alt = animeTitle;
        heroTitle.innerText = animeTitle; // Now update title at the same time
        heroTitle.style.display = "block"; // Make it visible
      };
    }

    return data;
  } catch (error) {
    console.log("Unable to fetch API", error);
  }
};
