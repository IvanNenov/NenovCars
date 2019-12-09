import { observable, action, IAction } from 'mobx';
import AdService from '../../services/AdService/AdService';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';
import { ICarAdInput } from '../../components/CreateAd/interfaces/ICarAdInput';
import { ICarAd } from '../../components/AdsContainer/interfaces/ICarAd';

export interface IAdStore {
    carsContainer: IAllCarsContainer;
    favoriteCars: IAllCarsContainer;
    formDataContainer: FormData[];
    adDetails: ICarAd;
    myAds: IAllCarsContainer;
    adToEdit: ICarAd;
    searchResults: IAllCarsContainer;

    getAllCars(page: string): Promise<void>;
    getFavoriteCars(page: string): Promise<void>;
    tryAddToFavorite(adId: string): Promise<boolean>;
    removeFromFavorite(adId: string): Promise<boolean>;
    createAd(carAd: ICarAdInput): Promise<boolean>;
    addToFormDataContainer(formData: FormData): void;
    setAdDetailsItem(ad: ICarAd): void;
    getMyAds(page: string): Promise<void>;
    removeAd(adId: string): Promise<boolean>;
    setAdToEdit(ad: ICarAd): void;
    editAd(edittedAd: ICarAd): Promise<boolean>;
    getSearchResult(firstParam: string, secondParam?: string): Promise<void>;
}

export class AdStore implements IAdStore {
    private _adService: AdService;

    @observable public carsContainer: IAllCarsContainer = null;
    @observable public favoriteCars: IAllCarsContainer = null;
    @observable public formDataContainer: FormData[] = new Array<FormData>();
    @observable public adDetails: ICarAd = null;
    @observable public myAds: IAllCarsContainer = null;
    @observable public adToEdit: ICarAd = null;
    @observable public searchResults: IAllCarsContainer = null;

    public constructor(adService: AdService) {
        this._adService = adService;
    }

    public setApiUrl(url: string): void {}

    @action
    public setAdDetailsItem(ad: ICarAd): void {
        if (ad) {
            this.adDetails = ad;
        }
    }

    @action
    public addToFormDataContainer(formData: FormData): void {
        if (formData) {
            this.formDataContainer.push(formData);
        }
    }

    @action
    public async getAllCars(page: string): Promise<void> {
        this.carsContainer = await this._adService.getAllCars(page);
    }

    public async tryAddToFavorite(adId: string): Promise<boolean> {
        let isOperationSucceeded = await this._adService.addToFavorite(adId);

        return isOperationSucceeded;
    }

    public async removeFromFavorite(adId: string): Promise<boolean> {
        let isOperationSucceeded = await this._adService.removeFromFavorite(adId);

        if (isOperationSucceeded) {
            await this.getFavoriteCars('1');
        }

        return isOperationSucceeded;
    }

    @action
    public async getFavoriteCars(page: string): Promise<void> {
        this.favoriteCars = await this._adService.getFavoriteCars(page);
    }

    public async createAd(carAd: ICarAdInput): Promise<boolean> {
        let isOperationSucceeded = await this._adService.createAd(carAd);

        return isOperationSucceeded;
    }

    @action
    public async getMyAds(page: string): Promise<void> {
        this.myAds = await this._adService.getMyAds(page);
    }

    public async removeAd(adId: string): Promise<boolean> {
        if (adId) {
            return await this._adService.removeAd(adId);
        }

        return false;
    }

    @action
    public setAdToEdit(ad: ICarAd): void {
        if (ad) {
            this.adToEdit = ad;
        }
    }

    public async editAd(edittedAd: ICarAd): Promise<boolean> {
        if (edittedAd) {
            return this._adService.editAd(edittedAd);
        }

        return false;
    }

    @action
    public async getSearchResult(firstParam: string, secondParam?: string): Promise<void> {
        if (firstParam) {
            this.searchResults = await this._adService.search(firstParam, secondParam);
        }
    }
}
