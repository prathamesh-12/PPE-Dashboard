//var ppeApp = angular.module('ppeApp', ['ui.router', 'ngAnimate', 'oc.lazyLoad']);
ppeApp.controller("InventoryCtrl", ['$rootScope', '$scope', '$state', '$location', 
function ($rootScope, $scope, $state, $location,  Flash) {
    $scope.inventory = {};
    $scope.inspectionIntervals = [{
        id: '-1', interval: 'Select Interval'
    },{
        id: 'daily', interval: 'Daily'
    },{
        id: 'weekly', interval: 'Weekly'
    },{
        id: 'monthly', interval: 'Monthly'
    },{
        id: 'quarterly', interval: 'Quarterly'
    },{
        id: 'halfyearly', interval: 'Half Yearly'
    },{
        id: 'yearly', interval: 'Yearly'
    }];

    $('.custom-datepicker').datepicker({
      autoclose: true,
       format: "dd/mm/yyyy",
       orientation: "bottom auto",
       todayHighlight: true
    });
}]);

