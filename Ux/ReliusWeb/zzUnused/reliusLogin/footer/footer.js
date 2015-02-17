var footerModule = angular.module('footerModule', ['ui.bootstrap'])

.directive('suxfooter', function(){
  return {
    restrict: 'EA',
    transclude: true,
    scope:{},
    templateUrl : 'reliusLogin/footer/footer.html',
    controller: ['$rootScope','$scope', function($rootScope, $scope){

      $scope.status = {
        isopen: false
      };

      $scope.defaultLinks = [
            { name: 'Browser Support', href: '/testApp/#/', title: 'Information about your browser and features.'},
            { name: 'New User', href: '/testApp/#/newuser'},
            { name: 'Forgot ID or Password?', href: '/testApp/#/login/forgot', title: 'Reset your password and used ID.'}
      ];
      $scope.customLinks = [
            { name: 'Link 1', href: '/testApp/#/'},
            { name: 'Link 2', href: '/testApp/#/'},
            { name: 'Link 3', href: '/testApp/#/'},
            { name: 'Link 4', href: '/testApp/#/'}
      ];
      $scope.copywright = '2014 SunGard All Rights Reserved';

    }],
    controllerAs: 'footerCtrl'
  };

});