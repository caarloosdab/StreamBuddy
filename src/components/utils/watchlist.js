const STORAGE_KEY = "streambuddy-watchlist";

export function getWatchlist() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function setWatchlist(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Add a movie if it's not already there
export function addToWatchlist(item) {
  const list = getWatchlist();
  const exists = list.some(movie => movie.id === item.id);
  if (!exists) {
    list.push(item);
    setWatchlist(list);
    console.log(`✅ Added to watchlist:`, item);
  } else {
    console.log("ℹ️ Already in watchlist.");
  }
}

// Remove a movie by ID
export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(movie => movie.id !== id);
  setWatchlist(list);
}
