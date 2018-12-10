import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MouseIcon from './mouseIcon';
import * as serviceWorker from './serviceWorker';

import academicProjects from './academicProject';






function NavItem(props) {
    return (
        <li onClick={() => props.onClick(props.clickTo)}> {props.value} </li>
    )
}


class Header extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                <ul>
                    <NavItem clickTo={'home'} value={'home'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'work'} value={'work'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'about'} value={'about'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'contact'} value={'contact'} onClick={this.props.onClick}/>
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
        return (
            <div className={this.props.className}>
                <ul>
                    <NavItem clickTo={'home'} value={'home'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'work'} value={'work'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'about'} value={'about'} onClick={this.props.onClick}/>
                    <NavItem clickTo={'contact'} value={'contact'} onClick={this.props.onClick}/>
                </ul>
                <div className='copyright'>
                    <p>&copy; Xiaoxi 2018</p>
                </div>
            </div>
        )
    }
}

function AcademicProjectTemplate(props) {
    const boxes = props.projectArray.map((i, index) => {
        return (
            <AcademicProjectBox index={index} description={i.description} link={i.link}/>
        )
    })
    let title = props.title;
    title = (title).match(/[A-Za-z]+/ig);
    title = title.join(' ');
    return (
        <div className='academic-project-template-wrapper'>
            <h1> {title} </h1>
            { boxes }
        </div>
    )
}

function AcademicProjectBox(props) {
    return (
        <a href={props.link} target="_blank" rel='noopener noreferrer'>
            <div className='AcademicProjectBox'>
                <h2>project {props.index + 1}</h2>
                <div dangerouslySetInnerHTML={{__html: props.description }}></div>
            </div>
        </a>
        )
}

class Index extends React.Component {
    render() {
        return (
            <div>
                <Header
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
                            'Stochastic Processes',
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
                    onClick={this.props.onClick}
                    className='footer' />
            </div>
        )
    }
}

class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.project = this.props.project;
        this.projectArray = this.props.projectArray;
        this.state = {
            headerPosition: 'relative',
            headerTop: 0,
            placeholderClassName: 'header-fixed-placeholder',
        };
        this.handleScroll = this.handleScroll.bind(this);
    };
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll() {
        const scrolled = window.pageYOffset;
        if (scrolled >= 50 && this.state.headerPosition !== 'fixed') {
            this.setState({
                headerPosition: 'fixed',
                headerTop: '-50px',
                placeholderClassName: 'header-fixed-placeholder-scrolled'
            })
        }
        if (scrolled < 50 && this.state.headerPosition === 'fixed') {
            this.setState({
                headerPosition: 'relative',
                headerTop: 0,
                placeholderClassName: 'header-fixed-placeholder'
            })
        }

    }
    render() {
        return (
            <div>
                <div className='header-fixed' style={{position: this.state.headerPosition, top: this.state.headerTop}}>
                    <h1>Academic Project</h1>
                    <Header
                        list={['home', 'work', 'about', 'contact']}
                        onClick={this.props.onClick}
                    />
                </div>
                <div className={this.state.placeholderClassName}> </div>
                <div className={'color1'}>
                    <AcademicProjectTemplate title={this.project} projectArray={this.projectArray}/>
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
            page: '/home'
        }
    }

    handleClick(e) {
            let pageName = e.toLowerCase().split(' ').join('-');
            pageName = ('/').concat(pageName);
            this.setState({
                page: pageName
            })
            window.scrollTo(0, 0)
    }
    render() {
        if (this.state.page === '/home') {
            return <Index onClick={(e) => this.handleClick(e)}/>
        }
        if (this.state.page === '/econometric-theory') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[0].projects}/>
        }
        if (this.state.page === '/empirical-international-trade') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[1].projects}/>
        }
        if (this.state.page === '/north-american-economic-history') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[2].projects}/>
        }
        if (this.state.page === '/stochastic-processes') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[3].projects}/>
        }
        if (this.state.page === '/applied-macroeconomics') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[4].projects}/>
        }
        if (this.state.page === '/machine-learning') {
            return <ProjectPage onClick={(e) => this.handleClick(e)} project={this.state.page} projectArray={academicProjects[5].projects}/>
        }
    }
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
