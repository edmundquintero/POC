'use strict';  
/* exported StickyNav */
  function StickyNav(nav, options) {
    options = (typeof options === 'object') ? options : {};
    /* JSHint validthis: true */
    var self = this;
    self.element = (typeof nav === 'object') ? nav : {};
    self.top = options.top || 0;
    self.left = options.left || 0;
    self.triggerHeight = options.triggerHeight || 0;
    self.setPosition = setPosition;
    self.dependencies = dependencies;
    self.init = init;

    if( self.dependencies() ){ self.init(); }

    return;

    function init(){

      self.setPosition(function () {
        $(window).scroll(function () {
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
      });

    }

    function setPosition(callback){
      callback = (typeof callback === 'function') ? callback : function(){};
      $(self.element).css( { 'top': String(self.top), 'left': String(self.left) } );
      callback();
    }

    function dependencies(){
      if( typeof nav !== 'object' ){
        console.log('Sticky Nav requires a DOM element as a first argument!  Found: ', nav);
        return false;
      }
      if(typeof $ !== 'function'){
        console.log('Sticky Nav requires jQuery!');
        return false;
      }
      return true;
    }
  }