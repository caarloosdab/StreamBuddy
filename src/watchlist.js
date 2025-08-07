import { getWatchlist, removeFromWatchlist } from "./components/utils/watchlist.js";

const container = document.querySelector(".card-container");

function renderWatchlist() {
  const items = getWatchlist();
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>Your watchlist is empty 😢</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${item.title || item.name}" />
      <h3>${item.title || item.name}</h3>
      <button data-id="${item.id}" class="remove-btn">🗑 Remove</button>
    `;

    const btn = card.querySelector(".remove-btn");
    btn.addEventListener("click", () => {
      removeFromWatchlist(item.id);
      renderWatchlist(); // re-render after removal
    });

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderWatchlist);
