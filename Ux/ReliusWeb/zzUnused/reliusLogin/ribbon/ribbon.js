var ribbonModule = angular.module('ribbonModule', [])

.directive('ribbon', function(){
  return {
    restrict: 'EA',
    scope: false,
    transclude: true,
    templateUrl: 'reliusLogin/ribbon/ribbon.html',
    controller: ['$scope', function($scope){
     
      $scope.logo = {
        path: '/reliusweb/testApp/images/logo.png',
        title: 'Company Logo',
        link: ''
      };

      $scope.company = { 
        title: 'Application Title',
        link: ''
      };

      $scope.cobrandlogo = {
        path: '/reliusweb/testApp/images/logo.png',
        title: 'Co-Brand Company Logo',
        link: ''
      };

    }],
    controllerAs: 'ribbonCtrl'
  };

});