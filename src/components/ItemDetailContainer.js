import { useState } from 'react';
import ItemDetail from './ItemDetail'

const product = {
        id: 1,
        title: "Harry Potter #91 - Harry Potter",
        price: "$3.990",
        pictureURL: "https://http2.mlstatic.com/D_NQ_NP_781717-MLA44016983708_112020-O.webp",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit augue nibh ullamcorper diam, suscipit faucibus habitant proin rhoncus justo himenaeos eleifend vivamus senectus, sociosqu in hendrerit venenatis pretium cursus nulla interdum nisi potenti. ",
        stock: 10,
        category: 'Pre-Order',
        categoryId: 1
    }

const ItemDetailContainer = () => {

    const[item, setItem] = useState(null);
    const[dataLoaded, setDataLoaded] = useState(false);


   
    //get product task
    //wait 2 seconds to resolve
    //then set items hook and setDataLoaded to remove loading
    const getProduct = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(product);
        }, 2000);
    })
    .then((data) => {
        setItem(data);
        setDataLoaded(true); 
    });

    return(
        <>
            {/* {
                dataLoaded || 
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            } */}
            
            <div className="container">
                {  item && <ItemDetail item={item}/> }
            </div>
        </>
    )
}

export default ItemDetailContainer;