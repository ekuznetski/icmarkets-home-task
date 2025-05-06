import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Coin = {
  id: string;
  name: string;
  symbol: string;
};

interface PortfolioState {
  coins: Record<string, Coin>;
}

const initialState: PortfolioState = {
  coins: {},
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<Coin>) => {
      state.coins[action.payload.id] = action.payload;
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      delete state.coins[action.payload];
    },
  },
});

export const { addCoin, removeCoin } = portfolioSlice.actions;
export default portfolioSlice.reducer;
