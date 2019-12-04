import { observable, action, computed } from 'mobx';
import Auth from '../../helpers/Auth/Auth';
import AuthService from '../../services/Auth/AuthService';

export interface IUserStore {
    isUserAuthenticated: boolean;
    isLoggedIn: boolean;

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
        if(this.isUserAuthenticated) {
            this._authService.logout();
        }
    }

    @computed
    public get isUserAuthenticated(): boolean {
        let isLoggedIn = Auth.isUserAuthenticated();
        this.isLoggedIn = isLoggedIn

        return isLoggedIn
    }
}