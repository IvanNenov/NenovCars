import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import LoadingIndicatior from '../LoadingIndicator/LoadingIndicator';
import { IUiStore } from '../../stores/UiStore/UiStore';
import { Divider, Pagination, Col, Row } from 'antd';

interface FavoriteCarsProps {
    adStore?: IAdStore;
    uiStore?: IUiStore;
}

interface FavoriteCarsState {
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@inject('uiStore')
@observer
export default class FavoriteCars extends React.Component<FavoriteCarsProps, FavoriteCarsState> {
    public state: FavoriteCarsState = {
        page: 1,
        isAdsLoading: true
    };

    public async componentDidMount(): Promise<void> {
        await this.props.adStore.getFavoriteCars(this.state.page.toString());

        if (this.props.adStore.favoriteCars && this.props.adStore.favoriteCars.allCars) {
            this.props.uiStore.setIsFavoriteOpen(true);
            this.setState({
                isAdsLoading: false
            });
        }
    }

    public componentWillUnmount(): void {
        this.props.uiStore.setIsFavoriteOpen(false);
    }

    public render() {
        return (
            <>
                {this.state.isAdsLoading ? (
                    <LoadingIndicatior />
                ) : (
                    <>
                        <Row type="flex" justify="center">
                            <Col>
                                <div className="n-recently-added">
                                    <Divider>My Favorite Cars</Divider>
                                </div>
                                {this.props.adStore.favoriteCars &&
                                    this.props.adStore.favoriteCars.allCars &&
                                    this.props.adStore.favoriteCars.allCars.length >= 1 && (
                                        <Pagination
                                            onChange={this.onPageChange}
                                            current={this.state.page}
                                            defaultCurrent={this.state.page}
                                            total={parseInt(this.props.adStore.favoriteCars.totalPagesCount) * 10}
                                        />
                                    )}
                                <AdsContainer carsList={this.props.adStore.favoriteCars.allCars} />
                                {this.props.adStore.favoriteCars &&
                                    this.props.adStore.favoriteCars.allCars &&
                                    this.props.adStore.favoriteCars.allCars.length >= 1 && (
                                        <Pagination
                                            onChange={this.onPageChange}
                                            current={this.state.page}
                                            defaultCurrent={this.state.page}
                                            total={parseInt(this.props.adStore.favoriteCars.totalPagesCount) * 10}
                                        />
                                    )}
                            </Col>
                        </Row>
                    </>
                )}
            </>
        );
    }

    private onPageChange = (page: number, pageSize?: number): void => {
        this.setState({
            page: page
        });

        this.props.adStore.getFavoriteCars(page.toString());
    };
}
