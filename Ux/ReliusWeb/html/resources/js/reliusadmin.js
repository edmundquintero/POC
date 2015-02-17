/*!
 * Relius-Admin
 * Version: 1.0.0
 * License: MIT
 */

'use strict';

(function () {

  // Source: html/resources/js/config.js
  /* exported Config */
function Config (){
  /* JSHint validthis: true */  
  var self = this;  
  self.URLROOT = 'the server';
  self.THEME =  'blue';

}
  // Source: html/resources/js/custom.js
  jQuery.noConflict();

(function($){

  $(document).ready(function(){

    // Temporary function to swap out login images

    var backgroundImages = ['../resources/images/background1.jpg', 
                            '../resources/images/background2.jpg',
                            '../resources/images/background3.jpg',
                            '../resources/images/background4.jpg', 
                            '../resources/images/background5.jpg'];

    var imgNumber = Math.floor(Math.random()*backgroundImages.length);
    var random = backgroundImages[imgNumber];

    console.log(imgNumber, random);

    changeLoginBackgroungImage(random);

    function changeLoginBackgroungImage(imageURL) {
      var urlString = 'url(' + imageURL + ')';
      $('#login-background').css( 'background-image', urlString );
    }

    //-----------------------------------------


    $('.datepicker').datepicker();


    $('.collapsable-header').on('click', function(){
      var $target = $($(this).attr('data-target'));
      if($target.is(':visible')){
        $target.slideUp();
        $(this).removeClass('open');
      } else {
        $target.slideDown();
        $(this).addClass('open');
      }
    });


    $('nav.top-top > ul').on('mouseenter', 'li', function(){
      $($(this).children('ul')[0]).addClass('submenuShow');
    });
    $('nav.top-top > ul').on('mouseleave', 'li', function(){
      $($(this).children('ul')[0]).removeClass('submenuShow');
    });

    $('.profile-menu').on('click', function(){
      var overlay = $(document.createElement('div'));
      overlay.addClass('overlay profile-overlay');
      overlay.on('click', function(){
        $('nav.profile').removeClass('active');
        overlay.remove();
      });
      $('nav.profile').on('click', '.closeProfile', function(){
        $('nav.profile').removeClass('active');
        overlay.remove();
      });

      $('nav.profile').addClass('active');
      $('body').append(overlay);
    });

    $('.dropup-menu').on('click', '.dropup-toggle', function(){
      console.log('dropup clicked', $(this).next('ul'));
      $(this).next('ul').toggleClass('active');
    });

  });

})(jQuery);

  // Source: html/resources/js/manageInvestments.js
  var fakeAPI = {
  'TotBalAmt': 200010.03,
  'performance': 0.20
};

var config = new config();
jQuery.noConflict();

(function($){

  $(document).ready(function(){

    // var API = config.URLROOT + '/things';

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
        new StickyNav(stickynavs[a], { triggerHeight: triggerHeight });
      }

    })();


    function StickyNav(nav, options) {
      options = (typeof options === 'object') ? options : {};
      /* JSHint validthis: true */
      var self = this;
      self.element = (typeof nav === 'object') ? nav : {};
      self.top = options.top || 0;
      self.left = options.left || 0;
      self.triggerHeight = options.triggerHeight || 0;

      if( dependencies() ){ init(); }

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
      }

      function setPosition(){
        $(self.element).css( { 'top': String(self.top), 'left': String(self.left) } );
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


  });

})(jQuery);
})();