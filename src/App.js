import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
    <> 
      <NavBar/>
      <ItemListContainer greeting={ <h1>Welcome to AV PopStore!</h1> }/>
    </>
  );
}

export default App;
