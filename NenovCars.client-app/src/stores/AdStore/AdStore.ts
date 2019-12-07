import { observable, action } from 'mobx';
import AdService from '../../services/AdService/AdService';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';

export interface IAdStore {
    carsContainer: IAllCarsContainer;
    favoriteCars: IAllCarsContainer;

    getAllCars(page: string): Promise<void>;
    getFavoriteCars(page: string): Promise<void>;
    tryAddToFavorite(adId: string): Promise<void>;
    removeFromFavorite(adId: string): Promise<void>;
}

export class AdStore implements IAdStore {
    private _adService: AdService;

    @observable public carsContainer: IAllCarsContainer = null;
    @observable public favoriteCars: IAllCarsContainer = null;

    public constructor(adService: AdService) {
        this._adService = adService;
    }

    public setApiUrl(url: string): void {}

    @action
    public async getAllCars(page: string): Promise<void> {
        this.carsContainer = await this._adService.getAllCars(page);
    }

    public async tryAddToFavorite(adId: string): Promise<void> {
        let isOperationSucceeded = await this._adService.addToFavorite(adId);
    }

    public async removeFromFavorite(adId: string): Promise<void> {
        let isOperationSucceeded = await this._adService.removeFromFavorite(adId);
    }

    @action
    public async getFavoriteCars(page: string): Promise<void> {
        this.favoriteCars = await this._adService.getFavoriteCars(page);
    }
}
