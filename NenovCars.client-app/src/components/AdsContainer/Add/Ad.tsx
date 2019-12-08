import * as React from 'react';
import { ICarAd } from '../interfaces/ICarAd';
import { Card, Row, Col, Icon } from 'antd';
import { IAdStore } from '../../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import { IUiStore } from '../../../stores/UiStore/UiStore';
import { FavButton } from './FavButton/FavButton';
import './Ad.css';
import Auth from '../../../helpers/Auth/Auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import toastr from 'toastr';

interface AdProps {
    adStore?: IAdStore;
    uiStore?: IUiStore;
    ad: ICarAd;
}

interface AdState {
    mileage: string;
}

@inject('adStore')
@inject('uiStore')
@observer
class Ad extends React.Component<AdProps & RouteComponentProps, AdState> {
    public state: AdState = {
        mileage: this.props.ad.kilometre
    };

    private onDetailsClick = (): void => {
        if (this.props.ad) {
            this.props.adStore.setAdDetailsItem(this.props.ad);
            this.props.history.push('/ad-details');
        }
    };

    public render(): JSX.Element {
        return (
            <div>
                <Card className="n-ad-card">
                    <Row type="flex">
                        <Col className="n-image-col">
                            <img className="n-ad-image" src={this.props.ad.imageUrl} />
                        </Col>
                        <Col className="n-car-info n-car-margin-top">
                            <a onClick={this.onDetailsClick} className="n-car-title n-car-margin-top">
                                {this.props.ad.adTitle}
                            </a>
                            <p>
                                {this.props.ad.fuel}, {this.props.ad.transmission}, {parseInt(this.props.ad.kilometre).toLocaleString()} Km
                            </p>
                            <div className="n-description-container">
                                <p className="n-car-description">{this.props.ad.description}</p>
                            </div>
                        </Col>
                        <Col className="n-car-margin-top n-car-year">
                            <p>{this.props.ad.yearOfProduction}</p>
                        </Col>
                        <Col className="n-car-margin-top n-car-price">
                            <p className="">
                                <strong>{parseInt(this.props.ad.price).toLocaleString()}</strong>
                                <br></br>
                                Euro
                            </p>
                        </Col>
                        <Col className="n-car-margin-top n-fav-button">
                            {Auth.isUserAuthenticated() && this.props.uiStore.isAllAdsOpen && (
                                <div
                                    onClick={async (): Promise<void> => {
                                        let isOperationSucceeded = await this.props.adStore.tryAddToFavorite(this.props.ad.id);

                                        if (isOperationSucceeded) {
                                            setTimeout(() => {
                                                toastr.success('Added to your favorites');
                                            }, 300);
                                        }
                                    }}
                                >
                                    <FavButton />
                                </div>
                            )}
                            {Auth.isUserAuthenticated() && this.props.uiStore.isFavoriteAdsOpen && (
                                <div
                                    onClick={async (): Promise<void> => {
                                        let isOperationSucceeded = await this.props.adStore.removeFromFavorite(this.props.ad.id);

                                        if (isOperationSucceeded) {
                                            setTimeout(() => {
                                                toastr.success('Removed from your favorites');
                                            }, 300);
                                        }
                                    }}
                                >
                                    <Icon style={{ width: '2em', height: '2em' }} type="delete" theme="twoTone" />
                                </div>
                            )}
                            {Auth.isUserAuthenticated() && this.props.uiStore.isMyAdsAdsOpen && (
                                <>
                                    <div
                                        onClick={async (): Promise<void> => {
                                            let isOperationSucceeded = await this.props.adStore.removeFromFavorite(this.props.ad.id);

                                            if (isOperationSucceeded) {
                                                setTimeout(() => {
                                                    toastr.success('Removed from your favorites');
                                                }, 300);
                                            }
                                        }}
                                    >
                                        <Icon style={{ width: '2em', height: '2em' }} type="edit" theme="twoTone" />
                                    </div>
                                    <div
                                        onClick={async (): Promise<void> => {
                                            let isOperationSucceeded = await this.props.adStore.removeAd(this.props.ad.id);

                                            if (isOperationSucceeded) {
                                                setTimeout(() => {
                                                    toastr.success('Removed successful.');
                                                }, 300);
                                            }
                                        }}
                                    >
                                        <Icon style={{ width: '2em', height: '2em' }} type="delete" theme="twoTone" />
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}

export default withRouter(Ad);
