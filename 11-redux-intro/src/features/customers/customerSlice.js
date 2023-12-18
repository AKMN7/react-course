const CUSTOMER_INIT_STATE = {
    name: "",
    nationalID: "",
    createdAt: ""
};

export default function customerReducer(state = CUSTOMER_INIT_STATE, action) {
    if (action.type === "customer/createCustomer") {
        return { ...state, name: action.payload.name, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
    }

    if (action.type === "customer/updateName") {
        return { ...state, name: action.payload };
    }

    return state;
}

export function createCustomer(name, nationalID) {
    return { type: "customer/createCustomer", payload: { name, nationalID, createdAt: new Date().toISOString() } };
}

export function updateName(name) {
    return { type: "customer/updateName", payload: name };
}
