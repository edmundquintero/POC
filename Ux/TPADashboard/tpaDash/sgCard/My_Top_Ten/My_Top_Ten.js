var tpaDashModule = angular.module('My_Top_Ten', ['sgTokenAuth'])

.controller('My_Top_TenCtrl', ['$scope', '$rootScope', '$timeout', 'My_Top_TenSvc', function($scope, $rootScope, $timeout, My_Top_TenSvc){

  $scope.data_store = {};
  $scope.topTen = {
    sortBy: '"TOTALEMPLOYEES"',
    title: 'My Top Ten',
    type: 'participantCount',
    headers: [{'name': 'Plan ID'}, {'name': 'Plan Name'}, {'name': 'Participant Ct.'}, {'name': 'YTD Fees'}],
    rows: []
  };

  $scope.changeType = function(){
    var toggle = $('.My_Top_Ten .card-content .slider-toggle');
    if($scope.topTen.type == 'participantCount'){
      $(toggle).addClass('active');
      $scope.topTen.type = 'totalAssets';
      changeData();
    } else {
      $(toggle).removeClass('active');
      $scope.topTen.type = 'participantCount';
      changeData();
    }
  };

  function changeData (data_store){
    $scope.topTen.rows = [];
    if($scope.topTen.type == 'participantCount'){
      $scope.topTen.rows = $scope.data_store.totalParticipantCountPromise;
      $scope.topTen.headers[2] = {'name': 'Participant Ct.'};
      $scope.topTen.sortBy = 'ELIGIBLEEMPLOYEES';

    } else {
      $scope.topTen.rows = $scope.data_store.totalAssetsPromise;
      $scope.topTen.headers[2] = {'name': 'Total Assets'};
      $scope.topTen.sortBy = 'TOTALMARKETVALUE';
    }
  }

  My_Top_TenSvc.getTopTen().then(function (data_store) {
    // Done
    $scope.data_store = data_store;
    changeData();
  }, function () {
    // Error
  });
}])

.service('My_Top_TenSvc', function($http, $q, authenticationSvc){

  $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken }

  var data_store = {
      totalAssetsPromise: null,
      totalParticipantCountPromise: null
    };

  return {
    getTopTen: function () {
      var d = $q.defer();

      var firstFinished = false,
          done = function () {
            d.resolve(data_store);
          };

      if(!data_store.totalAssetsPromise){
        $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/RankedWebPlans?FirstNRows=10&RankPlansByEnum=eRankPlansByMarketValue&OrderByEnum=eDescending'}).
        success(function(data, status, headers, config) {
          data_store.totalAssetsPromise = data;
          (!firstFinished) ? firstFinished = true : done();
        }).
        error(function(data, status, headers, config) {
          return d.reject();
        });
      } else {
        (!firstFinished) ? firstFinished = true : done();
      }
      if(!data_store.totalParticipantCountPromise){
          $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/RankedWebPlans?FirstNRows=10&RankPlansByEnum=eRankPlansByEligibleEmployee&OrderByEnum=eDescending'}).
          success(function(data, status, headers, config) {
            data_store.totalParticipantCountPromise = data;
            (!firstFinished) ? firstFinished = true : done();
          }).
          error(function(data, status, headers, config) {
            return d.reject();
          });
      } else {
        (!firstFinished) ? firstFinished = true : done();
      }

      return d.promise;
    }
  }
});
