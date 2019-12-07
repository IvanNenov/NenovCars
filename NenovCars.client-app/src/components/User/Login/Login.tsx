import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import IUserLogin from '../interfaces/IUserLogin';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import { IUserStore } from '../../../stores/UserStore/UserStore';
import Auth from '../../../helpers/Auth/Auth';

interface LoginProps {
    userStore?: IUserStore;
}

interface LoginState {
    username: string;
    password: string;
}

@inject('userStore')
@observer
export default class Login extends React.Component<LoginProps & RouteComponentProps, LoginState> {
    public state: LoginState = {
        username: '',
        password: ''
    };

    public componentDidMount(): void {
        if (Auth.isUserAuthenticated()) {
            this.props.history.push('/');
        }
    }

    private async handleSubmit(): Promise<void> {
        if (this.state.username !== '' && this.state.password !== '') {
            let userBody: IUserLogin = {
                username: this.state.username,
                password: this.state.password
            };

            let isLogged = await this.props.userStore.login(userBody);

            if (isLogged) {
                this.props.history.push('/');
                this.props.userStore.setIsUserAuthenticated(true);
            }
        }
    }

    private usernameInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            username: event.currentTarget.value
        });
    }

    private passwordInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            password: event.currentTarget.value
        });
    }

    public render(): JSX.Element {
        console.log('LoginComponent render');
        return (
            <Row type="flex" justify="center">
                <Col>
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.usernameInputChange(event)}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.passwordInputChange(event)}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={async (event: React.MouseEvent<HTMLElement, MouseEvent>) => await this.handleSubmit()}
                                className="login-form-button"
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}
