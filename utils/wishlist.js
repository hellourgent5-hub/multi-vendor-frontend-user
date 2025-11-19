const WISHLIST_KEY = "wishlist";

// Get all wishlist items
export function getWishlist() {
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
}

// Add an item to the wishlist
export function addToWishlist(item) {
  const wishlist = getWishlist();
  const exists = wishlist.some((w) => w.id === item.id);
  if (!exists) {
    wishlist.push(item);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
}

// Remove an item from the wishlist
export function removeFromWishlist(id) {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// Clear the wishlist
export function clearWishlist() {
  localStorage.removeItem(WISHLIST_KEY);
}
