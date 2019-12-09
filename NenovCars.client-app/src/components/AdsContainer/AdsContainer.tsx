import * as React from 'react';
import Ad from './Add/Ad';
import { List } from 'antd';
import { ICarAd } from './interfaces/ICarAd';
import './AdsContainer.css';

interface AdsContainerProps {
    carsList?: ICarAd[];
}

interface AdsContainerState {}

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
