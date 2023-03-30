import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { getProducts } from './dataService'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getDataSliceAction } from './slice/getData-slice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
}) => {
    const dispatch = useDispatch()

    const increment = () => {
        dispatch(
            getDataSliceAction.addData({
                id,
                price,
            })
        )
    }

    const decrement = () => {
        if (orderedQuantity > 0) {
            dispatch(getDataSliceAction.subtractData({ id, price }))
        }
    }
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total.toFixed(2)}</td>
            <td>
                <button onClick={increment} className={styles.actionButton}>
                    +
                </button>
                <button onClick={decrement} 
                // disabled={0}
                className={styles.actionButton}>
                    -
                </button>
            </td>
        </tr>
    )
}
// const 
const Checkout = () => {
    const { data, error, loading, total,discount } = useSelector(
        (state) => state.product
    )
    console.log(data, 'data lina')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                {loading ? (
                    <LoadingIcon />
                ) : (
                    <>
                        {error ? (
                            <h4 style={{ color: 'red' }}>
                                Some thing went wrong
                            </h4>
                        ) : (
                            <>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th># Available</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.map((item) => (
                                            <Product key={item.id} {...item} />
                                        ))}
                                    </tbody>
                                </table>
                                <h2>Order summary</h2>
                                <p>Discount:{discount.toFixed(2) > 1000} $ </p>

                                <p>Total: ${}</p>
                                <p>
                                    Total:
                                    {total.toFixed(2) > 1000 ? (
                                        <p>
                                            {total.toFixed(2) -
                                                total.toFixed(2) / 10}
                                        </p>
                                    ) : (
                                        total.toFixed(2)
                                    )}
                                    $
                                </p>
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}

export default Checkout
