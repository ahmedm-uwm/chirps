import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Home {
    constructor(router) {
        this.router = router;
        this.message = 'Chirps';
        this.showLogon = true;
        this.email;
        this.password;
    }

    login() {
        this.router.navigate('wall');
    }

    showRegister(){
        this.showLogon = !this.showLogon;
    }

    save(){
        this.showLogon = true;
    }
}
