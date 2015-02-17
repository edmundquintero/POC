
var tpaDashboardModule = angular.module('tpaDashboardModule', ['ui.router', 'sgUser', 'sgTokenAuth'])

.config( function( $stateProvider, $urlRouterProvider ) {

$stateProvider.
  state('tpaDashboard', {
    abstract: true,
    url: '',
    views:{
      'page': {
        templateUrl: 'tpaDashboard/tpaDashboard.html',
        controller: [ '$rootScope', '$scope', 'sgUser', 'authenticationSvc', function($rootScope, $scope, sgUser, authenticationSvc){
          
          $scope.userName = sgUser.fullName();

          $scope.$on('headerLinkChange', function(event, data){
            $scope.headerLink = data;
          });
          $scope.save = function(){
            $rootScope.$broadcast('saveCardLayout');
          };
        }]
      }
    }
  }).
    state('tpaDashboard.tpaDash', {
      url: '/dash',
      views: {
        'view':{
          templateUrl: 'tpaDash/tpaDash.html',
          controller: 'tpaDashCtrl'
        }
      },
      data: {
        authenticate: false
      }
    }).
    state('tpaDashboard.tpaConfig', {
      url: '/config',
      views:{
        'view': {
          templateUrl: 'tpaConfig/tpaConfig.html',
          controller: 'tpaConfigCtrl'
        }
      },
      data: {
        authenticate: false
      }
    });
});
