import { fetchTrending, searchTMDb } from "./assets/api/tmdb.js";
import CardList from "./components/CardList.js";

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