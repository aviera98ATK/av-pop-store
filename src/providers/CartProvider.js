//dependencies
import { useState } from "react";

//context
import CartContext from './../context/CartContext'

const CartProvider = ({ defaultValue = [] , children}) =>
{
    const [cart, setCart] = useState(defaultValue);

    function addItem(item, quantity)
    {
        if(isInCart(item.id))
        {
            let items = [...cart];
            let index = items.findIndex(elem => elem.item.id === item.id);
            items[index].quantity = items[index].quantity + quantity;

            setCart(items);

            return;
        }

        setCart([...cart, { item: item, quantity: quantity }]);
    }

    function removeItem(id)
    {
        let filteredItems = cart.filter(obj => obj.item.id !== id);

        setCart(filteredItems);
    }

    function isInCart(id)
    {
        let isIn = false;
        
        if(id !== undefined)
            isIn = cart.find(obj => obj.item.id === id);

        return (isIn === undefined) ? false : isIn;
    }

    function clearCart()
    {
        setCart(defaultValue);
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, isInCart, cartSize: cart.length }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;