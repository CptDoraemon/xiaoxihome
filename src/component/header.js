import React from 'react';
import './header.css';
import { Link } from "react-router-dom";

function NavItem(props) {
    return (
        <Link to={'/' + props.value}>
            <li> {props.value} </li>
        </Link>
    )
}


class HeaderCover extends React.Component {
    render() {
        return (
            <div className='header-cover'>
                <ul>
                    <NavItem value={'home'} />
                    <NavItem value={'work'} />
                    <NavItem value={'about'} />
                    <NavItem value={'contact'} />
                </ul>
            </div>
        )
    }
}

class HeaderSticky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headerClassName: 'header-fixed',
            placeholderClassName: 'header-fixed-placeholder'
        }
        this.handleScroll = this.handleScroll.bind(this);

    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll() {
        const scrolled = window.pageYOffset;
        if (scrolled >= 50 && this.state.placeholderClassName === 'header-fixed-placeholder') {
            this.setState({
                headerClassName: 'header-fixed fixed',
                placeholderClassName: 'header-fixed-placeholder-scrolled'
            })
        }
        if (scrolled < 50 && this.state.placeholderClassName !== 'header-fixed-placeholder') {
            this.setState({
                headerClassName: 'header-fixed',
                placeholderClassName: 'header-fixed-placeholder'
            })
        }

    }
    render() {
        return (
            <div>
                <div className={this.state.headerClassName}>
                    <h1> {this.props.headerTitle} </h1>
                    <ul>
                        <NavItem value={'home'} />
                        <NavItem value={'work'} />
                        <NavItem value={'about'} />
                        <NavItem value={'contact'} />
                    </ul>
                </div>
                <div className={this.state.placeholderClassName}> </div>
            </div>
        )
    }
}

export { HeaderCover, HeaderSticky };