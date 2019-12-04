import * as React from 'react';
import { ICarAd } from '../interfaces/ICarAd';

interface AdProps {
    ad: ICarAd;
}

interface AdState {

}

export default class Add extends React.Component<AdProps, AdState>{
    public render(): JSX.Element {
        return (
            <div>
                <img src={this.props.ad.imageUrl} />
                <h1>{this.props.ad.brand}</h1>
                <h1>{this.props.ad.model}</h1>
                <h1>{this.props.ad.hp}</h1>
                <h1>{this.props.ad.fuel}</h1>
                <hr />
            </div>
        );
    }
}