import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'


function App() {
  return (
    <> 
      <NavBar/>
      <ItemListContainer greeting={ <h1>Welcome to AV PopStore!</h1> }/>
      <ItemDetailContainer />
    </>
  );
}

export default App;
