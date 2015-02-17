
var tpaConfigModule = angular.module('tpaConfigModule', ['tpaAPI'])

.controller('tpaConfigCtrl', ['$scope', '$rootScope', 'tpaAPI', function($scope, $rootScope, tpaAPI){

  $scope.$emit('headerLinkChange', 'settingsLink');

  $scope.cards = tpaAPI.getCards().cards;

  $('ul.config-list').on('click', 'li .slider-toggle', function(){
    var cardId = $(this).closest('li').attr('id').match(/\d+/)[0];
    if(!$(this).hasClass('active')){
      $(this).addClass('active');
      // Fire event here for model to change
      setCardVisibility(cardId, true);
    } else {
      $(this).removeClass('active');
      // Fire event here for model to change
      setCardVisibility(cardId, false);
    }
  });

  // Move model logic to the model
  function setCardVisibility(id, visible){
    var showing = (visible) ? 'visible!' : 'hidden!';
    var type = (visible) ? 'success' : 'warning';
    $rootScope.$broadcast('newNotification', {type: type, title: 'Card Changed!', message: getCard(id).title + 'Is now ' + showing });
    getCard(id).visible = visible;
  }

  function getCard(id){
    for(i=0; i< $scope.cards.length; i++){
      if($scope.cards[i].id === parseInt(id, 10)){
        return $scope.cards[i];
      }
    }
    return -1;
  }

}]);