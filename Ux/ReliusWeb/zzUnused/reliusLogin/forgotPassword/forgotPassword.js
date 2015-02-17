var forgotPasswordModule = angular.module('forgotPasswordModule', ['ui.router'])


.config( function( $stateProvider, $urlRouterProvider ) {
  $stateProvider.
      state('login.forgot', {
        url: '/forgot',
        views: {
          'card':{
            templateUrl: 'reliusLogin/forgotPAssword/forgotPassword-panel.html',
            controller: 'forgotPasswordCtrl'
          }
        }
      });
})


.directive('forgotPassword', function(){
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: 'forgotPassword/forgotPassword-panel.html'
  };

})
.controller('forgotPasswordCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.pageClass = 'forgotPasswordPanel';

  $rootScope.pageTitle = ' | Password Recovery';

  $scope.greeting = 'Password Recovery';
  $scope.selectedLanguage = 'english';
  $scope.ssnumLabel = 'Social Security Number';
  $scope.fnameLabel = 'First Name';
  $scope.lnameLabel = 'Last Name';
  $scope.roleLabel = 'Role..';
  $scope.roles = [
                  { name: 'Participant',  value: 'participant' },
                  { name: 'Sponsor',      value: 'sponsor'     },
                  { name: 'Advisor',      value: 'advisor'     }
                ];

}]);