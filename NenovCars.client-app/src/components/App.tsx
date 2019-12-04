import React from 'react';
import './App.css';
import { Layout, Button, Row, Col } from 'antd';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from './User/Login/Login';
import Register from './User/Register/Register';
import AddCar from './CarAd/CarAd';
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import { IUserStore } from '../stores/UserStore/UserStore';
import { inject, observer } from 'mobx-react';

interface AppProps {
	userStore?: IUserStore;
}
interface AppState {
	isUserAuthenticated: boolean;
}

@inject('userStore')
@observer
export default class App extends React.Component<AppProps, AppState> {
	public state: AppState = {
		isUserAuthenticated: this.props.userStore.isUserAuthenticated
	};

	public render() {
		return (
			<div className="root">
				<Layout>
					<Navbar isLoggedIn={this.props.userStore.isUserAuthenticated} />
					<Switch>
						<Route path='/home' component={Home} />
						<Route path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<Route path='/addCar' component={AddCar} />
					</Switch>
				</Layout>
			</div>
		);
	}
}
