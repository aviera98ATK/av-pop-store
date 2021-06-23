import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'

const categories = [
  {
    id: 1,
    name: 'Pre-Order'
  },
  {
    id: 2,
    name: 'Coming soon'
  }
]

function App() {
  return (
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
      
  );
}

export default App;
