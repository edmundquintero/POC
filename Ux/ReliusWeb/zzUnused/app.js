
var testApp = angular.module('testApp', ['common', 'reliusLoginModule',  'ngAnimate', 'ui.router']);

/*
  Login API service to retrieve and hold login parameters from an API.

  TODO: Add a function to check the datetime parameter to see if I
        need to refresh the data from the API.
*/

testApp.run(function($rootScope) {
    $rootScope.pageTitle = '';
    $rootScope.customLinks = [];
})


testApp.factory('optionsService', function($http) {
  var promise;

  var booleanParse = function(string){
      if(string == 'Y' || string == 'TRUE'){
        return true;
      }
      else if (string == 'N' || string == 'FALSE'){
        return false;
      }
      else{
        return string;
      }
    };

  var loginService = {

    async: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('http://reljaxsvraweb01/reliusweb/api/Site/Options').then(function (response) {
          // http://reljaxw7johnr.internal.sungard.corp/webapi191/api
          // http://reljaxw7johnr.internal.sungard.corp/WebAPI190/api/Site/Options
          // http://reljaxw7johnr.internal.sungard.corp/webapi191/api/login/participant

          for(param in response.data.OPTIONS.LOGIN) {
            response.data.OPTIONS.LOGIN[param] = booleanParse(response.data.OPTIONS.LOGIN[param]);
          }

          console.log('calling options API', response.data.OPTIONS.LOGIN);
          return response.data.OPTIONS.LOGIN;
        });
      }

      // Return the promise to this controller so we do not call the API every time.
      return promise;
    }

  };
  return loginService;

});


  /*
    Login API service to retrieve and hold role specific login parameters from an API.
  */

testApp.factory('roleLoginService', function($http) {
  var promise,
      loginRole;
  var loginService = {

    async: function(role) {
      if ( !promise || loginRole != role ) {
        // $http returns a promise, which has a then function, which also returns a promise

        promise = $http.get('http://reljaxsvraweb01/reliusweb/api/Site/CustomText?AreaID='+ role +'&PlanID=&LanguageCd=ENG').then(function (response) {

          console.log('calling role specific login API');
          // Set role for evaluation for re-calling the API
          loginRole = role;

          // The 'then' function here is where we can modify the response object
          role = role.split(' ').join('_');
          // Assign role value to return data
          response.data[role].ROLENAME = role;

          // The return value gets picked up by the 'then' function in the controller that called it.
          return response.data[role];
        }, function(error){
          // Return if error to use default vlaues
          return error;
        });
      }

      // Return the promise to this controller so we do not call the API every time.
      return promise;
    }

  };
  return loginService;
});
