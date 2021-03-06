//modules
import {useState, useEffect} from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {

    const[counter, setCounter] = useState(initial);
    const[addDisabled, setAddDisabled] = useState(false);
    const[removeDisabled, setRemoveDisabled] = useState(false);

    useEffect(() => {
        setAddDisabled((counter >= stock));
        setRemoveDisabled((counter <= initial));
    }, [counter, initial, stock])
    
    return(
        <div className="item-count-container">
            <div className="row">
                <div className="col s12">
                    <blockquote>Available stock: { stock }</blockquote>
                </div>
                <div className="col s12">
                    <div className="col s3">
                        <button 
                            onClick={ () => { setCounter(counter - 1) }}
                            className="waves-effect waves-teal btn-flat btn-small"
                            disabled={removeDisabled}
                        >
                            <i className="material-icons">remove</i>
                        </button>
                    </div>
                    <div className="col s6 item-count">
                        <label>{ counter }</label>
                    </div>
                    <div className="col s3">
                        <button 
                            onClick={ () => { setCounter(counter + 1); }} 
                            className="waves-effect waves-teal btn-flat btn-small"
                            disabled={addDisabled}
                        >
                            <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
                <div className="col s12"> <hr/> </div>
                <div className="col s12">
                    <button 
                        onClick = {() => onAdd(counter)} 
                        className="waves-effect waves-light btn item-count-btn" 
                        type="submit" 
                        name="action"
                    >
                        Add to Cart!
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ItemCount;