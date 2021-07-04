//dependencies
import { useState, createContext } from "react";

//context
import CartContext from './../context/CartContext'

const CartProvider = ({ defaultValue = [] , children}) =>
{
    const [cart, setCart] = useState(defaultValue);

    function addItem(item, quantity)
    {
        console.log(`addItemCalled`);

        if(isInCart(item.id))
        {
            console.log("Item already exists in cart");
            return;
        }

        console.log(`add item to cart: ${item}`, item);

        setCart([...cart, { item: item, quantity: quantity }]);
    }

    function removeItem(id)
    {
        let filteredItems = cart.filter(obj => obj.item.id != id);

        setCart(filteredItems);
    }

    function isInCart(id)
    {
        console.log("isInCart called", id);
        let isIn = false;
        
        if(id != undefined)
            isIn = cart.find(obj => obj.item.id === id);

        console.log(`isInCart: ${isIn}`);

        return (isIn === undefined) ? false : isIn;
    }

    function clearCart()
    {
        setCart(defaultValue);
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, itemsSize: cart.length }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;