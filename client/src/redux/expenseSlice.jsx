import {createSlice} from '@reduxjs/toolkit';


const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expense: [],
        loadingSpinner: false,
        allTransactions: [],
        error: null,
    },
    reducers: {
        loadingSpinnerActive: (state) => {
            state.loadingSpinner = true;
        },
        setAllTransactions: (state, action) => {
            state.allTransactions = action.payload;
        },

      
    },
});

export const { loadingSpinnerActive, setAllTransactions} = expenseSlice.actions;
export default expenseSlice.reducer;