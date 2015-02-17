// 'use strict';

var sgCard = angular.module('sgCard', [])
  .directive('sgCard', function () {
    return {
      restrict: 'EA',
      template: '<div class="card {{ cardName }}" id="card_{{ card.id }}" ng-include="\'tpaDash/sgCard/\' + cardName + \'/\' + cardName + \'.html\'"></div>',
      scope: {
        cardName: '@'
      }
    };
  });
