 /**
   * @class angular_module.sgTokenAuth
   * @memberof angular_module
   */
var sgTokenAuth = angular.module('sgTokenAuth', [])

 /**
   * Token based authentication service
   * @class authenticationSvc
   * @memberof angular_module.sgTokenAuth
   */
.factory("authenticationSvc", function($http, $q, $window) {
  var userInfo;
 
  /**
   * Logs a user in by passing a username and password to an 
   * authentication API and expect an ID and authentication token 
   * when successful.
   * @function
   * @memberof angular_module.sgTokenAuth.authenticationSvc
   * @param {String} userName 
   * @param {String} password
   * @param {String} url API point to authenticate the user creds.
   * @return {Object} A promis with a returned data object intent.
   */
  function login(userName, password, url) {

    var deferred = $q.defer();
    $http.post(url, {
      userNam: userName,
      PasswdTxt: password,
      DropUser: true
    }).then(function(result) {

      // The result properties being assigned to userInfo will 
      // need to be adjusted to meet specific API results

      userInfo = {
        accessToken: result.data.WebSession.Token,
        GUID: result.data.WebSession.GUID,
        adminID: result.data.WebSession.AdminId
      };

      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(result);
    }, function(error) {
      deferred.resolve(error);
    });
 
    return deferred.promise;
  }

  /**
   * Logs the user out by passing an authentication token to 
   * an authentication API.
   * @param {String} url APi point to pass the token telling the server end the session.
   * @return {Object} A promis object with success/fail data intent.
   * @function
   * @memberof angular_module.sgTokenAuth.authenticationSvc
   */
  function logout(url) {
      var deferred = $q.defer();
      $http({
          method: "POST",
          url: url,

          // The header names may need to be adjusted to satisfy the header 
          // requirements of the authentication API

          headers: {
              "X-Token": userInfo.accessToken,
              "X-GUID": userInfo.GUID,
              "X-AdminID": userInfo.adminID
          },
          data: { "GUID": userInfo.GUID }

      }).then(function (result) {
        console.log('removing stored data.')
          userInfo = null;
          $window.sessionStorage.removeItem("userInfo");
          deferred.resolve(result);
      }, function (error) {
        console.log(error);
          deferred.resolve(error);
      });

      return deferred.promise;
  }

  /**
   * Return the stored user information.
   * @return {Object} userInfo object containing the authentiction token and unique ID
   * @function
   * @memberof angular_module.sgTokenAuth.authenticationSvc
   */
  function getUserInfo() {
    return userInfo;
  }

  /**
   * Return true or false based on if the userInfo object has a token.
   * @return {Boolean} 
   * @function
   * @memberof angular_module.sgTokenAuth.authenticationSvc
   */
  function isAuthenticated() {
    try {
      if(userInfo.accessToken){
        return true;
      }
    } catch (err){
      // accessToken property is undefined 
    }
    return false;
  }

  /**
   * Initialization function to run when the authentication service is called.
   * This function checks the browser memory for a userInfo object. This prevents
   * loss of authentication information on page refresh. 
   */
  function init() {
    if ($window.sessionStorage["userInfo"]) {
      userInfo = JSON.parse($window.sessionStorage["userInfo"]);
    }
  }
  init();
 
  return {
    login: login,
    logout: logout,
    isAuthenticated: isAuthenticated,
    getUserInfo: getUserInfo
  };
});