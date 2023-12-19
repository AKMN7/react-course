const ACCOUNT_INIT_STATE = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
};

export default function accountReducer(state = ACCOUNT_INIT_STATE, action) {
    if (action.type === "loading") {
        return { ...state, isLoading: !state.isLoading };
    }

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

export function deposit(ammount, currency) {
    if (currency === "USD") return { type: "account/deposit", payload: ammount };

    return async function (dispatch, getState) {
        dispatch({ type: "loading" });
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${ammount}&from=${currency}&to=USD`);
        const data = await res.json();
        dispatch({ type: "loading" });
        dispatch({ type: "account/deposit", payload: data.rates.USD });
    };
}

export function withdraw(ammount) {
    return { type: "account/withdraw", payload: ammount };
}

export function request(amount, purpose) {
    return { type: "account/request", payload: { amount, purpose } };
}

export function payloan() {
    return { type: "account/payloan" };
}
