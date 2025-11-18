export const getWishlist = () => {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
};

export const saveWishlist = (list) => {
  localStorage.setItem("wishlist", JSON.stringify(list));
};

export const toggleWishlist = (product) => {
  let list = getWishlist();
  const exists = list.find((i) => i._id === product._id);

  if (exists) {
    // remove
    list = list.filter((i) => i._id !== product._id);
  } else {
    // add
    list.push(product);
  }

  saveWishlist(list);
  return list;
};

export const isWishlisted = (id) => {
  let list = getWishlist();
  return list.some((i) => i._id === id);
};
