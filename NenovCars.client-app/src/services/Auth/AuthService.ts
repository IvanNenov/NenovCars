import Axios from 'axios';
import IUserRegister from '../../components/User/interfaces/IUserRegister';
import IUserLogin from '../../components/User/interfaces/IUserLogin';

export default class AuthService {

    public async register(user: IUserRegister): Promise<void> {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            await Axios.post('api/User/Register', user, config);
        } catch (error) {
            console.log(error);
        }
    }

    public async login(user: IUserLogin): Promise<boolean> {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let isLogged: boolean = false;
        try {
            let result = await Axios.post('api/User/Login', user, config);

            let tokenResult = result.data;

            if (tokenResult) {
                localStorage.setItem('token', tokenResult.token);
                isLogged = true;
            } else {
                isLogged = false;
            }
        } catch (error) {
            console.log(error);
        }

        return isLogged;
    }
}
