import { useContext } from "react";
import { NavLink } from 'react-router-dom'

import CartContext  from '../context/CartContext'

const CartWidget = () =>{

    const { cartSize } = useContext(CartContext);

    console.log(cartSize);
    return(
        <NavLink className="waves-effect waves-light btn" to={"/cart"}>{ cartSize } <i className="material-icons left">shopping_cart</i></NavLink>
    )
}

export default CartWidget;