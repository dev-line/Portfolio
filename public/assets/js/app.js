




$(window).scroll(function() {
    if ($(this).scrollTop() >= 0.1) {
        $('.sticky').removeClass("position-absolute").addClass("sticky-top bg-nav");
    } else {
      $('.sticky').removeClass("sticky-top bg-nav").addClass("position-absolute");
    }
});



function openNav() {
  document.getElementById("sidebar").style.width = "100%";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}


// INITIALIZE AOS
AOS.init({
  duration: 1200,
})

// $(function () {
//   'use strict';
//   var winHeight = $(window).height(),
//       navHeight = $('.navbar').innerHeight();
//   $('.vh-100').height(winHeight - navHeight);
// });