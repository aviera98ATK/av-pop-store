//modules
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//components
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'

//providers
import CartProvider from './providers/CartProvider'

//data
import Categories from './data/Categories.json'

function App() {
  return (
    <CartProvider>
      <BrowserRouter> 
        <NavBar categories={Categories} />
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
