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
    },
    reducers: {
        cartTicketValue: (state, action) => {
            state.cartTicket.price = action.payload.price;
            state.cartTicket.showTime = action.payload.showTime;
            state.cartTicket.seats = action.payload.seats;
            state.cartTicket.combos = action.payload.combos;
        },
    },
});

export const { cartTicketValue } = cartTicketSlice.actions;

export default cartTicketSlice.reducer;
