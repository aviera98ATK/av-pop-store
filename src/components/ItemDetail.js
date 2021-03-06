//modules
import { useContext, useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

//components
import CartContext from './../context/CartContext'
import ItemCount from './ItemCount'

const ItemDetail = ({ item }) => {
    const { cart, addItem, isInCart } = useContext(CartContext);
    const[addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        let value = isInCart(item.id);

        setAddedToCart(value);
            
    }, [cart, isInCart, item.id]);

    
    const onAdd = (quantity) => {
        addItem(item, quantity);
    };

    return(
        <div className="row item-detail">
            { 
                item ?
                <>
                    <div className="col s12 m12 item-breadcrums">
                        <label>
                            <NavLink  to={"/"} activeClassName="item-breadcrum-selected">Products</NavLink> &gt;
                            <NavLink  to={`/category/${item.categoryId}`} activeClassName="item-breadcrum-selected"> {item.category} </NavLink> &gt;
                            <NavLink  to={`/item/${item.id}`} activeClassName="item-breadcrum-selected"> {item.title} </NavLink> 
                        </label>

                    </div>
                    <div className="col s12 m6 item-detail-picture-container">
                        <img className="item-detail-picture" alt={item.title} src={item.pictureURL} />
                    </div>
                    <div className="col s12 m6 item-detail-info-container">
                        <label>{item.category}</label>
                        <h1 className="product-detail-title">{item.title}</h1>
                        <h3 className="product-detail-price">${item.price}</h3>

                        <h4 className="product-detail-description">Description</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit augue nibh ullamcorper diam, suscipit faucibus habitant proin rhoncus justo himenaeos eleifend vivamus senectus, sociosqu in hendrerit venenatis pretium cursus nulla interdum nisi potenti.</p>
                        <div className="col s12 m8 offset-m2 text-center">
                        <ItemCount stock={item.stock} initial={1} onAdd={onAdd}/>
                            {
                                addedToCart && <Link to={"/cart"} className="waves-effect waves-light btn item-count-btn" >Finish Buying</Link>
                            }
                        </div>
                    </div>
                </>
                :
                    <div className="col s12 m12 text-center">
                        <h1>Product not found!</h1>
                    </div>
            }
        </div>
        
    )
}

export default ItemDetail;