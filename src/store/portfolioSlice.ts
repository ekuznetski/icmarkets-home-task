import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Coin = {
  id: string;
  name: string;
  symbol: string;
};

interface PortfolioState {
  coins: Coin[];
}

const initialState: PortfolioState = {
  coins: [],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<Coin>) => {
      if (!state.coins.find((c) => c.id === action.payload.id)) {
        state.coins.push(action.payload);
      }
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCoin, removeCoin } = portfolioSlice.actions;
export default portfolioSlice.reducer;
