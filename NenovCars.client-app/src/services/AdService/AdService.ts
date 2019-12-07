import Axios from "axios";
import { IAllCarsContainer } from "../../components/AdsContainer/interfaces/IAllCarsContainer";
import Auth from "../../helpers/Auth/Auth";

export default class AdService {
    public async getAllCars(page: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer;
        try {
            let result = await Axios.get("api/car/GetAllCars/" + page);

            viewModel = result.data;
        } catch (error) {
            console.log(error);
        }

        return viewModel;
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
            let result = await Axios.get("api/car/GetFavoriteCars/" + userId + "/" + page, config);

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
            let result = await Axios.get("api/car/AddToFavorite/" + id + "/" + userId, config);

            isOperationSucceeded = result.data;
        } catch (error) {
            console.log(error);
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
            let result = await Axios.get("api/car/RemoveFromFavorite/" + id + "/" + userId, config);

            isOperationSucceeded = result.data;
        } catch (error) {
            console.log(error);
        }

        return isOperationSucceeded;
    }


}
