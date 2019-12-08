import * as React from 'react';
import { Menu, Icon } from 'antd';
import { IUserStore } from '../../stores/UserStore/UserStore';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ClickParam } from 'antd/lib/menu';
import toastr from 'toastr'
import './Navbar.css';

interface NavbarProps {
    userStore?: IUserStore;
}

interface NavbarState {}

@inject('userStore')
@observer
class Navbar extends React.Component<NavbarProps & RouteComponentProps, NavbarState> {
    public componentDidMount(): void {
        if (this.props.userStore.isUserAuthenticated) {
            this.props.userStore.setIsUserAuthenticated(this.props.userStore.isUserAuthenticated);
        }
    }

    public render(): JSX.Element {
        return (
            <Menu mode="horizontal" onClick={this.handleMenuClick}>
                <Menu.Item key="home">
                    <Icon type="home" />
                    Home
                </Menu.Item>
                <Menu.Item className="n-nav-float-right" key="register" hidden={this.props.userStore.isLoggedIn}>
                    <Icon type="user-add" />
                    Register
                </Menu.Item>
                <Menu.Item className="n-nav-float-right" key="login" hidden={this.props.userStore.isLoggedIn}>
                    <Icon type="login" />
                    Login
                </Menu.Item>
                <Menu.Item key="create-ad" hidden={!this.props.userStore.isLoggedIn}>
                    <Icon type="car" />
                    Create Ad
                </Menu.Item>
                <Menu.Item key="favorites" hidden={!this.props.userStore.isLoggedIn}>
                    <Icon type="heart" />
                    Favorites
                </Menu.Item>
                <Menu.Item className="n-nav-float-right" key="logout" hidden={!this.props.userStore.isLoggedIn}>
                    <Icon type="logout" />
                    Logout
                </Menu.Item>
                <Menu.Item className="n-nav-float-right" key="my-ads" hidden={!this.props.userStore.isLoggedIn}>
                    <Icon type="car" />
                    My Ads
                </Menu.Item>
            </Menu>
        );
    }

    private handleMenuClick = (e: ClickParam) => {
        console.log(e);
        if (e && e.key === 'logout') {
            this.logout();
        } else if (e && e.key === 'home') {
            this.props.history.push('/');
        } else {
            this.props.history.push('/' + e.key);
        }
    };

    private logout(): void {
        let isLoggedOut = this.props.userStore.logout();

        if(isLoggedOut) {
            setTimeout(() => {
                toastr.success("Successfully logged out")
            }, 300);
        }

        this.props.history.push('/');
    }
}

export default withRouter(Navbar);
