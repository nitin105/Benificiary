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

// Load initial state from localStorage
const loadFromLocalStorage = (): Beneficiary[] => {
    const stored = localStorage.getItem('beneficiaries');
    return stored ? JSON.parse(stored) : [];
};

const initialState: BeneficiaryState = {
    items: loadFromLocalStorage(),
};

const beneficiarySlice = createSlice({
    name: 'beneficiaries',
    initialState,
    reducers: {
        setBeneficiaries: (state, action: PayloadAction<Beneficiary[]>) => {
            state.items = action.payload;
            localStorage.setItem('beneficiaries', JSON.stringify(state.items));
        },
        addBeneficiary: (state, action: PayloadAction<Beneficiary>) => {
            state.items.push(action.payload);
            localStorage.setItem('beneficiaries', JSON.stringify(state.items));
        },
        updateBeneficiary: (state, action: PayloadAction<Beneficiary>) => {
            const index = state.items.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
                localStorage.setItem('beneficiaries', JSON.stringify(state.items));
            }
        },
        removeBeneficiary: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(b => b.id !== action.payload);
            localStorage.setItem('beneficiaries', JSON.stringify(state.items));
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
