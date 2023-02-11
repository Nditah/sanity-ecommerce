import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface IContextProps {
    loggedIn: boolean
    showCart: boolean
    cartItems: Array<CartItem>
    totalPrice: number
    totalQuantities: number
    quantity: number
    setShowCart: (x: boolean) => void
    incQuantity: () => void
    decQuantity: () => void
    onAdd: (product: IProduct, quantity: number) => void
}
  
const Context = createContext({} as IContextProps);
// const Context = createContext<any>({});

export const StateContext = ({ children }: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<Array<CartItem>>([])
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [totalQuantities, setTotalQuantities] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1)

    const incQuantity = () => setQuantity((preQty) => preQty + 1)
    const decQuantity = () => setQuantity((preQty) => {
        if (preQty -1 < 1) return 1;
        return preQty - 1
    })

    const onAdd = (product: IProduct, quantity: number) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQty) => prevTotalQty + quantity)

        if (checkProductInCart) {
            const updateCartItems = cartItems.map((cartProduct: any) => {
                if(cartProduct._id === product._id) {
                   return {
                    ...cartProduct,
                    quantity: cartProduct.quantity 
                   } 
                }
            })

            setCartItems(updateCartItems)
            toast.success(`${quantity} ${product.name} added o the cart.`)
        } else { 
            setCartItems([...cartItems, { ...product, quantity }])
        } 
    }

    return (
        <Context.Provider
        
        value = {{
            loggedIn,
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            quantity,
            setShowCart,
            incQuantity,
            decQuantity,
            onAdd,
        }}
        > 
            {children} 
        </Context.Provider>
    )
    
}


export const useStateContext = () => useContext(Context)
