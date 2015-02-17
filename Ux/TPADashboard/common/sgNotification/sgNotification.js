var notificationModule = angular.module('notificationModule', [])

/*
  
  USER NOTIFICATION MODULE

  NOTE: This module does not allow for more than one notification in the view at a time.
        it is meant to be more of a user notification system than a persistant messages feature.

*/

.directive('notification', function(){
  return {
    restrict: 'EA',
    transclude: true,
    templateUrl: 'common/sgNotification/sgNotification.html',
    scope: true,
    controller: ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope){
    
      // Default values for notification array.
      $scope.notifications = [];

      $scope.notificationTest = null;

      // Event listener for 'newNotification' events at the rootScope level.
      $rootScope.$on('newNotification', function(event, data){



        // Test for a new notification in the array.
        if( !$scope.notifications.length ){
          $('div[notification]').show(500);
          $scope.notifications.push({alert: true, type: data.type, title: data.title, message: data.message});
          $scope.$apply();
          $scope.slideDown();
        }

        //Replace existing Notifications in the array.
        else{
          // Clear the notifications array
            $('div[notification] .row').hide(0);
            
            // Tell angular there has been a change to the notifications model and the DOM needs updated.
            $scope.notifications = [];
            // Add the notification to the array so that angular triggers a ngRepeat model change
            
            // Tell angular that a model need to be updated in the DOM without direct interaction.
            $scope.notifications.push({alert: true, type: data.type, title: data.title, message: data.message});
            $('div[notification] .row').delay(300).show(0);
            window.setTimeout(function(){
              $scope.$apply();
              $scope.slideDown();
            }, 10);
            // $scope.$apply();
        }
      });

      // Event listener for 'clearNotification' events at the rootScope level.
      $rootScope.$on('clearNotification', function(event, data){
        $scope.closeNotification();
      });

      // Clear notifications on rout araw from login
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(fromState.name == 'login.login'){
          $scope.closeNotification();
        }
      });


      // Remove notification from array
      $scope.closeNotification = function(callback) {
        $scope.notifications = [];
        
        window.setTimeout(function(){
          $scope.slideUp();

          callback = (typeof callback == 'function') ? callback : function(){};
          callback();

        }, 300);
      };

      /*
          slideDown calculates the height of the notification that is 
          being injected into the template and then adjusts the min and max-height.

          NOTE: min and max-height are used because transition effects have cross platform
          issues with animating from a height of 0.
      */

      $scope.slideDown = function(){
        var newHeight = $('div[notification] .notification').height() + 50;
        $('div[notification]').css({
                                'max-height': newHeight+'px',
                                'min-height': newHeight+'px'
                              });
      };

      // Returns the min and  max-height to 0.
      $scope.slideUp = function(){
        $('div[notification]').css({
                                'max-height': '0px',
                                'min-height': '0px'
                              });
      };

    }],

    controllerAs: 'notificationCtrl'

  };
});
