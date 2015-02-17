var serverOptionsModule = angular.module('serverOptionsModule', [])
.factory('serverOptionsSvc', function($http) {
  var promise,
      serverOptions = {};


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

    url: '',

    async: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('http://reljaxsvraweb01/reliusweb/api/Site/siteOptions').then(function (response) {
          // http://reljaxw7johnr.internal.sungard.corp/webapi191/api
          // http://reljaxw7johnr.internal.sungard.corp/WebAPI190/api/Site/Options
          // http://reljaxw7johnr.internal.sungard.corp/webapi191/api/login/participant

          for(param in response.data) {
            response.data[param] = booleanParse(response.data[param]);
          }
          serverOptions = response.data;

          console.log('calling options API', response.data);
          return response.data;
        });
      }

      // Return the promise to this controller so we do not call the API every time.
      return promise;
    },

    getServerOptions: function (){
      return serverOptions;
    }

  };
  return loginService;

});
