var loginModule = angular.module('loginModule', ['sgTokenAuth', 'sgUser', 'serverOptionsModule', 'sessionTimeoutModule'])

.directive('loginPanel', function(){
  return {
    restrict: 'EA',
    scope: true
  };
})
.controller('loginCtrl', ['$scope', '$rootScope', '$state', '$http', 'authenticationSvc', 'serverOptionsSvc', 'sessionTimeout', 'sgUser', function($scope, $rootScope, $state, $http, authenticationSvc, serverOptionsSvc, sessionTimeout, sgUser){

  $scope.pageClass = 'face front loginPanel';
  $rootScope.pageTitle = ' | Login';

  if($state.params.role){
    $state.params.role = $state.params.role.charAt(0).toUpperCase() + $state.params.role.slice(1);
  } else{
    $state.params.role = 'Participant';
  }

  var login = {
    greeting:             'Sign In',
    hasLoginInfo:         true,
    hasLanguageSelection: true,
    loginInfoLink:        '/testApp/#/',
    forgotPassword:       'Forgot?',
    selectedLanguage:     'english',
    usernameLabel:        'Username',
    passwordLabel:        'Password',
    roleLabel:            'Role..'
  };
  
  /*
  *  Add the properties of Login to $scope
  */
  function addLoginToScope(login){
    for (var attrname in login) { $scope[attrname] = login[attrname]; }
    return $scope;
  }
  addLoginToScope(login);

  serverOptionsSvc.async().then(function(data) {
    
  });

  /*
   *  Role Specific Login Service
   *  Use service to get role specific data from API
   */

  // roleLoginService.async($state.params.role).then(function(d) {
    
  //   if (d.WELCOME) { login.greeting = d.WELCOME; }
    /* 
      add API parameters to the login model
     */

  //   addLoginToScope(login);
   
  // });

  // Called on login form submit.
  $scope.submit = function(){

    var loginForm = getFormObj($('form[name=loginForm]'));

  /**  TPA Login
    *  http://reljaxw7johnr.internal.sungard.corp/webapi191/api/login/tpa
    *  {"UserNam":"PhuLe","PasswdTxt":"png","DropUser":false}
    */

  /** Participant Login
    * http://reljaxw7johnr.internal.sungard.corp/webapi191/api/login/participant'
    * {"UserNam":"Phul101","PasswdTxt":"su1996","DropUser":true}
    **/

    authenticationSvc.login(loginForm.username, loginForm.password, 'http://reljaxsvraweb01/tpadashboard191/api/login/tpa').then(function(result){
      console.log( 'after auth service',  result);

      if(result.status == 200){
        sgUser.newUser({firstName: result.data.Admin.FirstNam, lastName: result.data.Admin.LastNam});

        sessionTimeout.startSessionRefreshTimer(parseInt(serverOptionsSvc.getServerOptions().Timeout, 10)*60000);
        // sessionTimeout.startSessionRefreshTimer(5000);
        $state.go('tpaDashboard.tpaDash');

      }
        // Set headers and call for plan statistics

        // $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken }

        // $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/tpadashboard/PlanStatistics?Planid=DVCTEST'}).
        // // $http({method: 'GET', url: '/api/tpadashboard/PlanStatistics?Planid=DVCTEST'}).
        //   success(function(data, status, headers, config) {
        //     console.log(' Plan Stats DATA:', data);
        //     // this callback will be called asynchronously
        //     // when the response is available
        //   }).
        //   error(function(data, status, headers, config) {
        //     // called asynchronously if an error occurs
        //     // or server returns response with an error status.
        //   });
        // }
      
    });


  //   $http.post('http://reljaxsvraweb01/reliusweb/api/login/tpa', {
  //               "UserNam": loginForm.username,
  //               "PasswdTxt": loginForm.password,
  //               "DropUser":true
  //             })
  //   .success(function(data){

  //     $rootScope.currentUser.GUID = data.WebSession.GUID;
  //     $rootScope.currentUser.Token = data.WebSession.Token;

  //     $state.go('tpaDashboard.tpaDash');

      
  //     console.log("Post data Success:", data);
  //     console.log("currentUser: ", $rootScope.currentUser);

  //     $http.defaults.headers.get = { 'X-GUID' : $rootScope.currentUser.GUID, 'X-Token' : $rootScope.currentUser.Token }

  //     $http({method: 'GET', url: 'http://reljaxsvraweb01/reliusweb/api/tpadashboard/PlanStatistics?Planid=DVCTEST'}).
  //       success(function(data, status, headers, config) {
  //         console.log(' Plan Stats DATA:', data);
  //         // this callback will be called asynchronously
  //         // when the response is available
  //       }).
  //       error(function(data, status, headers, config) {
  //         // called asynchronously if an error occurs
  //         // or server returns response with an error status.
  //       });

  //     // $state.go('summary');

  //     // $('body').append('<form style="display: none;" name="hiddenLogin" action="http://reljaxsvraweb01/reliusweb/default.aspx" method="POST">'+
  //     //   '<input name="SUTSTOKEN360" value="'+data.WebSession.Token+'">'+
  //     //   '<input name="GUID360" value="'+data.WebSession.GUID+'">'+
  //     //   '<input name="TRUELOGINPAGE" value="/tpa/#/login/">'+
  //     //   '<input name="ERRORLOGINPAGE" value="/tpa/#/login/">'+
  //     //   '<input name="LANGUAGE" value="ENG">'+
  //     //   '</form>' );

  //     // $('form[name=hiddenLogin]').submit();

  //   })
  //   .error(function(data){
  //     $rootScope.$broadcast('newNotification', {type: 'error', title: 'Failed Login', message: data});
  //     console.log("Post data Error", data);
  //   });

   };

  // getFormObj serializes a form and returns an object.
  var getFormObj = function(formId) {
    var formObj = {},
        inputs = $(formId).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
  };

}]);