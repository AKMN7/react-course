import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((el) => el.pizzaID !== action.payload);
        },
        incQuantity(state, action) {
            const item = state.cart.find((el) => el.pizzaID === action.payload);
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decQuantity(state, action) {
            const item = state.cart.find((el) => el.pizzaID === action.payload);
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },
        clear(state) {
            state.cart = [];
        }
    }
});

export const { addItem, deleteItem, incQuantity, decQuantity, clear } = cartSlice.actions;

export default cartSlice.reducer;
