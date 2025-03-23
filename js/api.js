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
export const fetchTenTrendingAnimes = async () => {
  try {
    console.log("Fetching trending animes...");

    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=airing&limit=10"
    );

    if (!response.ok) {
      console.warn("❌ Failed to fetch trending animes.");
      return [];
    }

    const data = await response.json();
    const animeList = data?.data || [];

    const trendingAnimes = animeList.map((anime) => ({
      id: anime.mal_id,
      title: anime.title || "Unknown Title",
      producer: anime.studios?.[0]?.name || "Unknown Studio",
      type: anime.type || "Unknown Type",
      episodes: anime.episodes ?? "Unknown Episodes",
      genres: anime.genres?.slice(0, 3).map((genre) => genre.name) || [
        "Unknown Genre",
      ],
      imageUrl: anime.images?.webp?.large_image_url || "",
    }));

    console.log("✅ Trending Animes:", trendingAnimes);
    return trendingAnimes;
  } catch (error) {
    console.error("⚠️ Error fetching trending animes:", error);
    return [];
  }
};
export let animeDataArray = []; // Global array

export const fetchTenRandomAnimes = async (updateAnime) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  animeDataArray.length = 0; // Clear existing array before fetching

  let fetchedCount = 0;

  while (fetchedCount < 10) {
    const randomID = Math.floor(Math.random() * 20000) + 1;
    const apiUrl = `https://api.jikan.moe/v4/anime/${randomID}`;

    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        const anime = data?.data; // Ensure data exists

        if (anime && anime.images?.webp?.large_image_url) {
          const animeDetails = {
            title: anime.title || "Unknown Title",
            producer: anime.studios?.[0]?.name || "Unknown Studio",
            type: anime.type || "Unknown Type",
            episodes: anime.episodes ?? "Unknown Episodes",
            genres: anime.genres?.slice(0, 3).map((genre) => genre.name) || [
              "Unknown Genre",
            ],
            imageUrl: anime.images.webp.large_image_url || "",
          };

          animeDataArray.push(animeDetails); // Now it modifies the global array
          if (updateAnime) updateAnime(animeDetails, fetchedCount); // Update UI
          fetchedCount++;

          console.log(
            `✅ Successfully fetched: ${animeDetails.title} (${fetchedCount}/10)`
          );
        } else {
          console.warn(
            `❌ Missing image data for Anime ID ${randomID}, retrying...`
          );
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

  console.log("✅ Finished fetching 10 random animes!", animeDataArray);
  return animeDataArray;
};
