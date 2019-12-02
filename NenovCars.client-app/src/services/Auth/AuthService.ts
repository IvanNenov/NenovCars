import Axios from 'axios';
import IUserRegister from '../../components/User/interfaces/IUserRegister';
import IUserLogin from '../../components/User/interfaces/IUserLogin';

export default class AuthService {

    public async register(user: IUserRegister): Promise<void> {
        try {
            await Axios.post('/api/User/Register', user);
        } catch (error) {
            console.log(error);
        }
    }

    public async login(user: IUserLogin): Promise<void> {
        try {
            let result = await Axios.post('/api/User/Login', user);

            let tokenResult = result.data;

            localStorage.setItem('token', tokenResult.token);
        } catch (error) {
            console.log(error);
        }
    }
}
