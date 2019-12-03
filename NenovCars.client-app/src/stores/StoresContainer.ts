import { UserStore } from "./UserStore/UserStore"

/**
 * A property that combines and initializes all stores.
 */
export const stores = {
    userStore: new UserStore()
}