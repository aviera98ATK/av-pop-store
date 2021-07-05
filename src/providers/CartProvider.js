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
            let items = [...cart];
            let index = items.findIndex(elem => elem.item.id === item.id);
            items[index].quantity = items[index].quantity + quantity;

            setCart(items);

            console.log(`Updated item [${item.title}] from cart. New quantity: [${items[index].quantity}]`)

            return;
        }

        console.log(`add item to cart`, item);

        setCart([...cart, { item: item, quantity: quantity }]);
    }

    function removeItem(id)
    {
        let filteredItems = cart.filter(obj => obj.item.id != id);

        setCart(filteredItems);
    }

    function isInCart(id)
    {
        console.log(`isInCart called for item Id [${id}]`);
        let isIn = false;
        
        if(id != undefined)
            isIn = cart.find(obj => obj.item.id === id);

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