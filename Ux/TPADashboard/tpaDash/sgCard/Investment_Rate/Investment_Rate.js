var tpaDashModule = angular.module('Investment_Rate', ['sgTokenAuth'])

.controller('Investment_RateCtrl', ['$scope', '$rootScope', '$timeout', 'Investment_RateSvc', function($scope, $rootScope, $timeout, Investment_RateSvc){

  $scope.data_store = {};
  $scope.investmentRate = {
    sortBy: '"ROW1"',
    title: 'Investment Rate',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  Investment_RateSvc.getInvestment_Rate().then(function (data) {
    // Done
    $scope.investmentRate.rows = data.investmentRate;
  }, function () {
    // Error
  });
}])
.service('Investment_RateSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };

  var data_store = {
    investmentRate: null
  };

  return {
    getInvestment_Rate: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.investmentRate){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/PlanStatistics'}).
        success(function(data, status, headers, config) {
          console.log('investment_rate', data);
          data_store.investmentRate = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }
      // data_store.investmentRate = [{ROW1:"one"},{ROW2:"two"},{ROW3:"three"}];
      // done();

      return d.promise;
    }
  }

});
