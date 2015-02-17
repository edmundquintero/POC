var loginModule = angular.module('loginModule', [])

.directive('loginPanel', function(){
  return {
    restrict: 'EA',
    scope: true,
    templateUrl: '/reliusweb/testApp/reliusLogin/login/login-panel.html'
  }
})
.controller('loginCtrl', ['$scope', '$rootScope', 'roleLoginService', 'optionsService', '$state', '$http', function($scope, $rootScope, roleLoginService, optionsService, $state, $http){

  $scope.pageClass = 'face front loginPanel';
  $rootScope.pageTitle = ' | Login';

  if($state.params.role){
    $state.params.role = $state.params.role.charAt(0).toUpperCase() + $state.params.role.slice(1);
  } else{
    $state.params.role = 'Participant';
  }

  var login = {
    greeting:             'Welcome',
    hasLoginInfo:         true,
    hasLanguageSelection: true,
    loginInfoLink:        '/testApp/#/',
    forgotPassword:       'Forgot?',
    selectedLanguage:     'english',
    usernameLabel:        'Username',
    passwordLabel:        'Password',
    roleLabel:            'Role..',
    // Default User
    user: {
                  name: '',
                  password: '',
                  userGroup: ''
                },
    roles: [
                    { name: 'Participant',  value: 'participant' },
                    { name: 'Sponsor',      value: 'sponsor'     },
                    { name: 'Advisor',      value: 'advisor'     }
                  ]

  };
  /* Set selected role based on role retrieved from API. */
  for (i=0; i<login.roles.length; i++){
    if( login.roles[i].name == $state.params.role ){
      $scope.selectedRole = login.roles[i];
    }
  }
  addLoginToScope(login);
  /*
  *  Add the properties of Login to $scope
  */
  function addLoginToScope(login){
    for (var attrname in login) { $scope[attrname] = login[attrname]; }
    return $scope;
  }

  optionsService.async().then(function(data) {

    /* add server Options to the scope*/

    data.NEWWEBUSERLINK = true;
    if(!data.NEWWEBUSERLINK){
      $state.transitionTo('login.login');
    }
    $scope.hasLanguage = data.MULTILINGUAL;

  });

  /*
   *  Role Specific Login Service
   *  Use service to get role specific data from API
   */

  roleLoginService.async($state.params.role+' Login').then(function(d) {
    
    if (d.WELCOME) { login.greeting = d.WELCOME; }
    /* 
      add API parameters to the login model
     */

    addLoginToScope(login);
   
  });

  // Called on login form submit.
  $scope.submit = function(){
    var loginForm = getFormObj($('form[name=loginForm]'));
    console.log('Submit: ', loginForm);

    // $http.post('http://reljaxw7johnr.internal.sungard.corp/webapi191/api/login/participant', {"UserNam":"Phul101","PasswdTxt":"su1996","DropUser":true})

    $http.post('http://reljaxsvraweb01/reliusweb/api/login/'+loginForm.userGroup, {
                "UserNam": loginForm.username,
                "PasswdTxt": loginForm.password,
                "DropUser":true
              })
    .success(function(data){
      console.log("Post data Success:", data);
      // $state.go('summary');

      $('body').append('<form style="display: none;" name="hiddenLogin" action="http://reljaxsvraweb01/reliusweb/default.aspx" method="POST">'+
        '<input name="SUTSTOKEN360" value="'+data.WebSession.Token+'">'+
        '<input name="GUID360" value="'+data.WebSession.GUID+'">'+
        '<input name="TRUELOGINPAGE" value="/reliusweb/testApp/#/login/">'+
        '<input name="ERRORLOGINPAGE" value="/reliusweb/testApp/#/login/">'+
        '<input name="LANGUAGE" value="ENG">'+
        '</form>' );

      $('form[name=hiddenLogin]').submit();

      // $http( {method: 'POST' , url: 'http://reljaxsvraweb01/reliusweb/default.aspx', data: {
      //           "SUTSTOKEN360": data.WebSession.Token,
      //           "GUID360": data.WebSession.GUID,
      //           "LANGUAGE": 'ENG'
      //         }});

    })
    .error(function(data){
      $rootScope.$broadcast('newNotification', {type: 'error', title: 'Failed Login', message: data});
      console.log("Post data Error", data);
    });

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