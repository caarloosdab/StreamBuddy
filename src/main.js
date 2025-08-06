import { fetchTrending } from "./assets/api/tmdb.js";
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
