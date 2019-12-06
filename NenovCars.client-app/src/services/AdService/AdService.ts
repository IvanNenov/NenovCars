import Axios from 'axios';
import { IAllCarsContainer } from '../../components/AdsContainer/interfaces/IAllCarsContainer';

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

    public async GetFavoriteCars(page: string): Promise<IAllCarsContainer>{
        let viewModel: IAllCarsContainer;

        try {
            let result = await Axios.get('api/car/FavoriteCars/' + page);
            viewModel = result.data;
        }

        catch(error){
            console.log(error);
        }

        return viewModel;
    }
}  
