import { useState, useEffect } from 'react'
import CartWidget from './CartWidget'
import M from 'materialize-css'

function NavBar() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!loaded)
        {
            let elems = document.querySelectorAll('.dropdown-trigger');
            M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});

            setLoaded(true);
        }

        
    }, [])
    return(
        <>
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!">All</a></li>
                <li className="divider"></li>
                <li><a href="#!">Pre-Orders</a></li>
                <li><a href="#!">Cooming Soon</a></li>
            </ul>
            <nav>
                <div className="nav-fixed">
                    <a href="#" className="brand-logo">AV PopStore</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#" className='dropdown-trigger' data-target='dropdown1'>Productos <i className="material-icons right">arrow_drop_down</i></a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><CartWidget/></li>
                    </ul>
                </div>
            </nav>
        </>
    )

}

export default NavBar;