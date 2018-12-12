import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import { AcademicProject } from './app/academicProjects';
import { Frontpage } from './app/frontpage';
import { Missing404 } from './component/missing404';

const academicProjectArray = [
    'Machine Learning',
    'Empirical International Trade',
    'North American Economic History',
    'Stochastic Processes',
    'Applied Macroeconomics',
    'Econometric Theory'
];
const webAppProjectArray = [
    'Reddit-like Website',
    'FireworkJS',
    'SnakeyJS',
    'PHP/MySQL Login System',
    'DOM Practice',
    'RaycasterJS'
    ];
const galleryArray = [
    'Toronto',
    'Canada',
    'Banff',
    'Hometown',
    'YorkU',
    'Astro'
];

const academicProjectLinkArray = [];
const webAppProjectLinkArray = [];
const galleryLinkArray = [];
function convertToLink(array, linkArray) {
    array.map((i) => {
        let item = i.toLowerCase().split(' ').join('-').replace('/', '');
        item = ('/').concat(item);
        linkArray.push(item);
    });
}
convertToLink(academicProjectArray, academicProjectLinkArray);
convertToLink(webAppProjectArray, webAppProjectLinkArray);
convertToLink(galleryArray, galleryLinkArray);
const listAndLink = {
    academicProjectArray: academicProjectArray,
    webAppProjectArray: webAppProjectArray,
    galleryArray: galleryArray,
    academicProjectLinkArray: academicProjectLinkArray,
    webAppProjectLinkArray: webAppProjectLinkArray,
    galleryLinkArray: galleryLinkArray
}




class App extends React.Component {
    render() {
        return (
            <Router>
                <ScrollToTop>
                <Switch>
                    <Route path="/" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                    <Route path="/home" exact render={(props) => <Frontpage {...props} listAndLink={listAndLink} />} />
                    <Route path="/work" exact key='work' render={(props) => <Frontpage {...props} toWorkRef={true} listAndLink={listAndLink} />} />
                    <Route path="/econometric-theory" render={(props) => <AcademicProject {...props} name='econometric theory' listAndLink={listAndLink}/>} />
                    <Route path="/empirical-international-trade" render={(props) => <AcademicProject {...props} name='empirical international trade' listAndLink={listAndLink}/>} />
                    <Route path="/north-american-economic-history" render={(props) => <AcademicProject {...props} name='north american economic history' listAndLink={listAndLink}/>} />
                    <Route path="/stochastic-processes" render={(props) => <AcademicProject {...props} name='stochastic processes' listAndLink={listAndLink}/>} />
                    <Route path="/applied-macroeconomics" render={(props) => <AcademicProject {...props} name='applied macroeconomics' listAndLink={listAndLink}/>} />
                    <Route path="/machine-learning" render={(props) => <AcademicProject {...props} name='machine learning' listAndLink={listAndLink}/>} />
                    <Route component={ Missing404 } />
                </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
