import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // cart: []
    cart: [
        {
            pizzaID: 12,
            name: "Mediterranean",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32
        }
    ]
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((el) => el.id !== action.payload);
        },
        incQuantity(state, action) {
            const item = state.cart.find((el) => el.id === action.payload);
            item.quantity++;
            item.unitPrice = item.quantity * item.unitPrice;
        },
        decQuantity(state, action) {
            const item = state.cart.find((el) => el.id === action.payload);
            item.quantity--;
            item.unitPrice = item.quantity * item.unitPrice;
        },
        clear(state) {
            state.cart = [];
        }
    }
});

export const { addItem, deleteItem, incQuantity, decQuantity, clear } = cartSlice.actions;

export default cartSlice.reducer;
