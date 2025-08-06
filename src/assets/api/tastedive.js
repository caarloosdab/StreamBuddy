const API_KEY = import.meta.env.VITE_TASTEDIVE_API_KEY;

export async function fetchRecommendations(title) {
  const res = await fetch(`https://tastedive.com/api/similar?q=${title}&k=${API_KEY}&info=1&type=movies`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return await res.json();
}