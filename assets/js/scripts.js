$(function(){

  if (window.innerWidth <= 800) {
    $('.header__menu-icon').click(() => {
      $('.nav').slideToggle('slow');
    });
  }

});
