import * as React from 'react';
import { Layout, Button, Menu } from 'antd';
import { IUserStore } from '../../stores/UserStore/UserStore';
import { inject, observer } from 'mobx-react';

const { Header } = Layout;

interface NavbarProps {
    userStore?: IUserStore;
    isLoggedIn: boolean;
}

interface NavbarState {
    isLoggedIn: boolean; 
}

@inject('userStore')
@observer
export default class Navbar extends React.Component<NavbarProps, NavbarState> {
    public state: NavbarState = {
        isLoggedIn: this.props.userStore.isUserAuthenticated
    }

    public render(): JSX.Element {
        return (
            <Header>
                {!this.props.userStore.isUserAuthenticated ? (
                    <>
                        <Button type="primary" href="/login">Login</Button>
                        <Button type="primary" href="/register">Register</Button>
                    </>
                ) : <Button type="primary" href="/logout">Logout</Button>}
                <Button type="primary" href="/addCar">Add Car</Button>
            </Header>
        );
    }
}