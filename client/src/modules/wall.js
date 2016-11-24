import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class Wall {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.message = 'Chirps';
    }

    logout() {
        sessionStorage.removeItem('user');
        this.auth.logout();
    }

}
