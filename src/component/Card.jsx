import { TbListDetails, TbShoppingBagCheck } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

import { Link } from "react-router-dom";

import { shortenText, productQuantity } from "../helpers/helpers";
import { useCart } from "../context/Cart.jsx";

import styles from "../component/Card.module.css";

function Card({ product }) {
  const { id, title, image, price } = product;
  const [state, dispatch] = useCart();

  const quantity = productQuantity(state, id);

  const clickHandler = (type) => {
    dispatch({ type, payload: product });
  };

  return (
    <div className={styles.card}>
      <img src={image} alt={shortenText(title)} />
      <h3>{shortenText(title)}</h3>
      <p>{price} $</p>
      <div className={styles.actions}>
        <Link to={`/products/${id}`}>
          <TbListDetails />
        </Link>
        <div>
          {quantity === 1 && (
            <button onClick={() => clickHandler("REMOVE_FROM_CART")}>
              <MdDeleteOutline />
            </button>
          )}
          {quantity > 1 && (
            <button onClick={() => clickHandler("DECREASE_QUANTITY")}>-</button>
          )}
          {!!quantity && <span>{quantity}</span>}
          {quantity === 0 ? (
            <button onClick={() => clickHandler("ADD_TO_CART")}>
              <TbShoppingBagCheck />
            </button>
          ) : (
            <button onClick={() => clickHandler("INCREASE_QUANTITY")}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
