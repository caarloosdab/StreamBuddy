const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

const main = document.querySelector(".details-container");

function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchDetails(id) {
  const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  if (!res.ok) throw new Error("Failed to fetch details");
  return await res.json();
}

function renderDetails(data) {
  main.innerHTML = `
    <div class="details">
      <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title}" />
      <div>
        <h2>${data.title}</h2>
        <p><strong>Release Date:</strong> ${data.release_date}</p>
        <p><strong>Rating:</strong> ${data.vote_average} / 10</p>
        <p>${data.overview}</p>
      </div>
    </div>
  `;
}

async function init() {
  try {
    const id = getIdFromURL();
    const data = await fetchDetails(id);
    renderDetails(data);
  } catch (error) {
    main.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

init();
