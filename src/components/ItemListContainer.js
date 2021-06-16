import { useState } from 'react';
import ItemList from './ItemList'

const productList = [
    {
        id: 1,
        title: "Harry Potter #91 - Harry Potter",
        price: "$3.990",
        pictureURL: "https://http2.mlstatic.com/D_NQ_NP_781717-MLA44016983708_112020-O.webp",
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock: 10,
    },
    {
        id: 2,
        title: "DB Super #668 - SSGSS Goku" ,
        price: "$4.500",
        pictureURL:"https://d3ugyf2ht6aenh.cloudfront.net/stores/956/823/products/feb867d3-0500-44d6-96b0-f6a12f3cb835-35f17c98c9c1b7c08a15989908896410-1024-1024.jpg",
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock:33
    },
    {
        id: 3,
        title:"Rick & Morty #301 - Beth" ,
        price: "$4.000" ,
        pictureURL:"https://proxyworld.com.ar/wp-content/uploads/2020/02/funko-pop-301-rick-and-morty-beth-D_NQ_NP_668907-MLA31098724454_062019-F_resultado.jpg" ,
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock: 21
    },
    {
        id: 4,
        title: "Avengers Endgame #451 - Hulk " ,
        price: "$6.000",
        pictureURL: "https://static1.funidelia.com/301994-f6_big2/funko-pop-hulk-vengadores-endgame.jpg" ,
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock: 2
    },
    {
        id: 5,
        title: "Avengers Endgame #580 - Iron Man" ,
        price: "$7.000",
        pictureURL: "https://http2.mlstatic.com/D_NQ_NP_610155-MLA44208347816_112020-O.jpg" ,
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock:32 
    },
    {
        id: 6,
        title: "Naruto #182 - Kakashi",
        price: "$3.500",
        pictureURL: "https://i.linio.com/p/62ae142cd46e7cbc8ac6c82ca0715434-product.jpg" ,
        description: "Estas figuras normalmente tienen un tamaño de 3,75 pulgadas, lo que serían 10 cm aproximadamente.",
        stock: 100
    }
]

const ItemListContainer = ({ greeting }) => {

    const[items, setItems] = useState(null);
    const[dataLoaded, setDataLoaded] = useState(false);


    //get products task
    //wait 2 seconds to resolve
    //then set items hook and setDataLoaded to remove loading
    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productList);
        }, 2000);
    })
    .then((data) => {
        setItems(data);
        setDataLoaded(true); 
    });

    return(
        <>
            {
                dataLoaded || 
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            }
            
            <div className="container text-center justify-center align-center">
                <div className="row">
                    <div className="col s12 page-title">{ greeting }</div>
                    <br />
                    <ItemList items={items}/>
                </div>
            </div>
        </>
    )
}

export default ItemListContainer;