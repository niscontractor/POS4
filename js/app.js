(function () {
    //Define the main module.
    var as = angular.module("insurance", ["ngRoute", "insurance.controllers", "insurance.service", "insurance.directives"]);
    as.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController as login',
            data: {
                module: "*"
            }

        });
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/home/:id', {
            templateUrl: 'views/home.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/nextPage/:id', {
            templateUrl: 'views/page2.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/ratePage/:id', {
            templateUrl: 'views/ratePage.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/purchaseInsurance/:id', {
            templateUrl: 'views/purchaseInsurance.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/reviewInsurance/:id', {
            templateUrl: 'views/reviewInsurance.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/payment/:id', {
            templateUrl: 'views/paymentPage.html',
            controller: 'CompaniesController as companies'
        });
        $routeProvider.when('/finalPage/:id', {
            templateUrl: 'views/finalPage.html',
            controller: 'CompaniesController as companies'
        });
    });
}());


