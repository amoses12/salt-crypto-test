import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: {
    btcAddress: '',
    amount: 0,
  },
  balanceComparison: {
    btcAddress: '',
    percentAvailable: 0,
    data: [{ id: '', label: '', value: 0 }],
  },
  spent: false,
  btcAddress: '',
};

export const counterSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setBalanceComparison: (state, action) => {
      console.log('PAYLOAD: ', action.payload);
      state.balanceComparison = action.payload;
    },
    setSpent: (state, action) => {
      state.spent = action.payload;
    },
    setBtcAddress: (state, action) => {
      state.btcAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBalance, setBalanceComparison, setSpent, setBtcAddress } =
  counterSlice.actions;

export default counterSlice.reducer;
