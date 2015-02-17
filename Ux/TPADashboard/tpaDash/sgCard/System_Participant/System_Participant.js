var tpaDashModule = angular.module('System_Participant', ['sgTokenAuth'])

.controller('System_ParticipantCtrl', ['$scope', '$rootScope', '$timeout', 'System_ParticipantSvc', function($scope, $rootScope, $timeout, System_ParticipantSvc){

  $scope.data_store = {};
  $scope.systemParticipant = {
    sortBy: '"ROW1"',
    title: 'System Participant',
    headers: [{'name': 'Col 1'}, {'name': 'Col 2'}, {'name': 'Col 3'}],
    rows: []
  };


  System_ParticipantSvc.getSystem_Participant().then(function (data) {
    // Done
    $scope.systemParticipant.rows = data.systemParticipant;
  }, function () {
    // Error
  });
}])
.service('System_ParticipantSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken };

  var data_store = {
    systemParticipant: null
  };

  return {
    getSystem_Participant: function () {
      var d = $q.defer(),
      done = function () {
            d.resolve(data_store);
          };

      if(!data_store.systemParticipant){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/PlanStatistics'}).
        success(function(data, status, headers, config) {
          console.log('system_Participant', data);
          data_store.systemParticipant = data;
          done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else{
        done();
      }
      // data_store.systemParticipant = [{ROW1:"one"},{ROW2:"two"},{ROW3:"three"}];
      // done();

      return d.promise;
    }
  };

});
