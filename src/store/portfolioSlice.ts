import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Coin = {
  id: string
  name: string
  symbol: string
  amount: number
}

interface PortfolioState {
  coins: Coin[]
}

const initialState: PortfolioState = {
  coins: [],
}

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<Coin>) => {
      state.coins.push(action.payload)
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addCoin, removeCoin } = portfolioSlice.actions
export default portfolioSlice.reducer
