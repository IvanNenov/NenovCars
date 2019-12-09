import Axios from 'axios';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';
import Auth from '../../helpers/Auth/Auth';
import { ICarAdInput } from '../../components/CreateAd/interfaces/ICarAdInput';
import toastr from 'toastr';
import { ICarAd } from '../../components/AdsContainer/interfaces/ICarAd';

export default class AdService {
    public async getAllCars(page: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer;
        try {
            let result = await Axios.get('api/car/GetAllCars/' + page);

            viewModel = result.data;
        } catch (error) {
            console.log(error);
        }

        return viewModel;
    }

    public async addToFavorite(id: string): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let userId = Auth.getCurrentUserId();
        let isOperationSucceeded: boolean = false;
        try {
            let result = await Axios.get('api/car/AddToFavorite/' + id + '/' + userId, config);

            isOperationSucceeded = result.status === 200 ? true : false;
        } catch (error) {
            setTimeout(() => {
                toastr.error(error.response.data);
            }, 300);
        }

        return isOperationSucceeded;
    }

    public async removeFromFavorite(id: string): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let userId = Auth.getCurrentUserId();
        let isOperationSucceeded: boolean = false;
        try {
            let result = await Axios.get('api/car/RemoveFromFavorite/' + id + '/' + userId, config);

            isOperationSucceeded = result.data;
        } catch (error) {
            console.log(error);
        }

        return isOperationSucceeded;
    }

    public async createAd(carAd: ICarAdInput): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`,
                UserId: `${Auth.getCurrentUserId()}`
            }
        };

        let isSuccessful: boolean = false;

        try {
            let result = await Axios.post('api/car/addCar', carAd, config);

            isSuccessful = result.status === 200 ? true : false;
        } catch (error) {
            console.log(error);
        }

        return isSuccessful;
    }

    public async getFavoriteCars(page: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer;

        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let userId = Auth.getCurrentUserId();

        try {
            let result = await Axios.get('api/car/GetFavoriteCars/' + userId + '/' + page, config);

            viewModel = result.data;
        } catch (error) {
            console.log(error);
        }

        return viewModel;
    }

    public async getMyAds(page: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer;

        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let userId = Auth.getCurrentUserId();

        try {
            let result = await Axios.get('api/car/GetMyAds/' + userId + '/' + page, config);

            viewModel = result.data;
        } catch (error) {
            console.log(error);
        }

        return viewModel;
    }

    public async removeAd(adId: string): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let isSuccessful: boolean = false;

        try {
            let result = await Axios.get('api/car/RemoveAd/' + adId, config);

            isSuccessful = result.status === 200 ? true : false;
        } catch (error) {
            console.log(error);
        }

        return isSuccessful;
    }

    public async editAd(ad: ICarAd): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`
            }
        };

        let isSuccessful: boolean = false;

        try {
            let adId = ad.id;
            let result = await Axios.post('api/car/UpdateAd/' + adId, ad, config);

            isSuccessful = result.status === 200 ? true : false;
        } catch (error) {
            console.log(error);
        }

        return isSuccessful;
    }

    public async search(firstParam: string, secondParam?: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer;

        try {
            let result = await Axios.get(`api/search/Search/${firstParam}/${secondParam}`);

            viewModel = result.data;
        } catch (error) {
            console.log(error);
        }

        return viewModel;
    }
}
