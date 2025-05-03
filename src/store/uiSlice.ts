import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortingState } from '@tanstack/react-table'

interface UIState {
  cryptoTableSorting: SortingState
}

const initialState: UIState = {
  cryptoTableSorting: [],
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCryptoTableSorting(state, action: PayloadAction<SortingState>) {
      state.cryptoTableSorting = action.payload
    },
    resetCryptoTableSorting(state) {
      state.cryptoTableSorting = []
    },
  },
})

export const { setCryptoTableSorting, resetCryptoTableSorting } = uiSlice.actions
export default uiSlice.reducer
