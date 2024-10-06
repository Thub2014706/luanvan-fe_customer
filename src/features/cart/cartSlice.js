import { createSlice } from '@reduxjs/toolkit';

export const cartTicketSlice = createSlice({
    name: 'cart',
    initialState: {
        cartTicket: {
            price: 0,
            showTime: null,
            seats: [],
            combos: [],
        },
        cartCombo: {
            combos: [],
            price: 0
        }
    },
    reducers: {
        cartTicketValue: (state, action) => {
            state.cartTicket.price = action.payload.price;
            state.cartTicket.showTime = action.payload.showTime;
            state.cartTicket.seats = action.payload.seats;
            state.cartTicket.combos = action.payload.combos;
        },
        clearAll: (state) => {
            state.cartTicket.price = 0;
            state.cartTicket.showTime = null;
            state.cartTicket.seats = [];
            state.cartTicket.combos = [];
        },
        cartComboValue: (state, action) => {
            state.cartCombo.combos = action.payload.combos;
            state.cartCombo.price = action.payload.price;
        }
    },
});

export const { cartTicketValue, clearAll, cartComboValue } = cartTicketSlice.actions;

export default cartTicketSlice.reducer;
