import React from 'react';
import { Link } from 'react-router-dom';
import './gallery.css'
import { galleryData } from './galleryData';

import { IoIosArrowDropleft,  IoIosArrowDropright, IoMdHome, IoMdRadioButtonOff, IoMdRadioButtonOn, IoMdPlay} from "react-icons/io";


function Show(props) {
    return (
        <div className='showcase'>
            <div
                className='show'
                style={{backgroundImage: 'url(' + props.link + ')'}}>
            </div>
        </div>
        )
}
class Hud extends React.Component {
    // It receives props album, pages, title, description, handleClick
    constructor(props) {
        super(props);
        this.state = {
            thumbnailStyle: 'thumbnail-inactive',
            thumbnailTop: '50px',
            thumbnailLeft: null,
            thumbnailText: null,
            thumbnailLink: null,
            hudClassName: 'hud-on'
        };
        this.dataArray = [...galleryData];
    }
    handleMouseEnter = (album, page, e) => {
        let x;
        page === 0 ?
            this.setState({thumbnailStyle: 'thumbnail-active-text'}) :
            this.setState({thumbnailStyle: 'thumbnail-active-image'});
        page === 0 ?
            // TEXT
            this.setState({
                thumbnailText: this.dataArray[album][page],
                thumbnailLink: null,
                thumbnailLeft: x = e.clientX - 20 + 'px'
            }) :
            // IMAGE
            this.setState({
                thumbnailLink: this.dataArray[album][page].link,
                thumbnailText: null,
                thumbnailLeft: x = e.clientX - 100 + 'px'
            });
    };
    handleMouseLeave() {
        this.setState({thumbnailStyle: 'thumbnail-inactive'});
    };
    hudOpacity() {
    }
    componentDidMount() {
        window.addEventListener('mousemove', this.hudOpacity);
    }
    componentWillUnmount() {

    }
    render() {
        const list = this.dataArray.map((i, indexI) => i.map((j, indexJ) => {
            const attr = {
                album: {indexI},
                page: {indexJ},
                onMouseEnter: (e) => this.handleMouseEnter(indexI, indexJ, e),
                onMouseLeave: () => this.handleMouseLeave(),
            }
            return (
                indexI === this.props.album && indexJ === this.props.page ?
                    <li {...attr}
                        onClick={() => this.props.onClick(indexI, indexJ)}><IoMdRadioButtonOn color='white'/></li> :
                indexJ === 0 ?
                   <li {...attr}><IoMdPlay color='white'/></li> :
                   <li
                       {...attr}
                       onClick={() => this.props.onClick(indexI, indexJ)}><IoMdRadioButtonOff color='white'/></li>
            )
        }));
        return (
            <div className={this.state.hudClassName}>
                <div className='nav-buttons'>
                    <IoIosArrowDropleft size='2em'/>
                    <IoMdHome size='2em' />
                    <IoIosArrowDropright size='2em' />
                </div>
                <div className='menu'>
                    <ul>
                        {list}
                    </ul>
                    <div
                        className={this.state.thumbnailStyle}
                        style={{
                           top: this.state.thumbnailTop,
                           left: this.state.thumbnailLeft,
                           backgroundImage: 'url(' + this.state.thumbnailLink + ')'
                        }}>
                        { this.state.thumbnailText }
                        </div>
                    <div className='text'>
                        <h1> {this.props.title} </h1>
                        <p> {this.props.description} </p>
                    </div>
                </div>
            </div>
        )
    }
}
class Gallery extends React.Component {
    // It recevices props album and page from index
    constructor(props) {
        super(props);
        this.state = {
            album: 0,
            page: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(album, page){
        this.setState({
            album: album,
            page: page
        })
    }
    componentDidMount() {
        this.setState(
            this.state = {
                album: this.props.album
            }
        )
    }

    render() {
        const dataArray = [...galleryData];
        const title = dataArray[this.state.album][0];
        const description = dataArray[this.state.album][this.state.page].description;
        const link = dataArray[this.state.album][this.state.page].link;
        return (
            <div>
                <Show link={link}/>
                <Hud
                    album={this.state.album}
                    page={this.state.page}
                    title={title}
                    description={description}
                    onClick={this.handleClick} />
            </div>
            )
    }
}

export { Gallery }