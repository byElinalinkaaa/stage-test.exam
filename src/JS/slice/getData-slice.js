import { createSlice } from '@reduxjs/toolkit'
import { getProducts } from '../dataService'

const getDataSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        total: 0,
        discount: 0,
        loading: false,
        error: false,
    },
    reducers: {
        addData: (state, action) => {
            console.log(action, 'action')
            console.log(state, 'state, action')
            state.data = state.data.map((item) =>
                item.id === action.payload.id
                    ? {
                          ...item,
                          total: item.total + item.price,
                          orderedQuantity: item.orderedQuantity + 1,
                      }
                    : { ...item }
            )
            state.total = state.total + action.payload.price
            state.discount = state.total / 10
        },

        subtractData: (state, action) => {
            state.data = state.data.map((item) =>
                item.id === action.payload.id
                    ? {
                          ...item,
                          total: item.total - item.price,
                          orderedQuantity: item.orderedQuantity - 1,
                      }
                    : { ...item }
            )
            state.total = state.total - action.payload.price
            state.discount = state.total
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
            state.error = false
        })
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true
            state.error = false
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.error = true
            state.loading = false
        })
    },
})
export const getDataSliceAction = getDataSlice.actions
export default getDataSlice
