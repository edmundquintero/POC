;
jQuery.noConflict();

(function($){
  'use strict';

$(document).ready(function(){

  // Temporary function to swap out login images

  var backgroundImages = ['../resources/images/background1.jpg', 
                          '../resources/images/background2.jpg',
                          '../resources/images/background3.jpg',
                          '../resources/images/background4.jpg', 
                          '../resources/images/background5.jpg'];

  var imgNumber = Math.floor(Math.random()*backgroundImages.length)
  var random = backgroundImages[imgNumber];

  console.log(imgNumber, random);

  ChangeLoginBackgroungImage(random);

  function ChangeLoginBackgroungImage(imageURL)
    {
        var urlString = 'url(' + imageURL + ')';
        $('#login-background').css( 'background-image', urlString );
    }

  //-----------------------------------------




  //----------------------------------------------


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
    })
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

var config = function(){
  this.URLROOT = 'the server';
  this.THEME =  'blue';
}