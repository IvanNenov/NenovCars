import { observable, action } from "mobx";

export interface IUiStore {
    isFavoriteAdsLoading: boolean;
    isAllAdsLoading: boolean;
    isMyAdsLoading: boolean;

    isFavoriteAdsOpen: boolean;
    isAllAdsOpen: boolean;
    isMyAdsAdsOpen: boolean;

    setIsFavoriteLoading(loading: boolean): void;
    setIsAllAdsLoading(loading: boolean): void;
    setIsMyAdsLoading(loading: boolean): void;

    setIsAllAdsOpen(isOpen: boolean): void;
    setIsMyAdsOpen(isOpen: boolean): void;
    setIsFavoriteOpen(isOpen: boolean): void;
}

export class UiStore implements IUiStore {
    @observable public isFavoriteAdsLoading: boolean = true;
    @observable public isAllAdsLoading: boolean = true;
    @observable public isMyAdsLoading: boolean = true;

    @observable public isFavoriteAdsOpen: boolean = false;
    @observable public isAllAdsOpen: boolean = false;
    @observable public isMyAdsAdsOpen: boolean = false;

    @action
    public setIsFavoriteLoading(loading: boolean): void {
        this.isFavoriteAdsLoading = loading;
    }

    @action
    public setIsAllAdsLoading(loading: boolean): void {
        this.isAllAdsLoading = loading;
    }

    @action
    public setIsMyAdsLoading(loading: boolean): void {
        this.isMyAdsLoading = loading;
    }

    @action
    public setIsMyAdsOpen(isOpen: boolean): void {
        this.isMyAdsAdsOpen = isOpen;
    }

    @action
    public setIsAllAdsOpen(isOpen: boolean): void {
        this.isAllAdsOpen = isOpen;
    }

    @action
    public setIsFavoriteOpen(isOpen: boolean): void {
        this.isFavoriteAdsOpen = isOpen;
    }
}
