import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import LoadingIndicatior from '../LoadingIndicator/LoadingIndicator';

interface FavoriteCarsProps {
    adStore?: IAdStore;
}

interface FavoriteCarsState {
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@observer
export default class FavoriteCars extends React.Component<FavoriteCarsProps, FavoriteCarsState> {
    public state: FavoriteCarsState = {
        page: 1,
        isAdsLoading: true
    }

    public async componentDidMount(): Promise<void> {
        await this.props.adStore.getFavoriteCars(this.state.page.toString());

        if (this.props.adStore.favoriteCars && this.props.adStore.favoriteCars.allCars) {
            this.setState({
                isAdsLoading: false
            })
        }
    }

    public render() {
        return (
            <>
                {this.state.isAdsLoading ?
                    <LoadingIndicatior /> :
                    <AdsContainer carsList={this.props.adStore.favoriteCars.allCars}/>}

            </>
        );
    }
}