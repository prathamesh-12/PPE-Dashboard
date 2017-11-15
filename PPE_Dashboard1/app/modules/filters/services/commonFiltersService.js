//var qtronApp = angular.module('qtronApp', []);
(function(ppeApp){

ppeApp.service('commonFiltersService', ['$http', '$q', function ($http, $q) {

    var service = {
        getFiltersTableData : getFiltersTableData,
        getFormattedDate: getFormattedDate,
        dateDiffInDays: dateDiffInDays
    };

    function getFiltersTableData(filterUrl) {
        var deferred = $q.defer();
        var filterDataAjaxURL = 'app/modules/filters/json/inspectionsDue.json'; //Need to add api call

        var config = {
                       headers : {
	                       'Content-Type': 'application/json;charset=utf-8;'
	                   }
	    };

        $http({
                method: 'GET',
                url: filterDataAjaxURL,
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

    function getFormattedDate(date) {
        var datearray = date.split("/");
        var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        return newdate;
    }

    function dateDiffInDays(b) {
        var a = new Date();
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return  Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
   

    return service;
}]);
}(window.ppeApp));