
var tpaDashModule = angular.module('tpaDashModule', ['angular-packery',
                                                     'tpaAPI',
                                                     'My_Top_Ten',
                                                     'Terminated_Employees',
                                                     'Eligible_Employees',
                                                     'Investment_Rate',
                                                     'Investment_Rate_Change',
                                                     'Fee_Revenue',
                                                     'System_Participant',
                                                     'Participant_Balance',
                                                     'Default_Investment'])

.controller('tpaDashCtrl', ['$scope', '$rootScope', 'tpaAPI', function($scope, $rootScope, tpaAPI){

  $scope.$emit('headerLinkChange', 'dashLink');

  $scope.cards = onlyShowVisibleCards(tpaAPI.getCards().cards).sort(function(a, b) {
    return a.order - b.order;
  });

  $scope.$on('saveCardLayout', function(){
    console.log('Saving...');
  });

  $rootScope.$on('layoutComplete', function(event, packery){
    console.log('EVENT', packery);
  });

  $rootScope.$on('newPackeryCreated', function(event, packery){
    packery.on( 'dragItemPositioned', orderItems );
  });


  function onlyShowVisibleCards(newCards){
    var viewableCards = [];
    for(i=0; i<newCards.length; i++){
      if(newCards[i].visible){
        viewableCards.push(newCards[i]);
      }
    }
    return viewableCards;
  }

  function orderItems() {
    var getId = /\d+/;
    var itemElems = $rootScope.packery.getItemElements();
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var domId = $(itemElems[i]).attr('id').match(getId)[0];
      var order = i+1;
      setCardOrder(domId, order);
    }
  }

  function setCardOrder(id, order){
    getCard(id).order = order;
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
