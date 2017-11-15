//var ppeApp = angular.module('ppeApp', ['ui.router', 'ngAnimate', 'oc.lazyLoad']);
ppeApp.controller("DashboardCtrl", ['$rootScope', '$scope', '$state', '$location', 'dashboardService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    $scope.filtersCount = null;
    
    dashboardService.getFiltersCount().then(function(data) {
        $scope.filtersCount = data && data.filtersCount;
    }, function(err) {
        console.log(err);
    });


}]);

