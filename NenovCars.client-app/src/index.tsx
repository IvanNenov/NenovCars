import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import '../node_modules/antd/dist/antd.css';
import { Provider } from 'mobx-react';
import { stores } from './stores/StoresContainer';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'));
