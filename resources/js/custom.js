;
jQuery.noConflict();

(function($){
  'use strict';

$(document).ready(function(){

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