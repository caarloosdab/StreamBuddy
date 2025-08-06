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
        <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="${item.title || item.name}" />
        <h3>${item.title || item.name}</h3>
        <button data-id="${item.id}" class="watchlist-btn">+ Watchlist</button>
      `;

      this.container.appendChild(card);
    });
  }
}
