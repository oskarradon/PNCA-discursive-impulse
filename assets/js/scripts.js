$(function(){

  if (window.innerWidth <= 800) {
    $('.header__menu-icon').click(() => {
      $('.nav').slideToggle('slow');
    });
  }

  function checkScrollBars() {
      var b = $('body');
      var normalw = 0;
      var scrollw = 0;
      console.log('here');
      if (!($("body").height() > $(window).height())) {
        console.log('inside if');
        console.log('hello');
        $('footer').css({right:'62.12px'});
      }
  }

  checkScrollBars();

});
