var fakeAPI = {
  'TotBalAmt': 200010.03,
  'performance': 0.20
}

var config = new config();
;
jQuery.noConflict();

(function($){
  'use strict';

$(document).ready(function(){

var API = config.URLROOT + '/things';

// $.ajax(API)
// .ready(function(data, message, code){
//   console.log(data, message, code);
//   $('.data').html(data.total);
// })
// .fail(function(data, message, code){
//   console.log(data, message, code);

// });

(function render(){
  console.log('in render');
  $('.totalBal').html(fakeAPI.TotBalAmt);
})();


(function activateStickyNav(){
  var stickynavs = $('.stickynav');
  var stickynavlength = stickynavs.length;
  var triggerHeight = 0;

  for( var a = 0; a < stickynavlength; a++){
    triggerHeight = ( $('.mainNav').offset().top + $('.mainNav').height() );
    new stickyNav(stickynavs[a], { triggerHeight: triggerHeight })
  }

})();


function stickyNav(nav, options) {
  options = (typeof options == 'object') ? options : {};
  var self = this;
  self.element = (typeof nav == 'object') ? nav : {};
  self.top = options.top || 0;
  self.left = options.left || 0;
  self.triggerHeight = options.triggerHeight || 0;

  if( dependencies() ){ init(); };

  return;

  function init(){

    setPosition();

    $(window).scroll(function () {
      console.log('scrolling');
      if( $(window).scrollTop() > self.triggerHeight ){
        if( !$(self.element).is(':visible') ){      
          $(self.element).slideDown(200);
        }
      } else {
        if( $(self.element).is(':visible') ){
          $(self.element).slideUp(100);
        }
      }
    });
  };

  function setPosition(){
    $(self.element).css( { 'top': String(self.top), 'left': String(self.left) } );
  }

  function dependencies(){
    if( typeof nav != 'object' ){
      console.log('Sticky Nav requires a DOM element as a first argument!  Found: ', nav);
      return false;
    }
    if(typeof $ != 'function'){
      console.log('Sticky Nav requires jQuery!');
      return false;
    }
    return true;
  };

}


});

})(jQuery);