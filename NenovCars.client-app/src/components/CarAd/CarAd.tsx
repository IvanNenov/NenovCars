import React from 'react'
import { Form, Input, Button } from 'antd';
import CarService from '../../services/Car/CarService';
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Auth from '../../helpers/Auth/Auth';

export interface ICarAdInput {
    carBrand: string;
    imageUrl: string;
    carModel: string;
    hp: string;
    fuel: string;
}

interface CarAddProps {
    carBrand: string;
    carImage: string;
    carModel: string;
    hp: string;
    fuel: string;
}

interface CarAddState {
    carBrand: string;
    carImage: string;
    carModel: string;
    hp: string;
    fuel: string;
}

class CarAd extends React.Component<CarAddProps & RouteComponentProps, CarAddState> {
    public state: CarAddState = {
        carBrand: '',
        carImage: '',
        carModel: '',
        hp: '',
        fuel: ''
    }

    public componentDidMount(): void {
        if (Auth.isUserAuthenticated() === false) {
            this.props.history.push('/');
        }
    }

    public onFuelChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            fuel: event.currentTarget.value
        })
    }

    public onHpChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            hp: event.currentTarget.value
        })
    }

    private carModelInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            carModel: event.currentTarget.value
        });
    }

    private carBrandInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            carBrand: event.currentTarget.value
        });
    }

    private onImageChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            carImage: event.currentTarget.value
        });
    }

    private async handleSubmit(): Promise<void> {
        let carService = new CarService();
        if (this.state.hp !== '' && this.state.carImage !== '' && this.state.fuel !== '' && this.state.carModel !== '' && this.state.carBrand !== '') {
            let ad: ICarAdInput = {
                imageUrl: this.state.carImage,
                carBrand: this.state.carBrand,
                hp: this.state.hp,
                fuel: this.state.fuel,
                carModel: this.state.carModel
            };

            let isSuccessful = await carService.addCar(ad);

            if (isSuccessful) {
                this.props.history.push('/');
            }
        }
    }

    public render() {
        return (
            <Form className="login-form">
                <Form.Item>
                    <Input
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carBrandInputChange(event)}
                        placeholder="Car brand"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carModelInputChange(event)}
                        placeholder="Car model"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onHpChange(event)}
                        placeholder="Horse power"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onFuelChange(event)}
                        placeholder="Fuel"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onImageChange(event)}
                        placeholder="Image url"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                        onClick={async (event: React.MouseEvent<HTMLElement, MouseEvent>) => await this.handleSubmit()}
                        className="login-form-button">Add</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(CarAd);