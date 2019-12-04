import * as React from 'react';
import { IAdStore } from '../../stores/AdStore/AdStore';
import { inject, observer } from 'mobx-react';
import Ad from './Add/Ad';

interface AdsContainerProps {
    adStore?: IAdStore;
}

interface AdsContainerState {
    page: number;
}

@inject('adStore')
@observer
export default class AdsContainer extends React.Component<AdsContainerProps, AdsContainerState>{
    public state: AdsContainerState = {
        page: 1
    }

    public async componentDidMount(): Promise<void> {
        await this.props.adStore.getAllCars(this.state.page.toString());
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.adStore.carsConteiner &&
                    this.props.adStore.carsConteiner.allCars &&
                    this.props.adStore.carsConteiner.allCars.map((x, index) => <Ad key={index} ad={x} />)}
            </div>
        );
    }
}