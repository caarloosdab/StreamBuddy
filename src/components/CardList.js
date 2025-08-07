import { addToWatchlist } from "./utils/watchlist.js";

export default class CardList {
  constructor(container) {
    this.container = container;
  }

  render(items) {
    this.container.innerHTML = "";

    items.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <a href="details.html?id=${item.id}">
          <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${item.title || item.name}" />
          <h3>${item.title || item.name}</h3>
        </a>
        <button data-id="${item.id}" class="watchlist-btn">+ Watchlist</button>
      `;


      const btn = card.querySelector(".watchlist-btn");

      btn.addEventListener("click", () => {
        addToWatchlist(item);
        btn.textContent = "✓ Added";
        btn.disabled = true;
      });

      this.container.appendChild(card);
    });
  }
}