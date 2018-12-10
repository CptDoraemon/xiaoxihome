import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MouseIcon from './mouseIcon';
import * as serviceWorker from './serviceWorker';









class Header extends React.Component {
    render() {
        let listItems = [...this.props.list];
        listItems = listItems.map((i) => {
            return (
                <li
                    key={i}
                    onClick={() => this.props.onClick(i)}
                >{i}</li>
            )
        });
        return (
            <div className={this.props.className}>
                <ul>
                    {listItems}
                </ul>
            </div>
        )
    }
}

class Cover extends React.Component {
    render() {
        return (
            <div className='cover'>
                <h1 className='cover-intro'>Welcome To Xiaoxi's Home!</h1>
                <MouseIcon className='mouse-icon'/>
            </div>
        )
    }
}

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // tile for gallery
        if (this.props.imgUrl) {
            return (
                <div
                    className={this.props.className}
                    style={{backgroundImage: 'url("' + this.props.imgUrl + '")'}}>
                    <h5>{this.props.tileName}</h5>
                </div>
            )
        }
        // tile for projects
        return (
            <div
                className={this.props.className}
                onClick={() => this.props.onClick(this.props.tileName) }>
                <h3>{this.props.tileName}</h3>
            </div>
        )
    }
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
        }
        tiles = tiles.map((i, index) => {
            return (
                <Tile
                    className={tileSize(index)}
                    tileName={i}
                    imgUrl={tileSize(index) === 'tile-gallery' ? this.props.imgUrls[index] : null}
                    onClick={this.props.onClick}
                />
            )
        })
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

class Footer extends React.Component {
    render() {
        let listItems = [...this.props.list];
        listItems = listItems.map((i) => {
            return (
                <li key={i}>{i}</li>
            )
        });
        return (
            <div className={this.props.className}>
                <ul>
                    {listItems}
                </ul>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018</p>
                </div>
            </div>
        )
    }
}

class Index extends React.Component {
    render() {
        return (
            <div>
                <Header
                    list={['home', 'work', 'about', 'contact']}
                    className='header-cover'
                    onClick={this.props.onClick}
                />
                <Cover />
                <div className={'color1'}>
                    <ProjectList
                        className={{'container': 'project-container', 'tile': '1-2-1-2-1-1'}}
                        list={[
                            'Machine Learning',
                            'Empirical International Trade',
                            'North American Economic History',
                            'Stochastic Process',
                            'Applied Macroeconomics',
                            'Econometric Theory'
                        ]}
                        title={"Academic Projects"}
                        onClick={this.props.onClick} />
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
                <Footer
                    list={['home', 'work', 'about', 'contact']}
                    className='footer' />
            </div>
        )
    }
}

class ProjectPage extends React.Component {
    render() {
        return (
            <div>
                <Header
                    list={['home', 'work', 'about', 'contact']}
                    className='header-cover'
                    onClick={this.props.onClick}
                />
                <div className={'color1'}>
                    <ProjectList
                        className={{'container': 'project-container', 'tile': '1-2-1-2-1-1'}}
                        list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                        title={"Academic Projects"}
                         />
                    <ProjectList
                        className={{'container': 'project-container', 'tile': '2-1-1-1-1-2'}}
                        list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                        title={"Web App Projects"} />
                </div>
                <Footer
                    list={['home', 'work', 'about', 'contact']}
                    className='footer' />
            </div>
        )
    }
}


class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'index'
        }
    }

    handleClick(e) {
        const pageName = e.toLowerCase();
        this.setState({
            page: pageName
        })
        window.scrollTo(0, 0)
    }
    render() {
        if (this.state.page === 'index' || this.state.page === 'home' ) {
            return <Index onClick={(e) => this.handleClick(e)}/>
        }
        if (this.state.page === 'machine learning') {
            return <ProjectPage onClick={(e) => this.handleClick(e)}/>
        }
    }
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
