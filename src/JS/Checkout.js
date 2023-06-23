/* eslint-disable prettier/prettier */
import styles from './Checkout.module.css'
import { LoadingIcon } from './Icons'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductThunk } from '../store/Product.thunk'
import { productAction } from '../store/Product.slice'

const Product = ({
    id,
    name,
    availableCount,
    price,
    orderedQuantity,
    total,
    incrementChangeHandler,
    decrementChangeHandler
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{availableCount}</td>
            <td>${price}</td>
            <td>{orderedQuantity}</td>
            <td>${total}</td>
            <td>
                <button 
                className={styles.actionButton}
                onClick={incrementChangeHandler}
                disabled={orderedQuantity === availableCount}>+</button>

                <button 
                className={styles.actionButton}
                onClick={decrementChangeHandler}
                disabled={!total}>-</button>
            </td>
        </tr>
    )
}

const Checkout = () => {
    const dispatch = useDispatch()
    const { product, isLoading, error, total, discount } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    const incrementHandlar = (id)=>{
       dispatch(productAction.increment(id))
    }

    const decrementHandlar = (id)=>{
        dispatch(productAction.decrement(id))
    }
    return (
        <div>
            <header className={styles.header}>
                <h1>Electro World</h1>
            </header>
            <main>
                <>
                    {isLoading ? (
                        <LoadingIcon />
                    ) : (
                        <>
                            {error && (
                                <h4 style={{ color: 'red' }}>
                                    Some thing went wrong
                                </h4>
                            )}
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th># Available</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                {product.map((el) => (
                                    <tbody key={el.id}>
                                        <Product 
                                        id={el.id}
                                        name={el.name}
                                        availableCount={el.availableCount}
                                        price={el.price}
                                        orderedQuantity={el.orderedQuantity}
                                        total={el.total}
                                        incrementChangeHandler=
                                        {() => incrementHandlar(el.id)}
                                        decrementChangeHandler=
                                        {() => decrementHandlar(el.id)}
                                        />
                                    </tbody>
                                ))}
                            </table>
                        </>
                    )}

                    <h2>Order summary</h2>

                    {!discount ? null : (
                    <p>Discount: $ {discount.toFixed(2)} </p>
                    )}
                    
                    <p>Total: $ {total.toFixed(2)} </p>
                </>
            </main>
        </div>
    )
}

export default Checkout
