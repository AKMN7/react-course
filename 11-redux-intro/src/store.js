import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

function reducer(state = initialState, action) {
    if (action.type === "account/deposit") {
        return { ...state, balance: state.balance + action.payload };
    }

    if (action.type === "account/withdraw") {
        return { ...state, balance: state.balance - action.payload };
    }

    if (action.type === "account/request") {
        if (state.loan > 0) return state;
        return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose };
    }

    if (action.type === "account/payloan") {
        return { ...state, balance: state.balance - state.loan, loan: 0, loanPurpose: "" };
    }

    return state;
}

const store = createStore(reducer);

// store.dispatch({ type: "account/deposit", payload: 600 });
store.dispatch(deposit(600));
console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });
store.dispatch(withdraw(200));
console.log(store.getState());

// store.dispatch({ type: "account/request", payload: { amount: 5000, purpose: "Buy Car" } });
store.dispatch(request(5000, "Buy Car"));
console.log(store.getState());

// store.dispatch({ type: "account/payloan" });
store.dispatch(payloan());
console.log(store.getState());

function deposit(ammount) {
    return { type: "account/deposit", payload: ammount };
}

function withdraw(ammount) {
    return { type: "account/withdraw", payload: ammount };
}

function request(amount, purpose) {
    return { type: "account/request", payload: { amount, purpose } };
}

function payloan() {
    return { type: "account/payloan" };
}
