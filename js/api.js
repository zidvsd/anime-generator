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
      console.warn(`Failted to fetch ${type} not found. Retrying...`);
      return type === "trending" ? [] : fetchApi();
    }

    const data = await response.json();
    return data; // Return data for reuse
  } catch (error) {
    console.error("Unable to fetch API", error);
    return null;
  }
};
export const fetchTenRandomAnimes = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    let animes = [];
    let attempts = 0; // Track how many animes we fetched

    while (animes.length < 5 && attempts < 20) {
      // Stop after 20 tries
      const randomID = Math.floor(Math.random() * 20000) + 1;
      const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;

      try {
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            animes.push(data.data); // Add valid anime
          }
        } else {
          console.warn(`Anime ID ${randomID} not found, skipping...`);
        }
      } catch (error) {
        console.error(`Error fetching anime ${randomID}`, error);
      }

      attempts++;
      await delay(1000); // Avoid hitting rate limits
    }

    return animes;
  } catch (error) {
    console.error("Error fetching 10 random animes", error);
    return [];
  }
};
