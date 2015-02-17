 /**
   * @class angular_module.sgUser
   * @memberof angular_module
   */
var sgUser = angular.module('sgUser', [])

 /**
   * Token based authentication service
   * @class sgUser
   * @memberof angular_module.sgUser
   */
.service('sgUser', function($window) {

  var userProfile = {
      firstName: '',
      lastName: '',
      dob: ''
    };

 /**
   * Returns the users full name
   * @function
   * @memberof angular_module.sgUser.User
   * @return {String} The first and last names concatonated.
   */
  this.fullName = function(){
    return userProfile.firstName+' '+userProfile.lastName;
  };

 /**
   * Sets the values for a new user
   * @function
   * @memberof angular_module.sgUser.User
   */
  this.newUser = function(options){
    userProfile.firstName = (options.firstName) ? options.firstName : '';
    userProfile.lastName  = (options.lastName)  ? options.lastName  : '';
    userProfile.dob       = (options.dob)       ? options.dob       : '';
    $window.sessionStorage["userProfile"] = JSON.stringify(userProfile);
  };

  /**
   * Removed the profile information from session storage
   * @function
   * @memberof angular_module.sgUser.User
   * @return {Boolean} Success/Fail
   */
  this.remove = function(){
    $window.sessionStorage.removeItem("userProfile");
    if($window.sessionStorage["userProfile"]){
      return false;
    }
    return true;
  };

  /**
   * Initialization function to run when the sgUser service is called.
   * This function checks the browser memory for a User object. This prevents
   * loss of personal information on page refresh. 
   */
  function init() {
    $window.sessionStorage.removeItem("userProfile");
    console.log($window.sessionStorage["userProfile"]);
    if ($window.sessionStorage["userProfile"]) {
      console.log('wtf?');
      userProfile = JSON.parse($window.sessionStorage["userProfile"]);
    }
  }
  init();

});