import { fetchTrending, searchTMDb } from "./assets/api/tmdb.js";
import CardList from "./components/CardList.js";
import { fetchGenres, renderGenreFilters } from "./components/filters.js";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".card-container");
  const cardList = new CardList(container);

  try {
    const data = await fetchTrending();
    cardList.render(data.results);
  } catch (error) {
    container.innerHTML = `<p class="error">Failed to load trending movies.</p>`;
    console.error("Error loading data:", error);
  }
});

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const resultsContainer = document.querySelector(".card-container");

const cardList = new CardList(resultsContainer);

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (query.length < 2) {
    alert("Please enter at least 2 characters.");
    return;
  }

  try {
    const results = await searchTMDb(query);
    const filtered = results.filter(item => item.poster_path); // optional: only show ones with images
    cardList.render(filtered);
  } catch (error) {
    resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

console.log("Main script loaded!");



document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});



const genreFiltersContainer = document.getElementById("genre-filters");
const cardContainer = document.querySelector(".card-container");

let selectedGenres = [];

function onGenreClick(genreId) {
  const index = selectedGenres.indexOf(genreId);
  if (index > -1) {
    selectedGenres.splice(index, 1);
  } else {
    selectedGenres.push(genreId);
  }
  loadFilteredMovies();
}

async function loadFilteredMovies() {
  try {
    const genreQuery = selectedGenres.join(",");
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
    if (genreQuery.length > 0) {
      url += `&with_genres=${genreQuery}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    cardList.render(data.results);
  } catch (error) {
    console.error(error);
  }
}

// Initialize filters and load trending on page load
(async function init() {
  const genres = await fetchGenres();
  renderGenreFilters(genres, genreFiltersContainer, onGenreClick);

  // Load initial trending or popular movies
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  const trendingRes = await fetch(trendingUrl);
  const trendingData = await trendingRes.json();
  cardList.render(trendingData.results);
})();


const toggleBtn = document.getElementById("toggle-filters");
const genreFilters = document.getElementById("genre-filters");

toggleBtn.addEventListener("click", () => {
  genreFilters.classList.toggle("hidden");

  toggleBtn.textContent = genreFilters.classList.contains("hidden")
    ? "🎛️ Show Filters"
    : "🙈 Hide Filters";
});