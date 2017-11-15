var ppeApp = angular.module('ppeApp', ['ui.router', 'ngAnimate', 'oc.lazyLoad', 'datatables', 'tmh.dynamicLocale']);

ppeApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$controllerProvider', '$compileProvider', '$provide', '$locationProvider',
	function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $controllerProvider, $compileProvider, $provide, $locationProvider) {

	'use strict';

	// $locationProvider.hashPrefix('!').html5Mode(true);

	ppeApp.controller = $controllerProvider.register;
    ppeApp.directive = $compileProvider.directive;
    //ppeApp.filter = $filterProvider.register;
    ppeApp.factory = $provide.factory;
    ppeApp.service = $provide.service;
    ppeApp.constant = $provide.constant;
    ppeApp.value = $provide.value;

    //Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
    .state('dashboard', {
        url: "/dashboard",
        templateUrl: "app/modules/dashboard/dashboard.html",
        controller: "DashboardCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                            'app/modules/dashboard/dashboardCtrl.js',
                            'app/modules/dashboard/dashboardService.js'
                        ]
                });
            }]
        }
    })
   .state('filters', {
   		url: "/filters",
   		template : "<ui-view></ui-view>"
   })
   .state('filters.inspectionsDue', {
   		url: "/inspectionsDue",
        templateUrl: 'app/modules/filters/inspectionDue/inspectionDue.html',
        controller: "InspectionsDueCtrl",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                            'app/modules/filters/inspectionDue/inspectionDueCtrl.js',
                            'app/modules/filters/services/commonFiltersService.js'
                        ]
                });
            }]
        }
   })
.state('inventory', {
    url: "/inventory",
    templateUrl: "app/modules/inventory/inventory.html",
    controller: "InventoryCtrl",
    resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                files: [
                        'app/modules/inventory/inventoryCtrl.js',
                        //'app/modules/inventory/inventoryService.js'
                    ]
            });
        }]
    }
})
//    .state('coverage.defects', {
//    		url: "/defects",
//         templateUrl: "app/modules/coverage/coverageDefects.html",
//         controller: "CoverageDefectsCtrl",
//         resolve: {
//             deps: ['$ocLazyLoad', function ($ocLazyLoad) {
//                 return $ocLazyLoad.load([
//                 	'app/modules/coverage/coverageDefectsCtrl.js', 
// 					'app/modules/coverage/coverageService.js',
// 					'app/modules/directives/customDirectives.js'
//     			]);
//             }]
//         }
//    })
      
   /* testEffectiveness*/
   $ocLazyLoadProvider.config({
      debug: true,
      events: true
    });

}]);

ppeApp.run(function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});


ppeApp.controller('navCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.isLinkOpen = true;
}]);


ppeApp.service('appService', ['$http', '$q', function ($http, $q) {
    var service = {
        businessDate : getBusinesDate
    }

    function getBusinesDate() {
        return new Date().getTime();
    }

    return service;
}]);

ppeApp.controller('appCtrl', ['$scope', '$location', function($scope, $location, $locale, tmhDynamicLocale, $rootScope) {
    var language = window.navigator.userLanguage || window.navigator.language;
    //$rootScope.$locale = $locale;
    // if(language && language !== undefined) {
    //     tmhDynamicLocale.set('en-Us');
    //     tmhDynamicLocale.set(language);
    // } else {
    //     tmhDynamicLocale.set('en-Us');
    // }
}]);