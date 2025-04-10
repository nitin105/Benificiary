// File: src/store/beneficiarySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Beneficiary {
    id: number;
    fullName: string;
    address: string;
    country: string;
    pincode: string;
}

interface BeneficiaryState {
    items: Beneficiary[];
}

const initialState: BeneficiaryState = {
    items: [],
};

const beneficiarySlice = createSlice({
    name: 'beneficiaries',
    initialState,
    reducers: {
        setBeneficiaries: (state, action: PayloadAction<Beneficiary[]>) => {
            state.items = action.payload;
        },
        addBeneficiary: (state, action: PayloadAction<Beneficiary>) => {
            state.items.push(action.payload);
        },
        updateBeneficiary: (state, action: PayloadAction<Beneficiary>) => {
            const index = state.items.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeBeneficiary: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(b => b.id !== action.payload);
        },
    },
});

export const {
    setBeneficiaries,
    addBeneficiary,
    updateBeneficiary,
    removeBeneficiary,
} = beneficiarySlice.actions;

export default beneficiarySlice.reducer;
