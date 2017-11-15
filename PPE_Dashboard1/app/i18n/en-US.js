angular.module("ngLocale", [], ["$provide", function($provide) {
    $provide.value("$locale", {
        "title" : "Hello World"
    });
}]);