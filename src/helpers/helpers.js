const shortenText = (text) => {
  return text.split(" ").slice(0, 3).join(" ");
};

const searchProducts = (products, search) => {
  // !search
  //   ? products
  //   :  products.filter((product) =>
  //       product.title.toLowerCase().includes(search.toLowerCase())
  //     );
  if (!search) return products;
  const searchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );
  return searchedProducts;
};

const filterProducts = (products, category) => {
  if (!category) return products;
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  return filteredProducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return { ...currentQuery, ...newQuery };
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const summProducts = (products) => {
  const productsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const totalPriceOfProducts = products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { productsCounter, totalPriceOfProducts };
};

const productQuantity = (state, id) => {
  const productIndex = state.selectedProducts.findIndex(
    (product) => product.id === id
  );
  if (productIndex === -1) {
    return 0;
  }else{
    return state.selectedProducts[productIndex].quantity;
  }
};
export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  summProducts,
  productQuantity,
};
