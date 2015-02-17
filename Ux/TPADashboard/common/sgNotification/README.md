# Notifications #

A user notifications model that listens for events on the rootScope and displays the message in the designated space. When the packaged CSS is used the notification space will adjust its height based on the incoming message.  

NOTE: Only one mesasage can be present in the notifications space at a time. If another notification is triggered it will replace the existing message. This module was built to give the user temporary feedback it should not be used for persistant messaging. 

----

### Usage ###

##### HTML #####
```
<div notification></div>
```

##### JS ( broadcast event) #####

The module is listening for `newNotification` events on the rootScope.  
In the future this should have its own scope, possibly a mediator, and not bloat the rootScope with event listeners.

```
$rootScope.$broadcast('newNotification', {type: 'success', title: 'Title of Message', message: 'This is the body of the message!' });
```

----

![Success Message](/../images/success_message.JPG?raw=true "Success Message")
![Error Message](/../images/error_message.JPG?raw=true "Error Message")