$(function(){
  // if mobile vw
  if (window.innerWidth <= 800) {

    // if menu div is not open
    if ($('nav').is(':visible')) {

      // when you click on menu icon
      $('.header__menu-icon').click(() => {

        // show menu div
        $('nav').hide();
        // animate? - this could be in css, transition property

      });

    } else {

      $('.header__menu-icon').click(() => {

        // otherwise hide menu div
        $('nav').show();

      });

    }

  }

})
