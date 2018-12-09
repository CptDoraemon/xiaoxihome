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
                <li key={i}>{i}</li>
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
    render() {
        return (
            <div className={this.props.className}>
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
            } else return 'tile-sm'
        }
        tiles = tiles.map((i, index) => {
            return (
                <Tile
                    className={tileSize(index)}
                    tileName={i}
                />
            )
        })
        return (
            <div className={this.props.className.container}>
                <h2>{this.props.title}</h2>
                <div className='flexbox-wrapper'>
                    {tiles}
                </div>
            </div>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Header
                    list={['home', 'work', 'about', 'contact']}
                    className='header-cover'
                />
                <Cover />
                <div className={'color1'}>
                <ProjectList
                    className={{'container': 'project-container', 'tile': '1-2-1-2-1-1'}}
                    list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                    title={"Academic Projects"} />
                <ProjectList
                    className={{'container': 'project-container', 'tile': '2-1-1-1-1-2'}}
                    list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                    title={"Web App Projects"} />
                <ProjectList
                    className={{'container': 'project-container', 'tile': '1-2-1-2-1-1'}}
                    list={['one one one', 'twotwotwo', 'three three', 'four four', 'five five', 'six six']}
                    title={"Academic Projects"} />
            </div>
                <Footer />
            </div>
        )
    }
}




ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
