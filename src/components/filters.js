const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return data.genres; // Array of genre objects {id, name}
}

export function renderGenreFilters(genres, container, onGenreClick) {
  container.innerHTML = "";
  genres.forEach((genre) => {
    const btn = document.createElement("button");
    btn.textContent = genre.name;
    btn.dataset.genreId = genre.id;
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      onGenreClick(genre.id);
    });
    container.appendChild(btn);
  });
}
