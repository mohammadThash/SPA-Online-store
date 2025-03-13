import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../component/Card";
import Loader from "../component/Loader";
import SearchBox from "../component/SearchBox.jsx";
import Sidebar from "../component/Sidebar.jsx";
import { useProducts } from "../context/Products";
import {
  filterProducts,
  searchProducts,
  getInitialQuery,
} from "../helpers/helpers";

import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const products = useProducts();
  const [display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplay(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplay(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!display.length && <Loader />}
          {display.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
