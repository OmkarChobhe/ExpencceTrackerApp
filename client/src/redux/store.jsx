import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";


export default configureStore({
    reducer: {
        expense: expenseReducer,
    },
});
