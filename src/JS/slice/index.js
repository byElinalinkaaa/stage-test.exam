import { configureStore } from '@reduxjs/toolkit'
import getDataSlice from './getData-slice'
export const store = configureStore({
    reducer: {
        product: getDataSlice.reducer,
    },
})
