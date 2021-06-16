import Item from './Item'

const ItemList = ({ items }) => {


    return(
        <div className="row">
            {
                (items && Array.isArray(items))
                ?
                    items.map(item => {
                        return (
                            <Item 
                                id={item.id} 
                                title={item.title}
                                price={item.price} 
                                pictureURL={item.pictureURL}
                                description={item.description}
                                stock={item.stock}
                            />
                        )
                    })
                :
                    <h5>There aren't items to show</h5>
            }
        </div>
    )

}

export default ItemList;