$("#fullpage").fullpage({
  responsiveWidth: 1400,
  navigation: true /* 기본값 false */,
  navigationPosition: "left" /* 기본값 right */,

  onLeave: function (origin, destination, direction) {
    if (destination == 2 || destination == 4 || destination == 6) {
      /* 2번 구역에 도달했을 때 */
      $("#header,#fp-nav").addClass("active");
    } else {
      $("#header,#fp-nav").removeClass("active");
    }

    //footer 구역에 도달했을 때 header 영역을 숨김
    if (destination == 7) {
      $("#header,#fp-nav").fadeOut();
    } else {
      $("#header,#fp-nav").fadeIn();
    }

    // 빠른 전환으로 이벤트 중복시 fullpage와 swiper전환시점 분리막기
    $("#fullpage").on("scroll touchmove mousewheel", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
    swiper.mousewheel.disable();
  },
  afterLoad: function (anchorLink, index) {
    // 전환이 끝난후 이벤트풀기
    $("#fullpage").off("scroll mousewheel");
    if (!$(".fp-completely .swiper-wrapper").length > 0)
      $("#fullpage").off("touchmove"); // 모바일분기
    if (swiper) swiper.mousewheel.enable();
    if (!$(".story").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
  },
});

// swiper
var length = $(".story .swiper-slide").length;
var startY = 0;
var swiper = new Swiper(".story_list", {
  slidesPerView: 1,
  spaceBetween: 0,
  freeMode: false,
  speed: 1000,
  mousewheel: true,
  on: {
    slideChange: function () {
      var idx = this.activeIndex;
      // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
      if (this.activeIndex != 0 && idx != length)
        $.fn.fullpage.setAllowScrolling(false);
      if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false); //슬라이드가 2개밖에 없을때
      // console.log('즉시 : ' + idx);
    },
    slideChangeTransitionEnd: function () {
      var idx = this.activeIndex;
      // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
      if (idx == 0 || idx >= length - 1) $.fn.fullpage.setAllowScrolling(true);
      // console.log('전환후 : ' + idx);
    },
    touchStart: function (e) {
      startY = e.touches.startY;
    },
    touchEnd: function (e) {
      if (startY - 10 > e.touches.currentY) {
        swiper.slideNext();
      } else if (startY + 10 < e.touches.currentY) {
        swiper.slidePrev();
      }
      console.log(startY, e.touches.currentY);
    },
  },
});

//상단메뉴
$(".depth2,.depth2_bg").hide();

$(".gnb > li").mouseenter(function () {
  $("#header").addClass("active");
  $(".depth2_bg").stop().slideDown();
  $(this).children(".depth2").stop().fadeIn();
});

$(".gnb > li").mouseleave(function () {
  $("#header").removeClass("active");
  $(".depth2_bg").stop().slideUp();
  $(this).children(".depth2").stop().fadeOut();
});

//검색영역
$(".btn_search").click(function () {
  $(".search").addClass("on");
  $(".search input[type=text]").focus();
});
$(".search input[type=text]").blur(function () {
  $(".search").removeClass("on");
});

// 모바일 메뉴

$(".mgnb_wrap").hide();
$(".ham").click(function () {
  $(".mgnb_wrap").fadeIn(), $("#fp-nav").hide();
});

$(".ham_m").click(function () {
  $(".mgnb_wrap").fadeIn(), $("#fp-nav").hide();
});


$(".mgnb_close").click(function () {
  $(".mgnb_wrap").fadeOut(), $("#fp-nav").show();
});


$(".mgnb > li").click(function () {
  $(this).find(".mdepth2_all").slideToggle();
  $(this).siblings().children(".mdepth2_all").slideUp();
});



//footer영역
$(document).ready(function () {
  $(".footer_dt").click(function () {
    $(this).next(".footer_dd").slideToggle(); // 클릭된 footer_dt 다음 요소 슬라이드 토글
  });
});

// 베스트 제품

const best_list = new Swiper(".best_list", {
  autoplay: {
    delay: 2000, //ms 2500s=2.5s
    disableOnInteraction: false,
  },

  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-120%", 0, -500],
    },
    next: {
      translate: ["120%", 0, -500],
    },
  },
  loop: true,
  speed: 1000,

  slidesPerView: 1,
  centeredSlides: true,

  pagination: {
    el: ".best-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".best-next",
    prevEl: ".best-prev",
  },

  breakpoints: {
    768: {
      // 가로해상도가 768px 이상일 경우
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// gift 제품
const gift_list = new Swiper(".gift_list", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".gift-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".best-next",
    prevEl: ".best-prev",
  },

  breakpoints: {
    768: {
      // 가로해상도가 768px 이상일 경우
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    1400: {
      // 가로해상도가 1024px 이상일 경우
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});

//footer 영역
$("dl > .footer_dt").click(function () {
  $(this).find(".footer_dd").slideToggle();
  $(this).siblings().children(".footer_dd").slideUp();
});
