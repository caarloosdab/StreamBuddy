const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchTrending() {
  const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Bad TMDb response");
  return await response.json();


}

export async function searchTMDb(query) {
  const url = `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch results");
  }

  return data.results;
}


