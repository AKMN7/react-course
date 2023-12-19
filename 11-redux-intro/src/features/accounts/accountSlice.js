import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = !state.isLoading;
        },
        deposit(state, action) {
            state.balance = state.balance + action.payload;
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        request(state, action) {
            if (state.loan > 0) return;
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance = state.balance + action.payload.amount;
        },
        payloan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        }
    }
});

export const { loading, withdraw, request, payloan } = accountSlice.actions;

export function deposit(payload) {
    console.log("🚀 ~ payload:", payload);
    if (payload.currency === "USD") return { type: "account/deposit", payload: payload.amount };

    return async function (dispatch, getState) {
        dispatch({ type: "loading" });
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${payload.amount}&from=${payload.currency}&to=USD`);
        const data = await res.json();
        dispatch({ type: "loading" });
        dispatch({ type: "account/deposit", payload: data.rates.USD });
    };
}

export default accountSlice.reducer;
