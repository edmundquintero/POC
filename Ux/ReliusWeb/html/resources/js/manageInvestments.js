'use strict';

var fakeAPI = {
  'TotBalAmt': 200010.03,
  'performance': 0.20
};

// var config = new Config();

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
        /* global StickyNav: false */
        new StickyNav(stickynavs[a], { triggerHeight: triggerHeight });
      }

    })();

  });
