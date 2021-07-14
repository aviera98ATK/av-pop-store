import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import { getFirestore } from './../firebase/index.js';

import CartContext from './../context/CartContext';

const db = getFirestore();
const itemCollection = db.collection('orders');

const Cart = () => {

    const { cart, removeItem, clearCart, cartSize } = useContext(CartContext); 
    const[totalPrice, setTotalPrice] = useState(0);
    const[pageLoaded, setPageLoaded] = useState(false);

    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[formMsg, setFormMsg] = useState("");

    const[orderId, setOrderId] = useState("");
    

    useEffect(() => {
        let sum = 0;
        cart.map(obj => {
            sum += (obj.item.price * obj.quantity);
        });

        setTotalPrice(sum);

        if(!pageLoaded)
        {
            let elems = document.querySelectorAll('.modal');
            M.Modal.init(elems, {inDuration: 300, outDuration: 225});

            setPageLoaded(true);
        }
    }, [cart]);

    const removeItemHandler = (id) => {
        removeItem(id);
    }

    const clearCartHandler = () => {
        clearCart();
    }

    const sendOrder = (order, callback) => {
        //do insert on firebase
        itemCollection.add(order)
        .then((res) => {
            let elem = document.getElementById("order-info-modal");
            let modalInstance = M.Modal.getInstance(elem);

            console.log(`Order added with Id: ${res.id}`);
            setOrderId(res.id);
            clearCart();
            setFullName("");
            setEmail("");
            setPhone("");
            callback();
            modalInstance.open();
        })
        .catch((error) => {
            console.error(`Error adding order: ${error}`);
        });
    };

    const sendBuyerInfo = () => {
        let elem = document.getElementById("buyer-info-modal");
        let modalInstance = M.Modal.getInstance(elem);
        let numberPattern = /^\d+$/;

        if(fullName === "" || email === "" || phone === "")
        {
            setFormMsg("Fields cannot be empty.");
            return;
        }

        //input of type email only verifies that @ exists in input
        if(email.indexOf("@") === -1)
        {
            setFormMsg("Email is not valid. Please insert a valid email.");
            return;
        }
            

        //check if phone number is only numbers
        if(!numberPattern.test(phone))
        {
            setFormMsg("Phone may only contain numbers.");
            return;
        }

        let items = cart.map(obj => {
            return {
                'id': obj.item.id,
                'title': obj.item.title,
                'price': obj.item.price
            };
        });

        let order = {
            'buyer': {
                'name': fullName,
                'email': email,
                'phone': phone
            },
            'items': items,
            //date
            'total': totalPrice
        }

        sendOrder(order, () => { modalInstance.close() });
        return null;
    }

    const closeOrderInfo = () => {
        let elem = document.getElementById("order-info-modal");
        let modalInstance = M.Modal.getInstance(elem);

        modalInstance.close();
        setOrderId("");
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col s12 m12 text-center">
                    <h1>Finish Your Buy</h1>
                    
                </div>

                <div id="order-info-modal" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <h4>Order Information</h4>
                                        <p>Your order has been successfully done. Your order ID is: {orderId}</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={ closeOrderInfo } className="waves-effect waves-green btn">Send</button>
                    </div>
                </div>

                <div id="buyer-info-modal" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="col s12">
                                        <h4>Buyer Information</h4>
                                        <p>To finish the buying we need the next information </p>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input  id="full_name" type="text" className="validate"  onChange={e => setFullName(e.target.value)} />
                                        <label htmlFor="full_name">Full Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">email</i>

                                        <input  id="email" type="email" className="validate" onChange={e => setEmail(e.target.value)} />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">local_phone</i>
                                        <input  id="number" type="text" className="validate" onChange={e => setPhone(e.target.value)}/>
                                        <label htmlFor="number">Phone</label>
                                    </div>
                                    <div className="col s12 text-center">
                                        <p><strong>{ formMsg }</strong></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={ sendBuyerInfo } className="waves-effect waves-green btn">Send</button>
                    </div>
                </div>

                {
                    cartSize > 0 
                    ?
                        <>
                            <div className="col s12 m12 ">
                                <div className="col s12 offset-m11 m1 text-right" style={{ marginBottom: "10px"}}>
                                    <button 
                                        className="waves-effect waves-light btn"
                                        onClick={ clearCartHandler }
                                    >
                                        Clear
                                    </button>
                                    
                                </div>
                                <ul className="collection">
                                    {
                                        cart.map(obj => {
                                            return (
                                                <li key={ obj.item.id } className="collection-item avatar">
                                                    <img src={ obj.item.pictureURL } alt="" className="circle" />
                                                    <span className="title">{ obj.item.title }</span>
                                                    <p>Units: { obj.quantity } <br />
                                                        Price: ${ obj.quantity * obj.item.price }
                                                    </p>
                                                    <button 
                                                        className="secondary-content waves-effect waves-light btn"
                                                        onClick={ () => removeItemHandler(obj.item.id) }
                                                    >
                                                        <i className="material-icons">delete_forever</i>
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col s12 m12 text-center" style={{ paddingBottom: "25px"}}>
                                <h5> Total Price: ${ totalPrice }</h5>
                                <button data-target="buyer-info-modal" className="btn waves-effect waves-light modal-trigger">Buy!</button>
                            </div>
                            
                            
                        </>
                        
                    :
                        <div className="col s12 m12 text-center" style={{ paddingBottom: "25px"}}>
                            <hr></hr>
                            <h4>There aren't items to buy.</h4>
                            <Link to={"/"} className="waves-effect waves-light btn" >Check our products!</Link> 

                            
                        </div>

                        
                }
            </div>
        </div>
    )
}

export default Cart;