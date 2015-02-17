var footerModule = angular.module('sgfooter', ['ui.bootstrap'])

.directive('sgfooter', function(){
  return {
    restrict: 'EA',
    transclude: true,
    scope:{
      copywright: '='
    },
    // templateUrl : 'partials/sgfooter/sgfooter.html',
    templateUrl : 'tpaLogin/footer/footer.html',
    controller: function($scope, $element){
      $scope.status = {
        isopen: false
      };
      // Default links for the application
      $scope.helpLinks = [
        // { name: 'Browser Support', href: '#/', title: 'Information about your browser and features.'},
        // { name: 'New User', href: '#/'},
        // { name: 'Forgot ID or Password?', href: '#/', title: 'Reset your password and used ID.'}
      ];

      // Mock custom Links retrieved from API service
      var customLinks = [
            { name: 'Link 1', href: '#/'},
            { name: 'Link 2', href: '#/'},
            { name: 'Link 3', href: '#/'},
            { name: 'Link 4', href: '#/'}
      ];
      // Add custom links to the menu
      if(customLinks){
        $scope.helpLinks = $scope.helpLinks.concat(customLinks);
      }
    },
  };
});
