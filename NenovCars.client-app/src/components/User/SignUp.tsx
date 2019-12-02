import React from 'react';
import { Tabs, Col, Row } from 'antd';
import Login from './Login/Login';
import Register from './Register/Register';
import CarAd from '../CarAd/CarAd';

const { TabPane } = Tabs;

export default class User extends React.Component {
	public render() {

		return (
			<Row type="flex" justify="center">
				<Col>
					<Tabs defaultActiveKey="1">
						<TabPane tab="Login" key="1">
							<Login />
						</TabPane>
						<TabPane tab="Register" key="2">
							<Register />
						</TabPane>
					</Tabs>
				</Col>
			</Row>
		);
	}
}
