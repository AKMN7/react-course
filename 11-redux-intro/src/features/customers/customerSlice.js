import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    nationalID: "",
    createdAt: ""
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer(state, action) {
            state.name = action.payload.name;
            state.nationalID = action.payload.nationalId;
            state.createdAt = action.payload.createdAt;
        },
        updateName(state, action) {
            state.name = action.payload;
        }
    }
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
