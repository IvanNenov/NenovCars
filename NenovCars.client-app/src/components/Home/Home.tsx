import * as React from 'react';
import AdsContainer from '../AdsContainer/AdsContainer';
import { inject, observer } from 'mobx-react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import LoadingIndicatior from '../LoadingIndicator/LoadingIndicator';

interface HomeProps {
    adStore?: IAdStore;
}

interface HomeState {
    page: number;
    isAdsLoading: boolean;
}

@inject('adStore')
@observer
export default class Home extends React.Component<HomeProps, HomeState> {
    public state: HomeState = {
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

    public render() {
        return (
            <>
                {this.state.isAdsLoading ?
                    <LoadingIndicatior /> :
                    <AdsContainer carsList={this.props.adStore.carsContainer.allCars}/>}

            </>
        );
    }
}