import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { Row, Col, Card, Divider } from 'antd';
import './AdDetails.css';

interface AdDetailsProps {
    adStore?: IAdStore;
}

@inject('adStore')
@observer
export default class AdDetails extends React.Component<AdDetailsProps> {
    public render(): JSX.Element {
        return (
            <>
                {this.props.adStore.adDetails && (
                    <Row type="flex" justify="center">
                        <Divider>Ad Details</Divider>
                        <Col>
                            <Card className="n-ad-card">
                                <Row type="flex" justify="space-around">
                                    <Col>
                                        <img className="n-ad-details-image" src={this.props.adStore.adDetails.imageUrl} />
                                    </Col>
                                    <Col className="n-ad-details">
                                        <p className="n-ad-title">{this.props.adStore.adDetails.adTitle}</p>
                                        <p className="n-ad-price-container">
                                            <span className="n-ad-price-title">Price: </span>
                                            <span className="n-ad-price">
                                                {parseInt(this.props.adStore.adDetails.price).toLocaleString()}€
                                            </span>
                                        </p>
                                        <div className="n-ad-details-container">
                                            <span className="n-ad-details-title">Year of production: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.yearOfProduction}</span>
                                            <br></br>
                                            <span className="n-ad-details-title">Fuel: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.fuel}</span>
                                            <br></br>
                                            <span className="n-ad-details-title">Horse power: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.hp}</span>
                                            <br></br>
                                            <span className="n-ad-details-title">Transmission: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.transmission}</span>
                                            <br></br>
                                            <span className="n-ad-details-title">Vehicle type: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.vehicleType}</span>
                                            <br></br>
                                            <span className="n-ad-details-title">Mileage: </span>
                                            <span className="n-ad-details-info">
                                                {parseInt(this.props.adStore.adDetails.kilometre).toLocaleString()} Km
                                            </span>
                                            <br></br>
                                            <span className="n-ad-details-title">Color: </span>
                                            <span className="n-ad-details-info">{this.props.adStore.adDetails.color}</span>
                                            <br></br>
                                        </div>
                                    </Col>
                                </Row>
                                <Row type="flex">
                                    <Col>
                                        <div className="n-ad-description-container">
                                            <p className="n-ad-description-title">Description</p>
                                            <p className="n-ad-description">{this.props.adStore.adDetails.description}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )}
            </>
        );
    }
}
