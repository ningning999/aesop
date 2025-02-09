$(".depth2,.depth2_bg").hide();

$(".gnb > li").mouseenter(function () {
  $("#header").addClass("active");
  $(this).find(".depth2").fadeIn();
  $(".depth2_bg").fadeIn();
});

$(".gnb > li").mouseleave(function () {
  $("#header").removeClass("active");
  $(this).find(".depth2").stop().fadeOut();
  $(".depth2_bg").stop().fadeOut();
});



// //mdepth2
// $(".ham").click(function () {
//   $(".mgnb_wrap").fadeIn();
// });
// $(".mgnb_close").click(function () {
//   $(".mgnb_wrap").fadeOut();
// });

//옆에서 메뉴가 나오게 하는 방법 , 위치값조정
$(".ham").click(function () {
  $(".mgnb_wrap").animate({
    "left": "0"
  })
});
$(".mgnb_close").click(function () {
  $(".mgnb_wrap").animate({
    "left": "100%"
  })
});


$(".mgnb > li").click(function () {
  $(this).find(".mdepth2").stop().slideToggle();
  $(this).siblings().fide(".mdepth2").stop().slideUp();
});
