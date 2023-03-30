import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('meals/getAll', async () => {
    try {
        const { products } = await getData('/products.json')
        console.log('data', products)
        return products
    } catch (error) {
        console.log(error)
    }
})

// export const updateBasketItem =
//     ({ id, orderedQuantity }) =>
//     async (dispatch) => {
//         try {
//             await fetch(/products.json${id}, {
//                 method: 'PUT',
//                 body: { orderedQuantity },
//             })
//             dispatch(getProducts())
//         } catch (error) {
//             console.log(error)
//         }
//     }

function getData(endpoint) {
    const delay = (0.5 + Math.random() * 2) * 1000
    return new Promise((resolve, reject) => {
        if (delay < 1800) {
            const successId = setTimeout(function () {
                fetch(endpoint).then((res) => {
                    clearTimeout(successId)
                    resolve(res.json())
                    // return res
                })
            }, delay)
        } else {
            const failId = setTimeout(function () {
                fetch(endpoint).then((res) => {
                    clearTimeout(failId)
                    reject(res.json())
                })
            }, delay)
        }
    })
}
