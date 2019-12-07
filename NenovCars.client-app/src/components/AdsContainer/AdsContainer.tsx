import * as React from 'react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import Ad from './Add/Ad';
import { List, Row, Col } from 'antd';
import { inject, observer } from 'mobx-react';
import { ICarAd } from './interfaces/ICarAd';
import './AdsContainer.css';
import { IUiStore } from '../../stores/UiStore/UiStore';

interface AdsContainerProps {
    adStore?: IAdStore;
    uiStore?: IUiStore;
    carsList?: ICarAd[];
}

interface AdsContainerState {
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@inject('uiStore')
@observer
export default class AdsContainer extends React.Component<AdsContainerProps, AdsContainerState> {
    public state: AdsContainerState = {
        page: 1,
        isAdsLoading: true
    };

    public render(): JSX.Element {
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.props.carsList && this.props.carsList}
                            renderItem={item => (
                                <List.Item>
                                    <Ad ad={item} />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
