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

  let fetchedCount = 0; // Number of successful fetches

  while (fetchedCount < 10) {
    const randomID = Math.floor(Math.random() * 20000) + 1;
    const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;

    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.data && data.data.images) {
          updateAnime(data.data, fetchedCount); // Update UI immediately
          fetchedCount++;
          console.log(
            `✅ Successfully fetched: ${data.data.title} (${fetchedCount}/10)`
          );
        } else {
          console.warn(`❌ Invalid data for Anime ID ${randomID}, retrying...`);
        }
      } else {
        console.warn(`❌ Anime ID ${randomID} not found, retrying...`);
      }
    } catch (error) {
      console.error(
        `⚠️ Error fetching Anime ID ${randomID}, retrying...`,
        error
      );
    }

    await delay(500); // Short delay to prevent hitting API rate limits
  }

  console.log("✅ Finished fetching 10 random animes!");
};
