import * as React from 'react';
import { Layout, Button, Menu } from 'antd';
import { IUserStore } from '../../stores/UserStore/UserStore';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom'

const { Header } = Layout;

interface NavbarProps {
    userStore?: IUserStore;
}

interface NavbarState {
    isLoggedIn: boolean;
}

@inject('userStore')
@observer
class Navbar extends React.Component<NavbarProps & RouteComponentProps, NavbarState> {
    public state: NavbarState = {
        isLoggedIn: this.props.userStore.isUserAuthenticated
    }

    public componentDidMount(): void {
        if (this.props.userStore.isUserAuthenticated) {
            this.props.userStore.setIsUserAuthenticated(this.props.userStore.isUserAuthenticated);
        }
    }

    private logout(): void {
        this.props.userStore.logout();

        this.props.history.push('/');
    }

    public render(): JSX.Element {
        return (
            <Header>
                {!this.props.userStore.isLoggedIn ? (
                    <>
                        <Button type="primary" href="/login">Login</Button>
                        <Button type="primary" href="/register">Register</Button>
                    </>
                ) : <>
                        <Button type="primary" onClick={(): void => this.logout()}>Logout</Button>
                        <Button type="primary" href="/addCar">Add Car</Button>
                        <Button type="primary" href="/favoriteCars">Favorite Cars</Button>
                    </>}

            </Header>
        );
    }
}

export default withRouter(Navbar)