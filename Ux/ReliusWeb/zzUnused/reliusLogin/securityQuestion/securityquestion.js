var newuserModule = angular.module('securityquestionModule', [])
.directive('securityquestionPanel', function(){
  return {
    restrict: 'EA',
    scope: true, 
    templateUrl: 'securityquestion/securityquestion-panel.html'
  }
})
.controller('securityquestionCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.pageClass = 'securityquestionPanel';

  $rootScope.pageTitle = ' | Security';

}]);