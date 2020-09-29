import { createSelector } from 'reselect';

// input selector -- selects reducers from the redux state
const selectCart = state => state.cart;

// output selectors onUpdate from cart reducer
export const selectCartItems = createSelector(
    [selectCart],
    // returns the value(list of cart items) from the selector we need
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

// output selectors onUpdate from cart items
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItems) => accumulatedQuantity + cartItems.quantity, 0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItems) => accumulatedQuantity + cartItems.quantity * cartItems.price, 0
        )  
);
