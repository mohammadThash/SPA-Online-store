import { MdDeleteOutline } from "react-icons/md";

import styles from "./BasketCard.module.css";
import { shortenText } from "../helpers/helpers";

function BasketCard({ data, clickHandler }) {
  const { image, title, quantity, price } = data;
  return (
    <div className={styles.card}>   
      <img src={image} alt={title} />
      <h3>{shortenText(title)}</h3>
      <span>{price} $</span>
      <div className={styles.actions}>
        {quantity === 1 && (
          <button onClick={() => clickHandler("REMOVE_FROM_CART", data)}>
            <MdDeleteOutline />
          </button>
        )}
        {quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE_QUANTITY", data)}>
            -
          </button>
        )}
        <span>{quantity}</span>
        <button onClick={() => clickHandler("INCREASE_QUANTITY", data)}>
          +
        </button>
      </div>
    </div>
  );
}

export default BasketCard;
