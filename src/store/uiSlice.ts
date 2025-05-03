import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
}

const initialState: UIState = {
  theme: 'dark',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = uiSlice.actions
export default uiSlice.reducer
