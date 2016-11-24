import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class Home {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.message = 'Chirps';
        this.showLogon = true;
        this.email;
        this.password;
         this.loginError=" ";
    }

    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                sessionStorage.setItem("user", JSON.stringify(response.user));
                this.loginError = "";
                this.router.navigate('wall');
            })
            .catch(error => {
                console.log(error);
                this.loginError = "Invalid credentials.";
            });
    };

    showRegister() {
        this.showLogon = !this.showLogon;
    }

    save() {
        this.showLogon = true;
    }
}
