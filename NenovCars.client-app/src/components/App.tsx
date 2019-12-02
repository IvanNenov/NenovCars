import React from 'react';
import './App.css';
import { Layout, Button, Row, Col } from 'antd';
import CarAd from './CarAd/CarAd';
import Myfooter from './Footer/Footer'

const { Header, Footer, Content } = Layout;

export default class App extends React.Component {
	public render() {
		let token = localStorage.getItem('token');

		return (
			<div className="App">
				<Layout>
					<Header>
						{!token && <Button type="primary" href="/signup">Sign Up</Button>}
						<Button type="primary" href="/addCar">Add Car</Button>
					</Header>
					<Content>
						<Row type="flex" justify="center">
							<Col>
								<CarAd />
							</Col>
						</Row>
					</Content>
					<Footer>
					<Myfooter/>
					</Footer>
				</Layout>
			</div>
		);
	}
}

// import { Layout, Menu, Breadcrumb } from 'antd';
// import React from 'react';
// const { Header, Content, Footer } = Layout;

// export default class App extends React.Component{

// public render(){
// 	return(<Layout>
// 		<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
// 		  <div className="logo" />
// 		  <Menu
// 			theme="dark"
// 			mode="horizontal"
// 			defaultSelectedKeys={['2']}
// 			style={{ lineHeight: '64px' }}
// 		  >
// 			<Menu.Item key="1">nav 1</Menu.Item>
// 			<Menu.Item key="2">nav 2</Menu.Item>
// 			<Menu.Item key="3">nav 3</Menu.Item>
// 		  </Menu>
// 		</Header>
// 		<Content style={{ padding: '0 50px', marginTop: 64 }}>
// 		  <Breadcrumb style={{ margin: '16px 0' }}>
// 			<Breadcrumb.Item>Home</Breadcrumb.Item>
// 			<Breadcrumb.Item>List</Breadcrumb.Item>
// 			<Breadcrumb.Item>App</Breadcrumb.Item>
// 		  </Breadcrumb>
// 		  <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
// 		</Content>
// 		<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
// 	  </Layout>)
// }
// }
