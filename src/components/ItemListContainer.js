//modules
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getFirestore } from './../firebase/index.js';

//components
import ItemList from './ItemList'

const db = getFirestore();
const itemCollection = db.collection('items');

const ItemListContainer = ({ greeting }) => {

    const[items, setItems] = useState(null);
    const[dataLoaded, setDataLoaded] = useState(false);
    const { categoryId } = useParams();

    useEffect(() => {
        setDataLoaded(false);

        let callback = (querySnapshot) => {
            if (querySnapshot.size === 0) {
                console.log('No results');
            }

            setItems(querySnapshot.docs.map(doc => {
                let data = doc.data();
                data.id = doc.id;

                return data;
            }));

            setDataLoaded(true);
        };

        if(categoryId)
        {
            //parse param to int due that firestore field is of type number
            let categoryIdParam = Number.parseInt(categoryId);
            itemCollection.where("categoryId", "==", categoryIdParam).get().then(callback);
        }
        else
            itemCollection.get().then(callback);

    }, [categoryId]);
    

    return(
        <>
            {
                dataLoaded || 
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            }
            
            <div className="container text-center item-list-container">
                <div className="row">
                    <div className="col s12 m12 page-title">{ greeting }</div>
                    <br />
                    <div className="col s12 m12">
                        { dataLoaded && <ItemList items={items}/> }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemListContainer;