import Axios from 'axios';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';

export default class AdService {
    public async getAllCars(page: string): Promise<IAllCarsContainer> {
        let viewModel: IAllCarsContainer; 
        try {
           let result = await Axios.get('api/car/GetAllCars/' + page)

           viewModel = result.data;

        } catch (error) {
            console.log(error);
        }

        return viewModel;
    }  

    public async getCarsPage(currentPage: string): Promise<void> {
        try {
            await Axios.get('api/car/GetAllCars' + currentPage)
        } catch (error) {
            console.log(error)
        }
    }
} 