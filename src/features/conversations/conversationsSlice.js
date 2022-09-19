import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {}
})

export default conversationsSlice.reducer;
// eslint-disable-next-line no-empty-pattern
export const { } = conversationsSlice.actions;