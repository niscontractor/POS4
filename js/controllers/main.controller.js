(function () {
    function MainController($scope, $rootScope) {
        $rootScope.welcomeMessage = "Hi user. This is your home page";
    }
    angular.module('insurance.controllers').controller('MainController', ['$scope', '$rootScope', MainController]);
})();
