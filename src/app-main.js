/**
 * Created by Saloni on 1/10/2017.
 */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function toggleNav() {
  if($('#hamburger').hasClass('is-active')) {
    $("#side-nav").css("width","0");
    $("#main").css("margin-left","auto");
    $("#hamburger").removeClass("is-active");
  } else {
    $("#side-nav").css("width","250px");
    $("#main").css("margin-left","250px");
    $("#hamburger").addClass("is-active");
  }
}

/* /!* Set the width of the side navigation to 0 and the left margin of the page content to 0 *!/
 function closeNav() {
 document.getElementById("mySidenav").style.width = "0";
 document.getElementById("main").style.marginLeft = "auto";
 $("#hamburger").removeClass("is-active");
 }*/
/*
 Waves.init();*/
/*$(document).ready(function() {
  Waves.attach('.btn',['waves-button', 'waves-float', 'waves-light']);
  Waves.attach('.card',null);
});*/

Waves.attach('.btn',['waves-button', 'waves-float', 'waves-light']);
Waves.attach('.card',null);
