// spinner.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const spinnerForm = document.querySelector(".filters");
const wheelContainer = document.getElementById("spinner");
const resultSection = document.getElementById("result");
const movieDetails = document.getElementById("movie-details");
const tastediveList = document.getElementById("recommendations-list");

spinnerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const genre = document.getElementById("genre-select").value;
  const year = document.getElementById("year-select").value;
  const rating = document.getElementById("rating-select").value;
  const lang = "en"; // default since there is no lang input in HTML


  // Step 1: Get movies from TMDb
  const movies = await fetchMovies({ genre, year, lang });

  if (!movies.length) {
    alert("No movies found with those filters.");
    return;
  }

  // Step 2: Randomly select one
  const selectedMovie = movies[Math.floor(Math.random() * movies.length)];

  // Step 3: Show wheel animation (placeholder)
  showSpinnerAnimation(() => {
    displayMovie(selectedMovie);
    fetchTasteDiveRecommendations(selectedMovie.title || selectedMovie.name);
  });
});

async function fetchMovies({ genre, year, lang }) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${lang}&sort_by=popularity.desc&page=1&with_watch_monetization_types=flatrate`;

  if (genre) url += `&with_genres=${genre}`;
  if (year) url += `&primary_release_year=${year}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

function showSpinnerAnimation(callback) {
  wheelContainer.classList.remove("hidden");
  wheelContainer.innerHTML = `<div class="spinner">Spinning...</div>`;

  setTimeout(() => {
    wheelContainer.classList.add("hidden");
    resultSection.classList.remove("hidden");
    callback();
  }, 3000); // 3 seconds for effect
}

function displayMovie(movie) {
  movieDetails.innerHTML = `
    <h3>${movie.title || movie.name}</h3>
    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
    <p>${movie.overview}</p>
  `;
}

async function fetchTasteDiveRecommendations(query) {
  const tasteDiveApi = "https://tastedive.com/api/similar";
  const tasteKey = import.meta.env.VITE_TASTEDIVE_API_KEY;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  try {
    const url = `${tasteDiveApi}?q=${encodeURIComponent(query)}&type=movie&limit=5&info=1&k=${tasteKey}`;
    const res = await fetch(url);
    const data = await res.json();

    tastediveList.innerHTML = data.Similar.Results.map(item => `
      <li>
        <strong>${item.Name}</strong>: ${item.wTeaser || "No description."}
      </li>
    `).join("");
  } catch (err) {
    tastediveList.innerHTML = "<li>Unable to load recommendations.</li>";
    console.error(err);
  }
}