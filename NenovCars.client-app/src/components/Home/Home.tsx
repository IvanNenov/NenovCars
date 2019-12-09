import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';
import { inject, observer } from 'mobx-react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import LoadingIndicatior from '../LoadingIndicator/LoadingIndicator';
import { IUiStore } from '../../stores/UiStore/UiStore';
import { Divider, Pagination, Row, Col, Button } from 'antd';
import { IUserStore } from '../../stores/UserStore/UserStore';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import './Home.css';

interface HomeProps {
    adStore?: IAdStore;
    uiStore?: IUiStore;
    userStore?: IUserStore;
}

interface HomeState {
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@inject('uiStore')
@inject('userStore')
@observer
class Home extends React.Component<HomeProps & RouteComponentProps, HomeState> {
    public state: HomeState = {
        page: 1,
        isAdsLoading: true
    };

    public async componentDidMount(): Promise<void> {
        await this.props.adStore.getAllCars(this.state.page.toString());

        if (this.props.adStore.carsContainer && this.props.adStore.carsContainer.allCars) {
            this.props.uiStore.setIsAllAdsOpen(true);
            this.setState({
                isAdsLoading: false
            });
        }
    }

    public componentWillUnmount(): void {
        this.props.uiStore.setIsAllAdsOpen(false);
    }

    public render() {
        return (
            <>
                {this.state.isAdsLoading ? (
                    <LoadingIndicatior />
                ) : (
                    <>
                        <div className="dark-translucent">
                            <h1 className="n-home-title">Find Your Future Car</h1>
                            <div className="n-separator"></div>
                            <div className="n-home-buttons">
                                {this.props.userStore.isLoggedIn ? (
                                    <>
                                        <Button ghost onClick={(): void => this.props.history.push('/create-ad')}>
                                            Create Ad
                                        </Button>
                                        <Button
                                            className="n-home-second-btn"
                                            ghost
                                            onClick={(): void => this.props.history.push('/search')}
                                        >
                                            Browse
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button ghost onClick={(): void => this.props.history.push('/login')}>
                                            Login
                                        </Button>
                                        <Button
                                            className="n-home-second-btn"
                                            ghost
                                            onClick={(): void => this.props.history.push('/register')}
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            className="n-home-second-btn"
                                            ghost
                                            onClick={(): void => this.props.history.push('/search')}
                                        >
                                            Browse
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                        <Row type="flex" justify="center">
                            <Col>
                                <div className="n-recently-added">
                                    <Divider>Recently Added</Divider>
                                </div>
                                <Pagination
                                    onChange={this.onPageChange}
                                    current={this.state.page}
                                    defaultCurrent={this.state.page}
                                    total={parseInt(this.props.adStore.carsContainer.totalPagesCount) * 10}
                                />
                                <AdsContainer carsList={this.props.adStore.carsContainer.allCars} />
                                <Pagination
                                    onChange={this.onPageChange}
                                    current={this.state.page}
                                    defaultCurrent={this.state.page}
                                    total={parseInt(this.props.adStore.carsContainer.totalPagesCount) * 10}
                                />
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

        this.props.adStore.getAllCars(page.toString());
    };
}

export default withRouter(Home);
