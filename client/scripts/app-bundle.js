define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'wall',
        moduleId: './modules/wall',
        name: 'Wall'
      }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Home(router) {
            _classCallCheck(this, Home);

            this.router = router;
            this.message = 'Chirps';
            this.showLogon = true;
            this.email;
            this.password;
        }

        Home.prototype.login = function login() {
            this.router.navigate('wall');
        };

        Home.prototype.showRegister = function showRegister() {
            this.showLogon = !this.showLogon;
        };

        Home.prototype.save = function save() {
            this.showLogon = true;
        };

        return Home;
    }()) || _class);
});
define('modules/wall',['exports', 'aurelia-framework', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Wall = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Wall = exports.Wall = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Wall(router) {
            _classCallCheck(this, Wall);

            this.router = router;
            this.message = 'Chirps';
        }

        Wall.prototype.logout = function logout() {
            this.router.navigate('home');
        };

        return Wall;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <router-view></router-view>\n</template>\n\n\n<!--<template>\n  <h1>${message}</h1>\n</template>-->\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"container\">\r\n        <div class=\"col-lg-1 input-group marginTop marginBottom\">\r\n            <span show.bind=\"!showLogon\" click.trigger=\"showRegister()\"  class=\" glyphicon glyphicon-arrow-left leftMargin\">\r\n\t </span>\r\n        </div>\r\n    </div>\r\n\r\n    <div class='container'>\r\n        <div class=\"panel panel-default topMargin\">\r\n            <div class=\"panel-body\">\r\n                <div class=\"col-lg-2\">\r\n                    <h1>${message}</h1>\r\n                </div>\r\n                <div class=\"col-lg-3 pull-right\">\r\n                    <img src=\"http://localhost:9000/src/resources/img/chirpLogo.jpg\" />\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div style=\"margin-top:10px;\">\r\n        <compose show.bind=\"showLogon\" view=\"./components/logon.html\"></compose>\r\n        <compose show.bind=\"!showLogon\" view=\"./components/register.html\"></compose>\r\n    </div>\r\n\r\n\r\n</template>"; });
define('text!modules/wall.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h1>Wall</h1>\r\n\t<button click.trigger=\"logout()\">Logout</button>\r\n</template>\r\n"; });
define('text!modules/components/logon.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class='container'>\r\n        <div class=\"well col-md-3\">\r\n            <form id=\"form\">\r\n                <div id=\"errorMsg\"></div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"email\">Email</label>\r\n                    <input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\"  id=\"email\" placeholder=\"Email\"></input>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <label for=\"password\">Password</label>\r\n                    <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></input>\r\n                </div>\r\n\r\n                <button class=\"btn btn-default\" click.trigger='login()'>Login</button>\r\n                <a href=\"\" class=\"text-muted\" click.trigger=\"showRegister()\">Register</a>\r\n            </form>\r\n        </div>\r\n</template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container\" <form id=\"RegistrationForm\" click.delegate=\"save()\">\r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputEmail1\">Email address</label>\r\n            <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\"  aria-describedby=\"emailHelp\" placeholder=\"Enter email\"\r\n                value.bind=\"email\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputFirstName\">First name</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputFirstName\" aria-describedby=\"firstNameHelp\" placeholder=\"Enter first name\"\r\n                value.bind=\"firstName\">\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputLastName\">Last name</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputLastName\" aria-describedby=\"lastNameHelp\" placeholder=\"Enter last name\"\r\n                value.bind=\"lastName\">\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputScreenName\">Screen name</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputScreenName\" aria-describedby=\"ScreenNameHelp\" placeholder=\"Enter screen name\"\r\n                value.bind=\"screenName\">\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n            <label for=\"exampleInputPassword\">Password</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"exampleInputPassword\" aria-describedby=\"PasswordHelp\" placeholder=\"Enter password\"\r\n                value.bind=\"password\">\r\n        </div>\r\n\r\n        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n        </form>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map