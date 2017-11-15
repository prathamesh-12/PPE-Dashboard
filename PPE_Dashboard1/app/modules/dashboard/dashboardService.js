//var qtronApp = angular.module('qtronApp', []);
(function(ppeApp){

ppeApp.service('dashboardService', ['$http', '$q', function ($http, $q) {

    var service = {
        getFiltersCount : getFiltersCount
    };

    function getFiltersCount() {
        var deferred = $q.defer();
        var getFiltersCountURL = 'app/modules/dashboard/json/filtersCount.json'; //Need to add api call

        var config = {
                       headers : {
	                       'Content-Type': 'application/json;charset=utf-8;'
	                   }
	    };

        $http({
                method: 'GET',
                url: getFiltersCountURL,
                config: config
            })
            .success(function (data, status, headers, config) {
                deferred.resolve(data);
            })
            .error(function (errorResp, status, header, config) {
                deferred.reject(errorResp);
            });
            return deferred.promise;
    }
   

    return service;
}]);
}(window.ppeApp));