import Axios from 'axios';
import { ICarAdInput } from '../../components/CarAd/interfaces/ICarAdInput';
import Auth from '../../helpers/Auth/Auth';

export default class CarService {
    public async addCar(carAd: ICarAdInput): Promise<boolean> {
        let config = {
            headers: {
                Authorization: `Bearer ${Auth.getAuthToken()}`,
                UserId: `${Auth.getCurrentUserId()}`
            }
        };

        let isSuccessfull: boolean = false;

        try {
            let result = await Axios.post('api/car/addCar', carAd, config);

            isSuccessfull = result.status === 200 ? true : false;
        } catch (error) {
            console.log(error);
        }

        return isSuccessfull;
    }
}
