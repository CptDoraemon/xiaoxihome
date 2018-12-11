import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import ScrollToTop from './component/scrolltotop'
import { AcademicProject } from './app/academicProjects';
import { Frontpage } from './app/frontpage';
import { Missing404 } from './component/missing404';



class App extends React.Component {
    render() {
        return (
            <Router>
                <ScrollToTop>
                <Switch>
                    <Route path="/" exact component={Frontpage} />
                    <Route path="/home" component={Frontpage} />
                    <Route path="/academic-project/econometric-theory" render={(props) => <AcademicProject {...props} name='econometric theory'/>} />
                    <Route path="/academic-project/empirical-international-trade" render={(props) => <AcademicProject {...props} name='empirical international trade'/>} />
                    <Route path="/academic-project/north-american-economic-history" render={(props) => <AcademicProject {...props} name='north american economic history'/>} />
                    <Route path="/academic-project/stochastic-processes" render={(props) => <AcademicProject {...props} name='stochastic processes'/>} />
                    <Route path="/academic-project/applied-macroeconomics" render={(props) => <AcademicProject {...props} name='applied macroeconomics'/>} />
                    <Route path="/academic-project/machine-learning" render={(props) => <AcademicProject {...props} name='machine learning'/>} />
                    <Route component={ Missing404 } />
                </Switch>
                </ScrollToTop>
            </Router>
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
