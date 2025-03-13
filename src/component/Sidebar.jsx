import { FaListUl } from "react-icons/fa";
import { createQueryObject } from "../helpers/helpers.js";
import styles from "../component/Sidebar.module.css";
import { categories } from "../constants/list.js";

function Sidebar({ query, setQuery }) {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    if (tagName !== "LI") return;

    const category = event.target.innerText.toLowerCase();
    setQuery((query) => createQueryObject(query, { category }));
    // console.dir(category);
    // const filteredProducts = products.filter((product) =>
    //   setDisplay(query.category === category)
    // );
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLowerCase() === query.category
                ? styles.selected
                : null
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
