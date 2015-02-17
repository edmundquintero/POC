var tpaDashModule = angular.module('Eligible_Employees', ['sgTokenAuth'])

.controller('Eligible_EmployeesCtrl', ['$scope', '$rootScope', '$timeout', 'Eligible_EmployeesSvc', function($scope, $rootScope, $timeout, Eligible_EmployeesSvc){

  $scope.data_store = {};
  $scope.eligibleEmployees = {
    sortBy: '"Participationpct"',
    title: 'Eligible Employees',
    headers: [{'name': 'Plan ID'}, {'name': 'Eligible not Participating'}, {'name': 'Participation'}],
    rows: []
  };


  Eligible_EmployeesSvc.getEligible_Employees().then(function (data) {
    // Done
    $scope.eligibleEmployees.rows = data.eligibleEmployees;
  }, function () {
    // Error
  });
}])
.service('Eligible_EmployeesSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken }

  var data_store = {
    eligibleEmployees: null
  };

  return {
    getEligible_Employees: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.eligibleEmployees){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/NewEligEEs?PLANID=ALL'}).
        success(function(data, status, headers, config) {
          data_store.eligibleEmployees = data;
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
