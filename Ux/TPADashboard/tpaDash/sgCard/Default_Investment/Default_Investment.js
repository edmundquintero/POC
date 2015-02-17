var tpaDashModule = angular.module('Default_Investment', ['sgTokenAuth'])

.controller('Default_InvestmentCtrl', ['$scope', '$rootScope', '$timeout', 'Default_InvestmentSvc', function($scope, $rootScope, $timeout, Default_InvestmentSvc){

  $scope.data_store = {};
  $scope.defaultInvestment = {
    sortBy: '"ROW1"',
    title: 'Default Investment',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  Default_InvestmentSvc.getDefault_Investment().then(function (data) {
    // Done
    $scope.defaultInvestment.rows = data.defaultInvestment;
  }, function () {
    // Error
  });
}])
.service('Default_InvestmentSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };
  // __http://reljaxw7johnr.internal.sungard.corp/webapi191/api//tpadashboard/PlanStatistics

  var data_store = {
    defaultInvestment: null
  };

  return {
    getDefault_Investment: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.defaultInvestment){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/PlanStatistics'}).
        success(function(data, status, headers, config) {
          console.log('default_Investment', data)
          data_store.defaultInvestment = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }
      // data_store.defaultInvestment = [{ROW1:"one"},{ROW2:"two"},{ROW3:"three"}];
      // done();

      return d.promise;
    }
  }

});
