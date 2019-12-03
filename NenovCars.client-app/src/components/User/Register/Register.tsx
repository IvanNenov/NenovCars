import * as React from 'react';
import AuthService from '../../../services/Auth/AuthService';
import { Form, Icon, Input, Button } from 'antd';
import IUserRegister from '../interfaces/IUserRegister';
import { Col, Row } from 'antd';

interface RegisterState {
    username: string;
    password: string;
    confirmPassword: string;
    email: string
}

interface RegisterProps { }

export default class Register extends React.Component<RegisterProps, RegisterState> {
    public state: RegisterState = {
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    }

    private async handleSubmit(): Promise<void> {
        if (this.state.username !== '' && this.state.email !== '' && this.state.password === this.state.confirmPassword) {
            let authService = new AuthService();
            let userBody: IUserRegister = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            };

            await authService.register(userBody);
        }
    }

    private nameInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            username: event.currentTarget.value
        });
    }

    private emailInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            email: event.currentTarget.value
        });
    }

    private passwordInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            password: event.currentTarget.value
        });
    }

    private confirmPasswordnputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            confirmPassword: event.currentTarget.value
        });
    }

    public render(): JSX.Element {
        return (
            <Row type="flex" justify="center">
                <Col>
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.nameInputChange(event)}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.emailInputChange(event)}
                                prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email"
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
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.confirmPasswordnputChange(event)}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={async (event: React.MouseEvent<HTMLElement, MouseEvent>) => await this.handleSubmit()} className="login-form-button">Register</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}
