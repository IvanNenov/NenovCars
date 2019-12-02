import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import AuthService from '../../../services/Auth/AuthService';
import IUserLogin from '../interfaces/IUserLogin';

interface LoginProps {}

interface LoginState {
    username: string;
    password: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {
    public state: LoginState = {
        username: '',
        password: ''
    };

    private async handleSubmit(): Promise<void> {
        let authService = new AuthService();
        if (this.state.username !== '' && this.state.password !== '') {

            let userBody: IUserLogin = {
                username: this.state.username,
                password: this.state.password
            }

            await authService.login(userBody);
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
        return (
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
                    <Button type="primary" onClick={async (event: React.MouseEvent<HTMLElement, MouseEvent>) => await this.handleSubmit()} className="login-form-button">Log in</Button>
                </Form.Item>
            </Form>
        );
    }
}