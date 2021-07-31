//modules
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getFirestore } from './firebase/index.js';


//components
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'

//providers
import CartProvider from './providers/CartProvider'

const db = getFirestore();
const itemCollection = db.collection('categories');

function App() {

  const[categories, setCategories] = useState([]);

  //load categories from firestore
  useEffect(() => {
    let callback = (querySnapshot) => {
      setCategories(querySnapshot.docs.map(doc => {
          let data = doc.data();
          data.id = doc.id;
  
          return data;
      }));
    };
    
    itemCollection.get().then(callback);
  }, []);
  

  return (
    <CartProvider>
      <BrowserRouter> 
        <NavBar categories={categories} />
        <Switch> 
          <Route exact path={["/", "/category/:categoryId"]}>
            <ItemListContainer greeting={ <h1>Welcome to AV PopStore!</h1> }/>
          </Route>
          <Route exact path={"/item/:itemId"}>
            <ItemDetailContainer />
          </Route>
          <Route exact path={"/cart"}>
            <Cart />
          </Route>
        </Switch>
      </BrowserRouter> 
    </CartProvider>
  );
}

export default App;
