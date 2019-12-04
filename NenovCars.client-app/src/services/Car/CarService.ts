import Axios from 'axios';
import { ICarAdInput } from '../../components/CarAd/CarAd';

export default class CarService {
    

    public async addCar(carAd: ICarAdInput): Promise<void> {
        try {
            await Axios.post('api/car/addCar', carAd)
        } catch (error) {
            console.log(error)
        }
    }
} 