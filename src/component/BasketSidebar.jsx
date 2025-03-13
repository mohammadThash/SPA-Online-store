import { TbChecklist } from "react-icons/tb";
import { FaHashtag } from "react-icons/fa";
import { BsPatchCheck } from "react-icons/bs";

import styles from "./BasketSidebar.module.css";

function BasketSidebar({ state, clickHandler }) {
  return (
    <div className={styles.sidebar}>
      <div>
        <TbChecklist />
        <p>Total: </p>
        <span> {state.totalPriceOfProducts} $</span>
      </div>
      <div>
        <FaHashtag />
        <p>Quantity: </p>
        <span> {state.productsCounter}</span>
      </div>
      <div>
        <BsPatchCheck />
        <p>Status: </p>
        <span> {!state.checkout && " Pending..."}</span>
      </div>
      <button onClick={() => clickHandler("CHECKOUT")}>Checkout</button>
    </div>
  );
}

export default BasketSidebar;
