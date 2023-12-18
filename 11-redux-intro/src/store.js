import { combineReducers, createStore } from "redux";

const ACCOUNT_INIT_STATE = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
};

const CUSTOMER_INIT_STATE = {
    name: "",
    nationalID: "",
    createdAt: ""
};

function accountReducer(state = ACCOUNT_INIT_STATE, action) {
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

function customerReducer(state = CUSTOMER_INIT_STATE, action) {
    if (action.type === "customer/createCustomer") {
        return { ...state, name: action.payload.name, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
    }

    if (action.type === "customer/updateName") {
        return { ...state, name: action.payload };
    }

    return state;
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer);

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

function createCustomer(name, nationalID) {
    return { type: "customer/createCustomer", payload: { name, nationalID, createdAt: new Date().toISOString() } };
}

function updateName(name) {
    return { type: "customer/updateName", payload: name };
}

store.dispatch(createCustomer("Anas Nassar", "2208707907"));
console.log(store.getState());

store.dispatch(updateName("AKMN"));
console.log(store.getState());

store.dispatch(deposit(600));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(request(5000, "Buy Car"));
console.log(store.getState());

store.dispatch(payloan());
console.log(store.getState());
