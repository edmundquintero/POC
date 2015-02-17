var tpaDashModule = angular.module('Terminated_Employees', ['sgTokenAuth'])

.controller('Terminated_EmployeesCtrl', ['$scope', '$rootScope', '$timeout', 'Terminated_EmployeesSvc', function($scope, $rootScope, $timeout, Terminated_EmployeesSvc){

  $scope.data_store = {};
  $scope.terminatedEmployees = {
    sortBy: '"PLANNAM"',
    title: 'Terminated Employees',
    headers: [{'name': 'Plan ID'}, {'name': 'Plan Name'}, {'name': 'Balance => $5k'}, {'name': 'Balance < $5k'}],
    rows: []
  };

  Terminated_EmployeesSvc.getTerminated_Employees().then(function (data) {
    // Done
    $scope.terminatedEmployees.rows = data.terminatedEmployees;
  }, function () {
    // Error
  });
}])
.service('Terminated_EmployeesSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken }

  var data_store = {
    terminatedEmployees: null
  };

  return {
    getTerminated_Employees: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.terminatedEmployees){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/TermEEs'}).
        success(function(data, status, headers, config) {
          data_store.terminatedEmployees = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }

      return d.promise;
    }
  }

});
