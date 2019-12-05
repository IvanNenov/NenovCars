import * as React from 'react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import Ad from './Add/Ad';
import { List, Row, Col, Spin, Icon } from 'antd';
import './AdsContainer.css';

interface AdsContainerProps {
    adStore?: IAdStore;
}

interface AdsContainerState {
    page: number;
    isAdsLoading: boolean;
}

const antIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

@inject('adStore')
@observer
export default class AdsContainer extends React.Component<AdsContainerProps, AdsContainerState>{
    public state: AdsContainerState = {
        page: 1,
        isAdsLoading: true
    }

    public async componentDidMount(): Promise<void> {
        await this.props.adStore.getAllCars(this.state.page.toString());

        if (this.props.adStore.carsContainer && this.props.adStore.carsContainer.allCars) {
            this.setState({
                isAdsLoading: false
            })
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.state.isAdsLoading ? (
                    <div className="n-loading-indicator">
                        <Spin indicator={antIcon} />
                    </div>
                ) : (
                        <Row type="flex" justify="center">
                            <Col>
                                <List
                                    itemLayout='horizontal'
                                    dataSource={this.props.adStore.carsContainer.allCars}
                                    renderItem={item => (
                                        <List.Item>
                                            <Ad ad={item} />
                                        </List.Item>
                                    )} />
                            </Col>
                        </Row>)}
            </div>
        );
    }
}