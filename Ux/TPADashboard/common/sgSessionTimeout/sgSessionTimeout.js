var sessionTimeoutModule = angular.module('sessionTimeoutModule', ['ui.router', 'sgTokenAuth'])
.service('sessionTimeout', function($rootScope, $interval, $timeout, $state, $http, $window, authenticationSvc) {
  var refreshTimer,
      actionTimer,
      warningTimer,
      hasWarningTimer = true,
      warningInterval = 60000;


  this.clearSessionRefreshTimer = function(){
    $interval.cancel(refreshTimer);
    return this;
  };

  this.clearSessionActionTimer = function(){
    $interval.cancel(actionTimer);
    return this;
  };

  this.clearSessionTimers = function(){
    this.clearSessionRefreshTimer().clearSessionActionTimer();
    removeActiveUserListener();
    return this;
  };

  this.refreshServerSession = function(){
    $http.defaults.headers.get = { 'X-GUID' : authenticationSvc.getUserInfo().GUID, 'X-Token' : authenticationSvc.getUserInfo().accessToken }
    $http({method: 'GET', url: 'http://reljaxsvraweb01/tpadashboard191/api/login/refresh'}).
      success(function(data, status, headers, config) {
      }).
      error(function(data, status, headers, config) {
        $state.go('login.login');
      });
    return this;
  };

  this.startSessionRefreshTimer = function(time){
    timeoutInterval(time);
    console.log('timeout:', timeoutInterval());
    bindActiveUserListener();
    setWarningInterval();
    refreshTimer = $interval(function(){
      this.refreshServerSession();
    }, timeoutInterval());
    return this;
  }
  // private functions

  var bindActiveUserListener = function(){
    if(window.addEventListener) {
      document.body.addEventListener("keydown", resetSessionActionTimer, false);
      document.body.addEventListener('mousedown', resetSessionActionTimer, false);
      document.body.addEventListener('mousemove', resetSessionActionTimer, false);
      document.body.addEventListener('mouseup', resetSessionActionTimer, false);
    }
    else if(window.attachEvent) {
      document.body.attachEvent("keydown", resetSessionActionTimer);
      document.body.attachEvent('onmousedown', resetSessionActionTimer);
      document.body.attachEvent('onmousemove', resetSessionActionTimer);
      document.body.attachEvent('onmouseup', resetSessionActionTimer);
    }
  };

  var removeActiveUserListener = function(){
    if(window.addEventListener) {
      document.body.removeEventListener("keydown", resetSessionActionTimer, false);
      document.body.removeEventListener('mousedown', resetSessionActionTimer, false);
      document.body.removeEventListener('mousemove', resetSessionActionTimer, false);
      document.body.removeEventListener('mouseup', resetSessionActionTimer, false);
    }
    else if(window.attachEvent) {
      document.body.detachEvent("keydown", resetSessionActionTimer);
      document.body.detachEvent('onmousedown', resetSessionActionTimer);
      document.body.detachEvent('onmousemove', resetSessionActionTimer);
      document.body.detachEvent('onmouseup', resetSessionActionTimer);
    }
  }

  function setWarningInterval(){
    if(timeoutInterval() <= 120000 ){ // less than or equal to 2 minutes
      hasWarningTimer = false;
    } else {
      if( timeoutInterval() <= 300000 ) {  // less than or equal to 5 minutes (greater than 2 minutes)
        hasWarningTimer = true;
        warningInterval = 60000;
      } else { // greater than 5 minutess
        hasWarningTimer = true;
        warningInterval = 120000;
      }
    }
  };
  
  function resetSessionActionTimer(){  
    if(actionTimer){ 
      $timeout.cancel( actionTimer );
      if(hasWarningTimer){
        $timeout.cancel( warningTimer );
      }
    }
    actionTimer = $timeout( function(){
      $state.go('logout');
    }, timeoutInterval());
    if(hasWarningTimer){
      warningTimer = $timeout( function(){
        $rootScope.$broadcast('newNotification', {type: 'warning', title: 'Inactive!', message: 'You are inactive and will be logged out in '+ (warningInterval/1000) +' seconds' });
      }, timeoutInterval() - warningInterval);
    }
  };

  function timeoutInterval(time){
    var timeoutInterval = 6000000;
    if(time){
      timeoutInterval = (time) ? (time * 0.9) : timeoutInterval;
      $window.sessionStorage["timeoutInterval"] = JSON.stringify(timeoutInterval);
      return timeoutInterval;
    } else {
      timeoutInterval = (JSON.parse($window.sessionStorage["timeoutInterval"])) ? parseInt(JSON.parse($window.sessionStorage["timeoutInterval"])) : timeoutInterval;
      return timeoutInterval;
    }
  };

});
