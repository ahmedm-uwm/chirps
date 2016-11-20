export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      { 
	route: ['', 'home'],
	 moduleId: './modules/home',
	 name: 'Home' 
      },
      {
	 route: 'wall',
	 moduleId: './modules/wall',
	 name: 'Wall' 
     }
    ]);
  }
}


// export class App {
//   constructor() {
//     this.message = 'Hello World!';
//   }
// }
