const Item = ({ id, title, price, pictureURL }) => {
    return(
        <div className="col s12 m3" key={id}>
            <div className="card">
                <div className="card-image">
                    <img src={pictureURL} />
                </div>
                <div className="card-content">
                    <span className="card-title">{title}</span>
                    <label className="card-price">{price}</label>
                </div>
            </div>
        </div>
    )
}

export default Item;