var ribbonModule = angular.module('ribbonModule', [])

.directive('ribbon', function(){
  return {
    restrict: 'EA',
    scope: false,
    transclude: true,
    templateUrl: 'tpaLogin/ribbon/ribbon.html',
    controller: ['$scope', function($scope){
     
      $scope.company = {
        title: 'Relius',
        link: ''
      };
    }],
    controllerAs: 'ribbonCtrl'
  };

});