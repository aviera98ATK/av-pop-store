import ItemCount from './ItemCount'

const ItemDetail = ({ item }) => {

    const onAdd = (quantity) => {
        console.log(`Added ${quantity} units of the product.`);
    };

    return(
        <div className="row">
                <div className="col s12 m6 item-detail-picture-container">
                    <img className="item-detail-picture" src={item.pictureURL} />
                </div>
                <div className="col s12 m6 item-detail-info-container">
                    <label>{item.category}</label>
                    <h1 className="product-detail-title">{item.title}</h1>
                    <h3 className="product-detail-price">{item.price}</h3>

                    <h4 className="product-detail-description">Description</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit augue nibh ullamcorper diam, suscipit faucibus habitant proin rhoncus justo himenaeos eleifend vivamus senectus, sociosqu in hendrerit venenatis pretium cursus nulla interdum nisi potenti.</p>
                    <div className="col s12 m8 offset-m2">
                        <ItemCount stock={item.stock} initial = {1} onAdd = {onAdd}/>
                    </div>
                </div>
            
        </div>
        
    )
}

export default ItemDetail;