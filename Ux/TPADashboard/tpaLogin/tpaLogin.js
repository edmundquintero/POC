/*
 *  LOGIN MODULE
 */
var tpaLoginModule = angular.module('tpaLoginModule', ['sgfooter', 'loginModule', 'ribbonModule',  'ui.router', 'sgTokenAuth', 'sgUser', 'sessionTimeoutModule'])

.config( function( $stateProvider, $urlRouterProvider ) {

$urlRouterProvider.otherwise("/login");

$stateProvider.
  state('login', {
    abstract: true,
    url: '/login',
    views:{
      'page': {
        templateUrl: 'tpaLogin/tpaLogin.html'
      }
    },
    data: {
      authenticate: false
    }
  }).
    state('login.login', {
      url: '',
      views: {
        'card':{
          templateUrl: 'tpaLogin/login/login-panel.html',
          controller: 'loginCtrl'
        }
      },
      data: {
        authenticate: false
      }
    }).
    state('logout', {
      url: '/logout',
      views:{
      'page': {
        templateUrl: 'tpaLogin/tpaLogin.html',
        controller: [ '$rootScope', '$state', '$timeout', 'authenticationSvc', 'sgUser', 'sessionTimeout', function($rootScope, $state, $timeout, authenticationSvc, sgUser, sessionTimeout){
        
          authenticationSvc.logout('http://reljaxsvraweb01/reliusweb/api/login/logout').then(function(result){
            if(result.status != 200){
              $state.go('login.login');
              $timeout(function(){
                $rootScope.$broadcast('newNotification', {type: 'error', title: 'Logout Failed!', message: 'Your session ended unexpectedly. Code: ' + result.status + ' ' + result.statusText });
              }, 500);
            } else{
              sgUser.remove();
              sessionTimeout.clearSessionTimers();
              $state.go('login.login');
              $timeout(function(){
                $rootScope.$broadcast('newNotification', {type: 'success', title: 'Logout Successful!', message: 'You have been successfully logged out!' });
              }, 500);              
            }
          });

        }],
      }
    },
      data: {
        authenticate: true
      }
  });
});
