var tpaAPI = angular.module('tpaAPI', [])
  .factory('tpaAPI', ['$http', function($http) {

  var urlBase = '';
  var tpaAPI = {};

  var localAPI = { "cards":[
    {"id": 2, "title": "My Top Ten",                "name": "My_Top_Ten",                "size": "medium",  "order": 1, "visible": true},
    {"id": 3, "title": "Terminated Employees",      "name": "Terminated_Employees",      "size": "medium",  "order": 2, "visible": true},
    {"id": 1, "title": "Eligible Employees",        "name": "Eligible_Employees",        "size": "medium",  "order": 3, "visible": true},
    {"id": 4, "title": "Investment Rate",           "name": "Investment_Rate",           "size": "small",   "order": 4, "visible": true},
    {"id": 5, "title": "Fee Revenue",               "name": "Fee_Revenue",               "size": "small",   "order": 5, "visible": true},
    {"id": 6, "title": "Investment Rate Change",    "name": "Investment_Rate_Change",    "size": "small",   "order": 6, "visible": true},
    {"id": 8, "title": "System Participant",        "name": "System_Participant",        "size": "small",   "order": 8, "visible": true},
    {"id": 9, "title": "Participant Balance",       "name": "Participant_Balance",       "size": "small",   "order": 9, "visible": true},
    {"id": 10,"title": "Default Investment",        "name": "Default_Investment",        "size": "small",   "order": 10,"visible": true},

    

    {"id": 24, "title": "Participant Count Data",  "name": "Participant_Count_Data",    "size": "medium",  "order": 24, "visible": true},
    {"id": 25, "title": "Balance Data",            "name": "Balance_Data",              "size": "small",   "order": 25, "visible": true},
    {"id": 26, "title": "Default Investment Data", "name": "Default_Investment_Data",   "size": "small",   "order": 26, "visible": true},
    {"id": 27, "title": "Participant Status Data",  "name": "Participant_Status_Data",  "size": "small",   "order": 28, "visible": true}
    ]};


  tpaAPI.getCards = function () {
    return localAPI;
  };

  tpaAPI.putCard = function (card) {
    for( item in localAPI.cards){
      if( card.id == item.id ){
        item = card;
      }
    }
  };

  tpaAPI.putCards = function (cards) {
    localAPI.cards = localAPI.cards.concat(cards);
    var a = localAPI.cards;
    for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    console.log(localAPI.cards);    
  };

  return tpaAPI;
}]);