import React from 'react';
import { Form, Input, Button, Radio, Row, Col, Divider, Upload, Icon } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Auth from '../../helpers/Auth/Auth';
import { RadioChangeEvent } from 'antd/lib/radio';
import { ICarAdInput } from '../CreateAd/interfaces/ICarAdInput';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import TextArea from 'antd/lib/input/TextArea';
import toastr from 'toastr';
import { ICarAd } from '../AdsContainer/interfaces/ICarAd';

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
class EditAd extends React.Component<CreateAdProps & RouteComponentProps, CreateAdState> {
    public state: CreateAdState = {
        carBrand: this.props.adStore.adToEdit && this.props.adStore.adToEdit.brand ? this.props.adStore.adToEdit.brand : '',
        carImage: this.props.adStore.adToEdit.imageUrl ? this.props.adStore.adToEdit.imageUrl : '',
        carModel: this.props.adStore.adToEdit.model ? this.props.adStore.adToEdit.model : '',
        hp: this.props.adStore.adToEdit.hp ? this.props.adStore.adToEdit.hp : '',
        fuel: this.props.adStore.adToEdit.fuel ? this.props.adStore.adToEdit.fuel : 'Diesel',
        adTitle: this.props.adStore.adToEdit.adTitle ? this.props.adStore.adToEdit.adTitle : '',
        yearOfProduction: this.props.adStore.adToEdit.yearOfProduction ? this.props.adStore.adToEdit.yearOfProduction : '',
        color: this.props.adStore.adToEdit.color ? this.props.adStore.adToEdit.color : '',
        transmission: this.props.adStore.adToEdit.transmission ? this.props.adStore.adToEdit.transmission : 'Automatic',
        vehicleType: this.props.adStore.adToEdit.vehicleType ? this.props.adStore.adToEdit.vehicleType : 'Car',
        price: this.props.adStore.adToEdit.price ? this.props.adStore.adToEdit.price : '',
        kilometre: this.props.adStore.adToEdit.kilometre ? this.props.adStore.adToEdit.kilometre : '',
        description: this.props.adStore.adToEdit.description ? this.props.adStore.adToEdit.description : ''
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
            let ad: ICarAd = {
                id: this.props.adStore.adToEdit.id,
                imageUrl: this.state.carImage,
                brand: this.state.carBrand,
                hp: this.state.hp,
                fuel: this.state.fuel,
                model: this.state.carModel,
                adTitle: this.state.adTitle,
                yearOfProduction: this.state.yearOfProduction,
                color: this.state.color,
                transmission: this.state.transmission,
                vehicleType: this.state.vehicleType,
                price: this.state.price,
                kilometre: this.state.kilometre,
                description: this.state.description
            };
            let isSuccessful = await this.props.adStore.editAd(ad);

            if (isSuccessful) {
                setTimeout(() => {
                    toastr.success('Successfully edited ad!');
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
                    <Divider>Edit Ad</Divider>
                    <Col span={5}>
                        <Form>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carBrandInputChange(event)}
                                    placeholder="Car brand"
                                    defaultValue={this.props.adStore.adToEdit.brand}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.carModelInputChange(event)}
                                    placeholder="Car model"
                                    defaultValue={this.props.adStore.adToEdit.model}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onHpChange(event)}
                                    placeholder="Horse power"
                                    defaultValue={this.props.adStore.adToEdit.hp}
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
                                    defaultValue={this.props.adStore.adToEdit.adTitle}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onYearOfProductionChange(event)}
                                    placeholder="Year"
                                    defaultValue={this.props.adStore.adToEdit.yearOfProduction}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onColorChange(event)}
                                    placeholder="Color"
                                    defaultValue={this.props.adStore.adToEdit.color}
                                />
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onPriceChange(event)}
                                placeholder="Price"
                                defaultValue={this.props.adStore.adToEdit.price}
                            />
                        </Form.Item>
                        <Form.Item>
                            <TextArea
                                style={{ resize: 'none' }}
                                rows={4}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => this.onDescriptionChange(event)}
                                placeholder="Description"
                                defaultValue={this.props.adStore.adToEdit.description}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onKmChange(event)}
                                placeholder="Mileage"
                                defaultValue={this.props.adStore.adToEdit.kilometre}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onImageChange(event)}
                                placeholder="Image url"
                                defaultValue={this.props.adStore.adToEdit.imageUrl}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Radio.Group
                                name="Fuel"
                                defaultValue={this.props.adStore.adToEdit.fuel}
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
                                defaultValue={this.props.adStore.adToEdit.transmission}
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
                                defaultValue={this.props.adStore.adToEdit.vehicleType}
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
                                Edit
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </>
        );
    }
}

export default withRouter(EditAd);
