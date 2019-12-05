import Axios from 'axios';
import IUserRegister from '../../components/User/interfaces/IUserRegister';
import IUserLogin from '../../components/User/interfaces/IUserLogin';
import Auth from '../../helpers/Auth/Auth';

export default class AuthService {
    public logout(): void {
        let isUserAuthenticated = Auth.isUserAuthenticated();
        if (isUserAuthenticated) {
            localStorage.removeItem('token');
            localStorage.removeItem('Username');
            localStorage.removeItem('UserId');
        }
    }


    public async register(user: IUserRegister): Promise<boolean> {
        let isRegisterSuccesful: boolean = false;

        try {
            let result = await Axios.post('api/User/Register', user);

            isRegisterSuccesful = result.data.succeeded ? true : false;
        } catch (error) {
            console.log(error);
        }

        return isRegisterSuccesful;
    }

    public async login(user: IUserLogin): Promise<boolean> {
        let isLogged: boolean = false;
        try {
            let result = await Axios.post('api/User/Login', user);

            let userClaims = result.data;

            let userId = userClaims.userId;
            let username = userClaims.username;
            let token = userClaims.token;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('Username', username);
                localStorage.setItem('UserId', userId);

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
