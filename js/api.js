import { loading } from "./loading.js";

export const fetchApi = async (animeID = null, type = "random") => {
  let apiUrl;
  try {
    loading(); // Show loading state

    if (type === "trending") {
      apiUrl = `https://api.jikan.moe/v4/top/anime?filter=airing&limit=10`;
    } else {
      const randomID = animeID || Math.floor(Math.random() * 20000) + 1;
      apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.warn(`Failed to fetch ${type} not found. Retrying...`);
      return type === "trending" ? [] : fetchApi();
    }

    const data = await response.json();
    return data; // Return data for reuse
  } catch (error) {
    console.error("Unable to fetch API", error);
    return null;
  }
};
export const fetchTenRandomAnimes = async (updateAnime) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    let attempts = 0; // Track fetch attempts
    let fetchedCount = 0; // Count successful fetches

    while (fetchedCount < 10 && attempts < 20) {
      const randomID = Math.floor(Math.random() * 20000) + 1;
      const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;

      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            updateAnime(data.data, fetchedCount); // Update UI immediately
            fetchedCount++;
          }
        } else {
          console.warn(`Anime ID ${randomID} not found, skipping...`);
        }
      } catch (error) {
        console.error(`Error fetching anime ${randomID}`, error);
      }

      attempts++;
      if (attempts % 5 === 0) await delay(1000); // Prevent rate limits
    }
  } catch (error) {
    console.error("Error fetching random animes", error);
  }
};
