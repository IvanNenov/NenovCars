import { observable, action, computed } from 'mobx';
import AdService from '../../services/AdService/AdService';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';

export interface IAdStore {
    carsConteiner: IAllCarsContainer;

    getAllCars(page: string): Promise<void>;
}

export class AdStore implements IAdStore {
    private _adService: AdService;

    @observable public carsConteiner: IAllCarsContainer = null;

    public constructor(adService: AdService) {
        this._adService = adService;
    }

    public setApiUrl(url: string): void {

    }

    @action
    public async getAllCars(page: string): Promise<void> {
        this.carsConteiner = await this._adService.getAllCars(page);
    }
}