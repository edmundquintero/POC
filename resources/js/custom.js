$(function(){
  'use strict';

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

});