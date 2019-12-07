import { UserStore } from "./UserStore/UserStore"
import AuthService from "../services/Auth/AuthService"
import AdService from "../services/AdService/AdService";
import { AdStore } from "./AdStore/AdStore";
import { UiStore } from "./UiStore/UiStore";

const authService = new AuthService();
const adService = new AdService();

/**
 * A property that combines and initializes all stores.
 */
export const stores = {
    userStore: new UserStore(authService),
    adStore: new AdStore(adService),
    uiStore: new UiStore()
}