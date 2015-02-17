/*
 *  LOGIN MODULE
 */
var reliusLoginModule = angular.module('reliusLoginModule', ['footerModule', 'loginModule', 'newuserModule', 'ribbonModule', 'forgotPasswordModule', 'ui.router'])

.config( function( $stateProvider, $urlRouterProvider ) {

$urlRouterProvider.otherwise("/");

$stateProvider.
  state('login', {
    abstract: true,
    url: '/login',
    views:{
      'page': {
        templateUrl: 'reliusLogin/reliusLogin.html',
        controller: ['$scope', function($scope){
          $scope.basePath = 'reliusLogin/';
        }]
      }
    }
  }).
    state('login.newuser', {
      url: '/newuser',
      views: {
        'card':{
          templateUrl: 'reliusLogin/newuser/newuser-panel.html',
          controller: 'newuserCtrl'
        }
      }
    }).
    state('login.login', {
      url: '',
      views: {
        'card':{
          templateUrl: 'reliusLogin/login/login-panel.html',
          controller: 'loginCtrl'
        }
      }
    }).
    state('login.rolelogin', {
      url: '/:role',
      views: {
        'card':{
          templateUrl: 'reliusLogin/login/login-panel.html',
          controller: 'loginCtrl'
        }
      }
    }).
    state('summary', {
      url: '/summary',
      views: {
        'page':{
          templateUrl: 'reliusSummary/summary.html'
        }
      }
    });
});
