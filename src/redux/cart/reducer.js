import CartActionTypes from "./action-types";

const initialState = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      //verificar se o produto ja esta no carrinho
      const productisAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );

      //aumentar a quantidade em um
      if (productisAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }

      //adicionar ao carrinho
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case CartActionTypes.REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };

    case CartActionTypes.INCREASE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };

    case CartActionTypes.DECREASE_PRODUCT:
      //Caso a quantidade seja maior que 1
      if (action.payload.quantity > 1) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          ),
        };
      } else {
        return {
          ...state,
          products: state.products.filter(
            (product) => product.id !== action.payload.id
          ),
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
