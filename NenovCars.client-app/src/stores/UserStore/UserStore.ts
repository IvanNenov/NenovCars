import { observable, action, computed } from 'mobx';
import Auth from '../../helpers/Auth/Auth';

export interface IUserStore {
    isUserAuthenticated: boolean;
    isLoggedIn: boolean;
}

export class UserStore implements IUserStore {
    @observable public isLoggedIn: boolean = false;

    public constructor() {

    }

    public setApiUrl(url: string): void {

    }

    @computed
    public get isUserAuthenticated(): boolean {
        let isLoggedIn = Auth.isUserAuthenticated();
        this.isLoggedIn = isLoggedIn

        return isLoggedIn
    }
}