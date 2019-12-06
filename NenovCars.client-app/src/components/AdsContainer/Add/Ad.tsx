import * as React from "react";
import { ICarAd } from "../interfaces/ICarAd";
import { Button } from "antd";
import { IAdStore } from "../../../stores/AdStore/AdStore";
import { inject, observer } from "mobx-react";
import Auth from "../../../helpers/Auth/Auth";

interface AdProps {
    adStore?: IAdStore;
    ad: ICarAd;
}

interface AdState { }

@inject('adStore')
@observer
export default class Add extends React.Component<AdProps, AdState> {
    private async tryAddToFavorite(carId: string): Promise<void> {
        if (carId) {
            await this.props.adStore.tryAddToFavorite(carId);
        }
    }

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
                {Auth.isUserAuthenticated() &&
                    <Button onClick={async (): Promise<void> => this.tryAddToFavorite(this.props.ad.id)}>Add to favorite</Button>
                }
            </div>
        );
    }
}
