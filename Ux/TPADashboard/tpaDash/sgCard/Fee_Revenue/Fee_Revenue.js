var tpaDashModule = angular.module('Fee_Revenue', ['sgTokenAuth'])

.controller('Fee_RevenueCtrl', ['$scope', '$rootScope', '$timeout', 'Fee_RevenueSvc', function($scope, $rootScope, $timeout, Fee_RevenueSvc){

  $scope.data_store = {};
  $scope.feeRevenue = {
    sortBy: '"ROW1"',
    title: 'Fee Revenue',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  Fee_RevenueSvc.getFee_Revenue().then(function (data) {
    // Done
    $scope.feeRevenue.rows = data.feeRevenue;
  }, function () {
    // Error
  });
}])
.service('Fee_RevenueSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };

  var data_store = {
    feeRevenue: null
  };

  return {
    getFee_Revenue: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.feeRevenue){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/TransactionStatistics'}).
        success(function(data, status, headers, config) {
          console.log('fee_revenue', data);
          data_store.feeRevenue = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }
      // data_store.feeRevenue = [{ROW1:"one"},{ROW2:"two"},{ROW3:"three"}];
      // done();

      return d.promise;
    }
  };

});
