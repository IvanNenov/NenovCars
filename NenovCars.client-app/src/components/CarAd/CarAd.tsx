import React from 'react';
import { Form, Input, Button, Radio, Row, Col } from 'antd';
import CarService from '../../services/Car/CarService';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Auth from '../../helpers/Auth/Auth';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ICarAdInput } from './interfaces/ICarAdInput';

interface CarAddProps {}

interface CarAddState {
    carBrand: string;
    carImage: string;
    carModel: string;
    hp: string;
    fuel: string;
    adTitle: string;
    yearOfProduction: string;
    color: string;
    transmission: string;
    vehicleType: string;
    price: string;
    kilometre: string;
    description: string;
}

class CarAd extends React.Component<CarAddProps & RouteComponentProps, CarAddState> {
    public state: CarAddState = {
        carBrand: '',
        carImage: '',
        carModel: '',
        hp: '',
        fuel: 'Diesel',
        adTitle: '',
        yearOfProduction: '',
        color: '',
        transmission: 'Automatic',
        vehicleType: 'Car',
        price: '',
        kilometre: '',
        description: ''
    };

    public componentDidMount(): void {
        if (Auth.isUserAuthenticated() === false) {
            this.props.history.push('/');
        }
    }

    public onHpChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            hp: event.currentTarget.value
        });
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

    private onAdTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            adTitle: event.currentTarget.value
        });
    }
    private onColorChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            color: event.currentTarget.value
        });
    }
    private onPriceChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            price: event.currentTarget.value
        });
    }

    private onKmChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            kilometre: event.currentTarget.value
        });
    }

    private onDescriptionChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            description: event.currentTarget.value
        });
    }

    private onYearOfProductionChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            yearOfProduction: event.currentTarget.value
        });
    }

    private async handleSubmit(): Promise<void> {
        let carService = new CarService();
        if (
            this.state.hp !== '' &&
            this.state.carImage !== '' &&
            this.state.fuel !== '' &&
            this.state.carModel !== '' &&
            this.state.carBrand !== '' &&
            this.state.adTitle !== '' &&
            this.state.yearOfProduction !== '' &&
            this.state.color !== '' &&
            this.state.transmission !== '' &&
            this.state.vehicleType !== '' &&
            this.state.price !== '' &&
            this.state.kilometre !== '' &&
            this.state.description !== ''
        ) {
            let ad: ICarAdInput = {
                imageUrl: this.state.carImage,
                carBrand: this.state.carBrand,
                hp: this.state.hp,
                fuel: this.state.fuel,
                carModel: this.state.carModel,
                adTitle: this.state.adTitle,
                yearOfProduction: this.state.yearOfProduction,
                color: this.state.color,
                transmission: this.state.transmission,
                vehicleType: this.state.vehicleType,
                price: this.state.price,
                kilometre: this.state.kilometre,
                description: this.state.description
            };

            let isSuccessful = await carService.addCar(ad);

            if (isSuccessful) {
                this.props.history.push('/');
            }
        }
    }
    //fuel
    //transmission
    // vehicleType: '',

    public render() {
        return (
            <Row type="flex" justify="center">
                <Col>
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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onAdTitleChange(event)}
                                placeholder="Title"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onYearOfProductionChange(event)}
                                placeholder="Year"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onColorChange(event)}
                                placeholder="Color"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onPriceChange(event)}
                                placeholder="Price"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onKmChange(event)}
                                placeholder="Mileage"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onDescriptionChange(event)}
                                placeholder="Description"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onImageChange(event)}
                                placeholder="Image url"
                            />
                        </Form.Item>
                        <Row>
                            <p>Fuel</p>
                            <Radio.Group
                                name="Fuel"
                                defaultValue={'Diesel'}
                                onChange={(event: RadioChangeEvent) => this.setState({ fuel: event.target.value })}
                            >
                                <Radio value={'Diesel'}>Diesel</Radio>
                                <Radio value={'Gasoline'}>Gasoline</Radio>
                                <Radio value={'Gas'}>Gas</Radio>
                            </Radio.Group>
                        </Row>
                        <Row>
                            <p>Transmission</p>
                            <Radio.Group
                                name="Transmission"
                                defaultValue={'Automatic'}
                                onChange={(event: RadioChangeEvent) =>
                                    this.setState({
                                        transmission: event.target.value
                                    })
                                }
                            >
                                <Radio value={'Automatic'}>Automatic</Radio>
                                <Radio value={'Manual'}>Manual</Radio>
                            </Radio.Group>
                        </Row>
                        <Row>
                            <p>Vehicle</p>
                            <Radio.Group
                                name="Vehicle"
                                defaultValue={'Car'}
                                onChange={(event: RadioChangeEvent) =>
                                    this.setState({
                                        vehicleType: event.target.value
                                    })
                                }
                            >
                                <Radio value={'Car'}>Car</Radio>
                                <Radio value={'Bus'}>Bus</Radio>
                                <Radio value={'SUV'}>SUV</Radio>
                                <Radio value={'Motorcycle'}>Motorcycle</Radio>
                            </Radio.Group>
                        </Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={async (event: React.MouseEvent<HTMLElement, MouseEvent>) => await this.handleSubmit()}
                                className="login-form-button"
                            >
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default withRouter(CarAd);
