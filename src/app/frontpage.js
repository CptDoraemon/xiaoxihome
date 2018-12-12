import React from 'react';

import { HeaderCover} from "../component/header";
import { Footer} from "../component/footer";
import { MouseIcon } from "../component/mouseIcon"

import { BrowserRouter, Route, Link } from 'react-router-dom'

function Cover(props) {
    // It receives a prop onClickMouseIcon={this.scrollToWorkRef}
    return (
        <div className='cover'>
            <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
            <MouseIcon className='mouse-icon' onClickMouseIcon={props.onClickMouseIcon}/>
        </div>
    )
}

function Tile(props) {
    //receives props: link, className, tileName, imgUrl
    // tile for gallery
    if (props.imgUrl) {
        return (
            <Link to={props.link}>
                <div
                    className={props.className}
                    style={{backgroundImage: 'url("' + props.imgUrl + '")'}}>
                    <h5>{props.tileName}</h5>
                </div>
            </Link>
        )
    }
    // tile for projects
    return (
        <Link to={props.link}>
            <div
                className={props.className}>
                <h3>{props.tileName}</h3>
            </div>
        </Link>
    )
}

class ProjectList extends React.Component {
    render() {
        //props: type: academic, webApp, gallery
        //props: listAndLink
        //props: if(gallery) imgUrls

        // Academic Project List
        if (this.props.type === 'academic') {
            const array = [...this.props.listAndArray.academicProjectArray];
            const linkArray = [...this.props.listAndArray.academicProjectLinkArray];
            return (
                <div className='project-container'>
                    <h2>Academic Project</h2>
                    <div className='flexbox-wrapper-800'>
                        {array.map((i, index) => {
                            const tileSize = (index === 1 || index === 3) ? 'tile-big' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} />
                        })}
                    </div>
                </div>
            )
        }

        // Web App Project List
        if (this.props.type === 'webApp') {
            const array = [...this.props.listAndArray.webAppProjectArray];
            const linkArray = [...this.props.listAndArray.webAppProjectLinkArray];
            return (
                <div className='project-container'>
                    <h2>Web App Project</h2>
                    <div className='flexbox-wrapper-800'>
                        {array.map((i, index) => {
                            const tileSize = (index === 0 || index === 5) ? 'tile-big' : 'tile-sm';
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} />
                        })}
                    </div>
                </div>
            )
        }

        // Gallery Project List
        if (this.props.type === 'gallery') {
            const array = [...this.props.listAndArray.galleryArray];
            const linkArray = [...this.props.listAndArray.galleryLinkArray];
            return (
                <div className='project-container'>
                    <h2>Photography</h2>
                    <div className='flexbox-wrapper-800'>
                        {array.map((i, index) => {
                            const tileSize = 'tile-gallery';
                            const imgUrl = this.props.imgUrls[index];
                            return <Tile link={linkArray[index]} tileName={i} className={tileSize} imgUrl={imgUrl}/>
                        })}
                    </div>
                </div>
            )
        }
    }
}

class Frontpage extends React.Component {
    constructor(props) {
        super(props);
        this.workRef = React.createRef();
        this.state = {
            toWorkRef: this.props.toWorkRef,
        }
    }
    scrollToWorkRef = () => {
        window.scrollTo({
            top: this.workRef.current.offsetTop,
            behavior: 'smooth'
        })
    };
    componentDidMount() {
        if (this.state.toWorkRef) this.scrollToWorkRef();
    }
    render() {
        //It receives props: listAndLink
        return (
            <div>
                <HeaderCover listAndLink={this.props.listAndLink} />
                <Cover onClickMouseIcon={this.scrollToWorkRef}/>
                <div className={'color1'}>
                    <div ref={this.workRef}></div>
                    <ProjectList
                        type='academic'
                        listAndArray={this.props.listAndLink} />
                    <ProjectList
                        type='webApp'
                        listAndArray={this.props.listAndLink} />
                </div>
                <div className={'color-dark'}>
                    <ProjectList
                        type='gallery'
                        listAndArray={this.props.listAndLink}
                        imgUrls={[
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/toronto.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/canada.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/banff.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/hometown.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/yorku.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/astro.png'
                        ]} />
                </div>
                <Footer listAndLink={this.props.listAndLink}/>
            </div>
        )
    }
}

export {Frontpage};


