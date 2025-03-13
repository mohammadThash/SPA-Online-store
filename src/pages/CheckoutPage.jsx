import BasketCard from "../component/BasketCard";
import BasketSidebar from "../component/BasketSidebar";
import { useCart } from "../context/Cart";

import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const [state, dispatch] = useCart();
  if (!state.productsCounter) {
    return (
      <div className={styles.container}>
        <p>EMPTY</p>
      </div>
    );
  }
  const clickHandler = (type, payload) => {
    dispatch({ type, payload });
  };
  return (
    <div className={styles.container}>
      <BasketSidebar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedProducts.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
