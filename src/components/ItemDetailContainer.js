//modules
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

//components
import ItemDetail from './ItemDetail'

//data
import Products from './../data/Products.json'

const productsList = Products;

const ItemDetailContainer = () => {

    const[item, setItem] = useState(null);
    const[dataLoaded, setDataLoaded] = useState(false);

    const { itemId } = useParams();

    useEffect(() => {
        //get product task
        //wait 2 seconds to resolve
        //then set items hook and setDataLoaded to remove loading
        const getProduct = new Promise((resolve, reject) => {
            setTimeout(() => {
                let product = productsList.find(product => product.id == itemId);

                resolve(product);
            }, 2000);
        })
        .then((data) => {
            setItem(data);
            setDataLoaded(true); 
        });
    });
    

    return(
        <>
            {
                dataLoaded || 
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            }
            
            <div className="container">
                { dataLoaded && <ItemDetail item={item}/> }
            </div>
        </>
    )
}

export default ItemDetailContainer;