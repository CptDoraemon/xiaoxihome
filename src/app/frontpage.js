import React from 'react';

import { HeaderCover} from "../component/header";
import { Footer} from "../component/footer";
import { MouseIcon } from "../component/mouseIcon"

import { BrowserRouter, Route, Link } from 'react-router-dom'

function Cover(props) {
    return (
        <div className='cover'>
            <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
            <MouseIcon className='mouse-icon'/>
        </div>
    )
}

function Tile(props) {
    // tile for gallery
    if (props.imgUrl) {
        return (
            <div
                className={props.className}
                style={{backgroundImage: 'url("' + props.imgUrl + '")'}}>
                <h5>{props.tileName}</h5>
            </div>
        )
    }
    // tile for projects
    let link = props.tileName.split(' ').join('-');
    link = ('/academic-project/').concat(link);
    return (
        <Link to={link}>
            <div
                className={props.className}>
                <h3>{props.tileName}</h3>
            </div>
        </Link>
    )
}

class ProjectList extends React.Component {
    render() {
        let tiles = [...this.props.list];
        const tileSize = (index) => {
            if ((this.props.className.tile === '1-2-1-2-1-1' && (index === 1 || index === 3))
            || ((this.props.className.tile === '2-1-1-1-1-2' && (index === 0 || index === 5)))) {
                return 'tile-big'
            } else if (this.props.className.tile === 'gallery') {
                return 'tile-gallery'
            } else return 'tile-sm'
        };
        tiles = tiles.map((i, index) => {
            return (
                <Tile
                    className={tileSize(index)}
                    tileName={i}
                    imgUrl={tileSize(index) === 'tile-gallery' ? this.props.imgUrls[index] : null}
                />
            )
        });
        return (
            <div className={this.props.className.container}>
                <h2>{this.props.title}</h2>
                <div className='flexbox-wrapper-800'>
                    {tiles}
                </div>
            </div>
        );
    }
}

class Frontpage extends React.Component {
    render() {
        return (
            <div>
                <HeaderCover />
                <Cover />
                <div className={'color1'}>
                    <ProjectList
                        className={{'container': 'project-container', 'tile': '1-2-1-2-1-1'}}
                        list={[
                            'machine learning',
                            'empirical international trade',
                            'north american economic history',
                            'stochastic processes',
                            'applied macroeconomics',
                            'econometric theory'
                        ]}
                        title={"Academic Projects"} />
                    <ProjectList
                        className={{'container': 'project-container', 'tile': '2-1-1-1-1-2'}}
                        list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                        title={"Web App Projects"} />
                </div>
                <div className={'color2'}>
                    <ProjectList
                        className={{'container': 'project-container', 'tile': 'gallery'}}
                        list={['Toronto', 'Canada', 'Banff', 'Hometown', 'YorkU', 'Astro']}
                        imgUrls={[
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/toronto.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/canada.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/banff.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/hometown.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/yorku.png',
                            'https://s3.us-east-2.amazonaws.com/xiaoxihome/galleryphoto/preview/astro.png'
                        ]}
                        title={"Photography"} />
                </div>
                <Footer />
            </div>
        )
    }
}

export {Frontpage};


