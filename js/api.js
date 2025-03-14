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
