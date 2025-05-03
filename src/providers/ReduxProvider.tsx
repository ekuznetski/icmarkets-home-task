'use client'

import { store, persistor } from '@/store'
import { Provider } from 'react-redux'
import { PropsWithChildren } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
