import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {}
})

export default messagesSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const { } = messagesSlice.actions;