import React from 'react';
import './footer.css';
import { Link } from "react-router-dom";

function NavItem(props) {
    return (
        <Link to={'/' + props.value}>
            <li> {props.value} </li>
        </Link>
    )
}

class Footer extends React.Component {
    render() {
        return (
            <div className='footer'>
                <ul>
                    <NavItem value={'home'} />
                    <NavItem value={'work'} />
                    <NavItem value={'about'} />
                    <NavItem value={'contact'} />
                </ul>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018</p>
                </div>
            </div>
        )
    }
}

export { Footer };