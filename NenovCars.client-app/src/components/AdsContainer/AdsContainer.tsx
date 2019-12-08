import * as React from 'react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import Ad from './Add/Ad';
import { List } from 'antd';
import { inject, observer } from 'mobx-react';
import { ICarAd } from './interfaces/ICarAd';
import { IUiStore } from '../../stores/UiStore/UiStore';
import './AdsContainer.css';

interface AdsContainerProps {
    adStore?: IAdStore;
    uiStore?: IUiStore;
    carsList?: ICarAd[];
}

interface AdsContainerState {}

@inject('adStore')
@inject('uiStore')
@observer
export default class AdsContainer extends React.Component<AdsContainerProps, AdsContainerState> {
    public render(): JSX.Element {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.carsList && this.props.carsList}
                    renderItem={item => (
                        <List.Item>
                            <Ad ad={item} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}
