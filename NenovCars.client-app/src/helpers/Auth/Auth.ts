export default class Auth {
    /**
     *  Checks if user is authenticated and returns true or false.
     */
    public static isUserAuthenticated(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    /**
     * Returns user's token if any else returns null.
     */
    public static getAuthToken(): string | null {
        return localStorage.getItem('token');
    }
} 