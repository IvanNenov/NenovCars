import { observable, action, computed } from 'mobx';
import Auth from '../../helpers/Auth/Auth';
import AuthService from '../../services/Auth/AuthService';

export interface IUserStore {
    isUserAuthenticated: boolean;
    isLoggedIn: boolean;

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

    @computed
    public get isUserAuthenticated(): boolean {
        return Auth.isUserAuthenticated();
    }

    public setIsUserAuthenticated(isLoggedIn: boolean): void {
        this.isLoggedIn = isLoggedIn;
    }
}