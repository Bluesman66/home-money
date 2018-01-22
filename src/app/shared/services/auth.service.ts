export class AuthService {

    private isAuthenticated: boolean = false;

    login(): void {
        this.isAuthenticated = true;
    }

    logout(): void {
        this.isAuthenticated = false;
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
}