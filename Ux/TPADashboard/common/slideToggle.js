'use strict';

angular.module('suxSlideToggle', [])
  .directive('slideToggle', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/slideToggle.html',
      scope: {
        ngModel:      '=',
        name:         '@',
        optOneText:   '@',
        optOneValue:  '@',
        optTwoText:   '@',
        optTwoValue:  '@'
      },
      controller: function ($scope) {
        // Set a default, otherwise nothing selected
        $scope.ngModel = $scope.optOneValue;

        // Called when the user clicks on the actual toggle switch
        $scope.toggle = function () {
          $scope.ngModel = ($scope.ngModel === $scope.optOneValue)
            ? $scope.optTwoValue
            : $scope.optOneValue;
        };
      }
    };
  });
