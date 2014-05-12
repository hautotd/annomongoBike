angular.module('velibApp', ['ui.bootstrap'])
.controller('mainCtrl', function($scope, $http) {
    $scope.inputValue = '';
    $scope.searchForStations = function(){
    console.debug($scope.inputValue);
    if(!$scope.inputValue){
        console.debug('No value entered');
        return;
    }
        $http({
			method : 'get',
			url : 'http://localhost:8080/api/stations/byname/' + $scope.inputValue
		}).success(function(data, status, headers, config) {
             $scope.foundStations = data;
			console.debug(data);
		}).error(function(data) {
           
			console.debug('oh snap');
		});
    
}});