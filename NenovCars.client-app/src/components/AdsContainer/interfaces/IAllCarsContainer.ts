import { ICarAd } from "./ICarAd";

export interface IAllCarsContainer {
    allCars: ICarAd[];
    totalPagesCount: string;
    currentPage: string;
    pageSize: string;
}