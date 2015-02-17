var newuserModule = angular.module('newuserModule', [])

.controller('newuserCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.pageClass = 'newuserPanel';

  $rootScope.pageTitle = ' | NewUser';

  $scope.greeting = 'Enter Plan Password';
  $scope.selectedLanguage = 'english';
/*
   stuff for new users.....

*/
}]);