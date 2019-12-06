import { observable, action, computed } from 'mobx';
import Auth from '../../helpers/Auth/Auth';
import AuthService from '../../services/Auth/AuthService';
import IUserLogin from '../../components/User/interfaces/IUserLogin';
import IUserRegister from '../../components/User/interfaces/IUserRegister';

export interface IUserStore {
    isUserAuthenticated: boolean;
    isLoggedIn: boolean;
    login(user: IUserLogin): Promise<boolean>;
    register(user: IUserRegister): Promise<boolean>;

    setIsUserAuthenticated(isLoggedIn: boolean): void
    logout(): void;
}

export class UserStore implements IUserStore {
    private _authService: AuthService;

    @observable public isLoggedIn: boolean = false;

    public constructor(authService: AuthService) {
        this._authService = authService;
    }

    public setApiUrl(url: string): void {

    }

    public logout(): void {
        if (this.isUserAuthenticated) {
            this.isLoggedIn = false;
            this._authService.logout();
        }
    }

    public login(user: IUserLogin): Promise<boolean> {
        let isLoggedIn = this._authService.login(user);

        return isLoggedIn;
    }

    public register(user: IUserRegister): Promise<boolean> {
        let isRegistered = this._authService.register(user);

        return isRegistered;
    }

    @computed
    public get isUserAuthenticated(): boolean {
        return Auth.isUserAuthenticated();
    }

    public setIsUserAuthenticated(isLoggedIn: boolean): void {
        this.isLoggedIn = isLoggedIn;
    }
}