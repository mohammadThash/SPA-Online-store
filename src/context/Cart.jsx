import { createContext, useContext, useReducer } from "react";
import { summProducts } from "../helpers/helpers";

const initialState = {
  selectedProducts: [],
  productsCounter: 0,
  totalPriceOfProducts: 0,
  checkout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (
        !state.selectedProducts.find(
          (product) => product.id === action.payload.id
        )
      ) {
        state.selectedProducts.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        ...summProducts(state.selectedProducts),
        checkout: false,
      };
    case "REMOVE_FROM_CART":
      const newSelectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload.id
      );
      return {
        ...state,
        selectedProducts: [...newSelectedProducts],
        ...summProducts(newSelectedProducts),
      };
    case "INCREASE_QUANTITY":
      const index = state.selectedProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.selectedProducts[index].quantity++;
      return {
        ...state,
        ...summProducts(state.selectedProducts),
      };
    case "DECREASE_QUANTITY":
      const indexDecrease = state.selectedProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.selectedProducts[indexDecrease].quantity--;
      return {
        ...state,
        ...summProducts(state.selectedProducts),
      };
    case "CHECKOUT":
      return {
        selectedProducts: [],
        productsCounter: 0,
        totalPriceOfProducts: 0,
        checkout: true,
      };
    default:
      throw new Error("INVALID ACTION");
  }
};
const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export default CartProvider;
export { useCart };
