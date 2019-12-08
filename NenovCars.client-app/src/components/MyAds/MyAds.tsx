import * as React from 'react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { IUiStore } from '../../stores/UiStore/UiStore';
import { inject, observer } from 'mobx-react';
import LoadingIndicatior from '../LoadingIndicator/LoadingIndicator';
import { Row, Col, Divider, Pagination } from 'antd';
import AdsContainer from '../AdsContainer/AdsContainer';

interface IMyAdsProps{
    adStore? :IAdStore;
    uiStore? :IUiStore;
}

interface IMyAdsState{
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@inject('uiStore')
@observer
export default class MyAds extends React.Component<IMyAdsProps, IMyAdsState> {
    public state: IMyAdsState = {
        page: 1,
        isAdsLoading: true
    }

    public async componentDidMount(): Promise<void>{
        await this.props.adStore.getMyAds(this.state.page.toString())

        if (this.props.adStore.myAds && this.props.adStore.myAds.allCars) {
            this.props.uiStore.setIsMyAdsOpen(true);
            this.setState({
                isAdsLoading: false
            });
        }
    }

    public componentWillUnmount(): void {
        this.props.uiStore.setIsMyAdsOpen(false);
    }

    public render(): JSX.Element {
        return(
            <>
            {this.state.isAdsLoading ? (
                <LoadingIndicatior />
            ) : (
                <>
                    <Row type="flex" justify="center">
                        <Col>
                            <div className="n-recently-added">
                                <Divider>My Ads</Divider>
                            </div>
                            {this.props.adStore.myAds &&
                                this.props.adStore.myAds.allCars &&
                                this.props.adStore.myAds.allCars.length >= 1 && (
                                    <Pagination
                                        onChange={this.onPageChange}
                                        current={this.state.page}
                                        defaultCurrent={this.state.page}
                                        total={parseInt(this.props.adStore.myAds.totalPagesCount) * 10}
                                    />
                                )}
                            <AdsContainer carsList={this.props.adStore.myAds.allCars} />
                            {this.props.adStore.myAds &&
                                this.props.adStore.myAds.allCars &&
                                this.props.adStore.myAds.allCars.length >= 1 && (
                                    <Pagination
                                        onChange={this.onPageChange}
                                        current={this.state.page}
                                        defaultCurrent={this.state.page}
                                        total={parseInt(this.props.adStore.myAds.totalPagesCount) * 10}
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

        this.props.adStore.getMyAds(page.toString());
    };
}