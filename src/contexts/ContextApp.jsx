import { useReducer, createContext } from 'react';
import products from '../resources/products.json';
import {
  ADD_TOTAL_PRODUCTS_AMOUNT,
  HANDLE_CHANGE_PRODUCT_AMOUNT,
} from './types';

const initialState = {
  products,
  totalProducts: 0,
};

export const ContextApp = createContext(initialState);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TOTAL_PRODUCTS_AMOUNT: {
      const totalProducts = state.products.reduce((acc, el) => {
        return acc + el.amount;
      }, 0);

      return {
        ...state,
        totalProducts,
      };
    }

    case HANDLE_CHANGE_PRODUCT_AMOUNT: {
      const productChanged = state.products.map((prod) => {
        if (payload.id === prod.id) {
          prod.possible_price = prod.price * payload.amount;
          prod.amount = payload.amount;
        }
        return prod;
      });

      const totalProducts = productChanged.reduce((acc, el) => {
        return acc + el.amount;
      }, 0);

      return {
        ...state,
        products: productChanged,
        totalProducts,
      };
    }

    default:
      return { ...state };
  }
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      {children}
    </ContextApp.Provider>
  );
};

export default ContextProvider;
