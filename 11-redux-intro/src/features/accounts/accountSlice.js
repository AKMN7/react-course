const ACCOUNT_INIT_STATE = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

export default function accountReducer(state = ACCOUNT_INIT_STATE, action) {
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

export function deposit(ammount) {
    return { type: "account/deposit", payload: ammount };
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
