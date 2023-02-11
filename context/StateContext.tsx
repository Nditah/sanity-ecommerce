import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface IContextProps {
    loggedIn: boolean
    showCart: boolean
    cartItems: Array<CartItem>
    totalPrice: number
    totalQuantities: number
    quantity: number
    setCartItems: (arr: Array<CartItem>) => void
    setTotalPrice: (x: number) => void
    setTotalQuantities: (x: number) => void
    setShowCart: (x: boolean) => void
    incQuantity: () => void
    decQuantity: () => void
    setQuantity: (x: number) => void
    onAdd: (product: IProduct, quantity: number) => void
    onRemove: (product: CartItem) => void
    toggleCartItemQuantity: (id: string, value: 'inc' | 'dec') => void
}

const Context = createContext({} as IContextProps);
// const Context = createContext<any>({});

export const StateContext = ({ children }: any) => {
    const getLocalStorage = (name: string) => {
        if (typeof window !== 'undefined') {
            const storage = localStorage.getItem(name);
            if (storage) return JSON.parse(storage);
            return null;
        }
    };

    const sortItems = (arr: Array<CartItem>) => {
        return arr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    const initialCartItems = getLocalStorage('cartItems') || [];
    const initialTotalPrice = getLocalStorage('totalPrice') || 0;
    const initialTotalQuantities = getLocalStorage('totalQuantities') || 0;

    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    const [showCart, setShowCart] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<Array<CartItem>>(initialCartItems)
    const [totalPrice, setTotalPrice] = useState<number>(initialTotalPrice)
    const [totalQuantities, setTotalQuantities] = useState<number>(initialTotalQuantities)
    const [quantity, setQuantity] = useState<number>(1)

    const incQuantity = () => setQuantity((preQty) => preQty + 1)
    const decQuantity = () => setQuantity((preQty) => {
        if (preQty - 1 < 1) return 1;
        return preQty - 1
    })

    let findCartItem: CartItem | undefined;
    let cartItemIndex: number;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
    }, [cartItems, totalPrice, totalQuantities]);

    const onAdd = (product: IProduct, quantity: number) => {
        try {
            const checkProductInCart = cartItems.find((item) => item._id === product._id)
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
            setTotalQuantities((prevTotalQty) => prevTotalQty + quantity)

            if (checkProductInCart) {
                const updateCartItems = cartItems.map((cartProduct: any) => {
                    if (cartProduct._id === product._id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity
                        }
                    }
                })
                setCartItems(sortItems(updateCartItems))
                toast.success(`${quantity} ${product.name} added to the cart.`)
            } else {
                setCartItems(sortItems([...cartItems, { ...product, quantity }]))
                toast.success(`${quantity} ${product.name} added`);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const onRemove = (cartItem: CartItem) => {
        try {
            findCartItem = cartItems.find((item) => item._id === cartItem._id);
            if (!findCartItem) return
            const tempCart = cartItems.filter((item) => item._id !== cartItem._id);
            setTotalPrice(totalPrice - findCartItem.price * findCartItem.quantity);
            setTotalQuantities(totalQuantities - findCartItem.quantity);
            setCartItems(sortItems(tempCart));
        } catch (err) {
            console.log(err)
        }
    };

    const toggleCartItemQuantity = (cartItemId: string, value: 'inc' | 'dec') => {
        try {
            findCartItem = cartItems.find((item) => item._id === cartItemId);
            cartItemIndex = cartItems.findIndex((item) => item._id === cartItemId);
            if (!findCartItem) return
            const { price } = findCartItem
            const tempCart = cartItems.filter((item) => item._id !== cartItemId);

            if (value === 'inc') {
                setCartItems(sortItems([...tempCart, { ...findCartItem, quantity: findCartItem.quantity + 1 }]))
                setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
                setTotalQuantities((prevTotalQty) => prevTotalQty + 1)
            }

            if (value === 'dec') {
                if (findCartItem.quantity > 1) {
                    setCartItems(sortItems([...tempCart, { ...findCartItem, quantity: findCartItem.quantity - 1 }]))
                    setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
                    setTotalQuantities((prevTotalQty) => prevTotalQty - 1)
                }
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Context.Provider

            value={{
                loggedIn,
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                quantity,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                setShowCart,
                incQuantity,
                decQuantity,
                setQuantity,
                onAdd,
                onRemove,
                toggleCartItemQuantity,
            }}
        >
            {children}
        </Context.Provider>
    )

}


export const useStateContext = () => useContext(Context)
