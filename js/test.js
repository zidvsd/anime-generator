import { fetchTenTrendingAnimes, animeDataArray } from "./api.js";

export const testCall = async () => {
  await fetchTenTrendingAnimes();
  console.log("Heeloooo");

  console.log("Data", animeDataArray);
};
