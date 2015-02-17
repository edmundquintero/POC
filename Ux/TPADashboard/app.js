
var tpaApp = angular.module('tpaApp', [ 'tpaLoginModule',
                    'tpaDashboardModule',
                    'tpaConfigModule',
                    'tpaDashModule',
                    'sgCard',
                    'filters',
                    'suxSlideToggle',
                    'notificationModule',
                    'sessionTimeoutModule',
                    'serverOptionsModule',
                    'ngAnimate',
                    'ui.router'
                     ]);

tpaApp.run(function($rootScope, $state, sessionTimeout, authenticationSvc) {
  $rootScope.pageTitle = '';
  $rootScope.appTitle = 'TPA Dashboard';

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate && !authenticationSvc.isAuthenticated()){ //check for authentication (is there a session)
      $state.transitionTo("login.login");
      event.preventDefault();
    } else {
      if(toState.data.authenticate){
        sessionTimeout.refreshServerSession().clearSessionTimers().startSessionRefreshTimer();
      }
    }
  }); 


});
