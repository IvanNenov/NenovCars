import * as React from "react";
import { ICarAd } from "../interfaces/ICarAd";

interface AdProps {
    ad: ICarAd;
}

interface AdState {}

export default class Add extends React.Component<AdProps, AdState> {
    public render(): JSX.Element {
        return (
            <div>
                <img src={this.props.ad.imageUrl} />
                <h1>{this.props.ad.brand}</h1>
                <h1>{this.props.ad.model}</h1>
                <h1>{this.props.ad.hp}</h1>
                <h1>{this.props.ad.fuel}</h1>
                <h1>{this.props.ad.adTitle}</h1>
                <h1>{this.props.ad.yearOfProduction}</h1>
                <h1>{this.props.ad.color}</h1>
                <h1>{this.props.ad.transmission}</h1>
                <h1>{this.props.ad.vehicleType}</h1>
                <h1>{this.props.ad.price}</h1>
                <h1>{this.props.ad.kilometre}</h1>
                <h1>{this.props.ad.description}</h1>
                <hr />
            </div>
        );
    }
}
