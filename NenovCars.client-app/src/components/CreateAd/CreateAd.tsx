import React from 'react';
import { Form, Input, Button, Radio, Row, Col, Divider } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Auth from '../../helpers/Auth/Auth';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ICarAdInput } from './interfaces/ICarAdInput';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import TextArea from 'antd/lib/input/TextArea';
import toastr from 'toastr';

interface CreateAdProps {
    adStore?: IAdStore;
}

interface CreateAdState {
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

@inject('adStore')
@observer
class CreateAd extends React.Component<CreateAdProps & RouteComponentProps, CreateAdState> {
    public state: CreateAdState = {
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

    private onDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
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

            let isSuccessful = await this.props.adStore.createAd(ad);

            if (isSuccessful) {
                setTimeout(() => {
                    toastr.success('Successfully created ad!');
                }, 300);

                this.props.history.push('/');
            } else {
                setTimeout(() => {
                    toastr.error('Please, fill all fields with correct data!');
                }, 300);
            }
        } else {
            setTimeout(() => {
                toastr.error('Please, fill all fields!');
            }, 300);
        }
    }

    public render() {
        return (
            <>
                <Row type="flex" justify="space-around">
                    <Divider>Create Ad</Divider>
                    <Col span={5}>
                        <Form>
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
                                <Input type='number'
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onHpChange(event)}
                                    placeholder="Horse power"
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={5}>
                        <Form>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onAdTitleChange(event)}
                                    placeholder="Title"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input type='number'
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
                        </Form>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Input type='number'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onPriceChange(event)}
                                placeholder="Price"
                            />
                        </Form.Item>
                        <Form.Item>
                            <TextArea
                                style={{ resize: 'none' }}
                                rows={4}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.onDescriptionChange(event)}
                                placeholder="Description"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Input type='number'
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onKmChange(event)}
                                placeholder="Mileage"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onImageChange(event)}
                                placeholder="Image url"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Row>
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
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Form className="login-form">
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
                </Row>
            </>
        );
    }
}

export default withRouter(CreateAd);
