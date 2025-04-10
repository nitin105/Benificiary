// File: src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import beneficiaryReducer from './beneficiarySlice';

export const store = configureStore({
    reducer: {
        beneficiaries: beneficiaryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
