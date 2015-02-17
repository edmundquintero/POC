var tpaDashModule = angular.module('Participant_Balance', ['sgTokenAuth'])

.controller('Participant_BalanceCtrl', ['$scope', '$rootScope', '$timeout', 'Participant_BalanceSvc', function($scope, $rootScope, $timeout, Participant_BalanceSvc){

  $scope.data_store = {};
  $scope.participantBalance = {
    sortBy: '"ROW1"',
    title: 'Participant Balance',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  Participant_BalanceSvc.getParticipant_Balance().then(function (data) {
    // Done
    $scope.participantBalance.rows = data.participantBalance;
  }, function () {
    // Error
  });
}])
.service('Participant_BalanceSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };

  var data_store = {
    participantBalance: null
  };

  return {
    getParticipant_Balance: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.participantBalance){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/PlanStatistics'}).
        success(function(data, status, headers, config) {
          console.log('particiapnt_balance', data);
          data_store.participantBalance = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }
      // data_store.participantBalance = [{ROW1:"one"},{ROW2:"two"},{ROW3:"three"}];
      // done();

      return d.promise;
    }
  }

});
