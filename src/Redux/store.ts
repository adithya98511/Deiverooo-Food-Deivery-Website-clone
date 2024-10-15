// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import restaurantReducer from './reducers/restaurantSlicer'
import authReducer from './reducers/authSlicer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
