import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import IUserRegister from '../interfaces/IUserRegister';
import { RouteComponentProps } from 'react-router-dom'
import { Col, Row } from 'antd';
import Auth from '../../../helpers/Auth/Auth';
import { IUserStore } from '../../../stores/UserStore/UserStore';
import { inject, observer } from 'mobx-react';

interface RegisterState {
    username: string;
    password: string;
    confirmPassword: string;
    email: string
}

interface RegisterProps {
    userStore?: IUserStore;

 }

 @inject('userStore')
 @observer
export default class Register extends React.Component<RegisterProps & RouteComponentProps, RegisterState> {
    public state: RegisterState = {
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
    }

    public componentDidMount(): void {
        if (Auth.isUserAuthenticated()) {
            this.props.history.push('/');
        }
    }

    private async handleSubmit(): Promise<void> {
        if (this.state.username !== '' && this.state.email !== '' && this.state.password === this.state.confirmPassword) {
            
            let userBody: IUserRegister = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            };

            let isRegisterSucceeded = this.props.userStore.register(userBody);

            if (isRegisterSucceeded) {
                this.props.history.push('/login');
            }
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
