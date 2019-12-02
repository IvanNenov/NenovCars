import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import SignUp from './components/User/SignUp';
import '../node_modules/antd/dist/antd.css';
import CarAd from './components/CarAd/CarAd';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={SignUp} />
            <Route path="/addCar" component={CarAd} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
