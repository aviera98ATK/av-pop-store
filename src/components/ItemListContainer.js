import ItemCount from './ItemCount';

const ItemListContainer = ({ greeting }) => {

    const onAdd = () => {
        console.log("addOn called!");
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col s12">{ greeting }</div>
                <br />
                <div className="col s6 offset-s3">
                    <ItemCount stock={ 13 } initial={ 1 } onAdd={ () => { onAdd() }}/>
                </div>
            </div>
        </div>
    )
}

export default ItemListContainer;