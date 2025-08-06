import { getTrendingMovies } from "../assets/api/tmdb.js";
import { getTasteDiveDescription } from "../assets/api/tastedive.js";

export default async function loadRecommendations() {
  const container = document.getElementById("recommendation-carousel");
  const movies = await getTrendingMovies(5);

  for (const movie of movies) {
    const description = await getTasteDiveDescription(movie.title);
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
      <div class="overlay">
        <h4>${movie.title}</h4>
        <p>${description}</p>
      </div>
    `;

    container.appendChild(card);
  }
}