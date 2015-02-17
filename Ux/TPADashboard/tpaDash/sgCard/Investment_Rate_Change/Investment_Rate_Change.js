var tpaDashModule = angular.module('Investment_Rate_Change', ['sgTokenAuth'])

.controller('Investment_Rate_ChangeCtrl', ['$scope', '$rootScope', '$timeout', 'Investment_Rate_ChangeSvc', function($scope, $rootScope, $timeout, Investment_Rate_ChangeSvc){

  $scope.data_store = {};
  $scope.investmentRateChange = {
    sortBy: '"ROW1"',
    title: 'Investment Rate Change',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  Investment_Rate_ChangeSvc.getInvestment_Rate_Change().then(function (data) {
    // Done
    $scope.investmentRateChange.rows = data.investmentRateChange;
  }, function () {
    // Error
  });
}])
.service('Investment_Rate_ChangeSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };

  var data_store = {
    investmentRateChange: null
  };

  return {
    getInvestment_Rate_Change: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.investmentRateChange){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/ContrRateStatistics?Planid=ALL&UseDateRange=True&FromDate=1/1/2014&ToDate=9/11/2014'}).
        success(function(data, status, headers, config) {
          // console.log('contRateStats', data);
          data_store.investmentRateChange = data;
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
  };
});
