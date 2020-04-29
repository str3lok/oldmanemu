// подключаем html5-блоки для старых браузеров
var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time,main").split(',');
for (var i = 0; i < e.length; i++) {
	document.createElement(e[i]);
};

	$(window).load(function() {
		window.setTimeout(function() {
			$('body').addClass('loading');
		},500);
		
	});

$(document).ready(function() {

  //- filter
  //- показать фильтр
  $('.filter__btn').on('click', function(e) {
    e.preventDefault();  
    var thisParent = $(this).parent();

    if(!$(thisParent).hasClass('is-active')) {
      $(thisParent).addClass('is-show');
      $(thisParent).find('.filter__box').slideDown('slow', function() {
        $(thisParent).addClass('is-active');
      });
    }
    else {
      $(thisParent).find('.filter__box').slideUp('slow', function() {
        $(thisParent).removeClass('is-active').removeClass('is-show');
      });
    }
  });

  //- filter__collapse

  $('.collapse__btn').on('click', function(e) {
    e.preventDefault();  
    var thisParent = $(this).parent();
    var thisBtn = $(this);

    if(!$(thisParent).hasClass('is-active')) {
      $(thisBtn).addClass('is-active');
      $(thisParent).find('.collapse__content').slideDown('slow', function() {
        $(thisParent).addClass('is-active');
      });
    }
    else {
      $(thisParent).find('.collapse__content').slideUp('slow', function() {
        $(thisParent).removeClass('is-active');
        $(thisBtn).removeClass('is-active');
      });
    }
  });  

    $("#filterPrice").ionRangeSlider({
        type: "double",
        min: 0,
        max: 24567,
        from: 0,
        to: 24567,
        onStart: function (data) {
          $('#priceOt').val(data.from);
          $('#priceDo').val(data.to);
        },
        onChange: function (data) {
          $('#priceOt').val(data.from);
          $('#priceDo').val(data.to);
        }
    });  

  
  //- end filter
    
//селект валюты
$(".i-currency").on('click', function(fCurrency){
    var selectID = $(this).parent().attr('id');    
    var dropBlock = $('#'+selectID).find('.drop-currency');
    
    $('.section-modal, .box-modal').fadeOut();
    $('.modal-link').removeClass("active");  

    $('.drop-share, .drop-select').slideUp();
    setTimeout("$('.slct').removeClass('active');", 250);

    if( dropBlock.is(':hidden') ) {   

        if($(this).hasClass("dollar")){
           $(".drop-currency .dollar").hide(); 
           $(".drop-currency .grivna").show();    
        }
        else {
            $(".drop-currency .grivna").hide();
            $(".drop-currency .dollar").show();   
        }
       
        dropBlock.slideDown();
        $(this).addClass('active');
        
        $('#'+selectID+' .drop-currency').find('li').on('click', function(){
            var selectResult = $(this).data("value");
            //var selectResult2 = $(this).find('i').text();
            var selectClass = $(this).attr('class');


            if(selectClass == "grivna"){
               $('.i-currency').removeClass("dollar").addClass("grivna"); 
            }
            else {
                $('.i-currency').removeClass("grivna").addClass("dollar"); 
            }


            $('#'+selectID).find('input').val(selectResult);
            $('#'+selectID).find('.i-currency').removeClass('active')/*.html(selectResult2)*/;
            dropBlock.slideUp(); 
        });
    } else {
        dropBlock.slideUp();
        setTimeout("$('.i-currency').removeClass('active');", 250);
    }
        fCurrency.stopPropagation()      
    return false;
});
$(".drop-currency").on('click', function(fCurrency){
    fCurrency.stopPropagation()
});

//блок share
$(".share-btn").on('click', function(fShare){
    fShare.preventDefault();
    $('.section-modal, .box-modal').fadeOut();
    $('.modal-link').removeClass("active"); 

    $('.drop-currency, .drop-select').slideUp();
    setTimeout("$('.i-currency').removeClass('active'); $('.slct').removeClass('active');", 250); 

    var dropShare = $(this).parent().find('.drop-share');

    if( dropShare.is(':hidden') ) {
        dropShare.slideDown();
    }
    else {
        dropShare.slideUp();
    }

    fShare.stopPropagation()  
    return false;    

});




//селекты 
$(".slct").on('click', function(fSelect){
    var selectID = $(this).parent().attr('id');    

    var dropBlock = $('#'+selectID).find('.drop-select');

    $('.drop-currency, .drop-share').slideUp();
    $('.control-form').removeClass('control-select2');
    setTimeout("$('.i-currency').removeClass('active'); ", 250);     

    if( dropBlock.is(':hidden') ) {
    $('.drop-select').slideUp();
    $('.slct').removeClass('active');      
       
        dropBlock.slideDown();
        $(this).addClass('active');
        $(this).parent().parent().addClass("control-select2");
        
        $('#'+selectID+' .drop-select').find('li').on('click', function(){
            var selectResult = $(this).data("value");
            var selectResult2 = $(this).find("span").text();
            $('#'+selectID).find('input').val(selectResult);
            $('#'+selectID).find('.slct span').text(selectResult2);
            $('#'+selectID).find('.slct').removeClass('active');
            dropBlock.slideUp(); 
            setTimeout("$('.control-form').removeClass('control-select2');", 250);
        });
    } else {
        dropBlock.slideUp();
        setTimeout("$('.slct').removeClass('active'); $('.control-form').removeClass('control-select2');", 250);
    }
        fSelect.stopPropagation()      
    return false;
});
$(".drop-select").on('click', function(fSelect){
    fSelect.stopPropagation()
});

$("body").on('click', function(){
    $('.drop-currency, .drop-share, .drop-select').slideUp();
    setTimeout("$('.i-currency').removeClass('active'); $('.slct').removeClass('active');", 250);
}); 


//появление кноки в форме поиска
$('.link-podbor').on('click', function(e) {
    e.preventDefault();  
    $(".podbor-modal").fadeIn();
});

//открыть меню продукция
$('.modal-link').on('click', function(e) {
    e.preventDefault();  
    var boxModal = $(this).attr("data-box")

    //$(".section-modal").show();
    //$(".product-cat").fadeIn();

    $('.drop-share, .drop-select').slideUp();
    setTimeout("$('.slct').removeClass('active');", 250);

    //modal-link - добавить всем ссылкам открывающие блоки в section-modal
    //box-modal - добавить всем блокам находящимся в section-modal
    if ($(this).hasClass("active") ){

        $(this).removeClass("active");
        $('.section-modal > .'+boxModal).fadeOut();
        $(".section-modal").fadeOut();
    }
    else {
        $('.modal-link').removeClass("active");
        $('.section-modal > :not(.'+boxModal+')').fadeOut();

        $(".section-modal").show();
        $('.section-modal > .'+boxModal).fadeIn();

        $(this).addClass("active");
    }

});

//кнопка закрыть консультация онлайн

$('.consult-close').on('click', function(e) {
    e.preventDefault();  
    $(".section-modal").fadeOut();
    $(".consultant").fadeOut();

    $(".i-consultant").removeClass("active");
});

$('.call-close').on('click', function(e) {
    e.preventDefault();  
    $(".section-modal").fadeOut();
    $(".callBox").fadeOut();

    $(".callModal").removeClass("active");
});


    //открыть модальное окно
    $('.modal-open').magnificPopup({
      type:'inline',
      mainClass: 'mfp-with-zoom',
      midClick: false,
      closeOnBgClick: false,
      zoom: {
        enabled: true, 
        duration: 300, 
        easing: 'ease-in-out'    
      },
  callbacks: {
    open: function() {
       $(".consultant-online").addClass("flipInY");
       setTimeout('$(".consultant-online").removeClass("flipInY");', 1100);
    },   
    afterClose: function() {
        $(".consultant-online").removeClass("flipOutY");
      } 
    // e.t.c.
  }

    });
$('.mfp-close').on('click', function(e) {
    e.preventDefault();  
    return false;
});
$('.mfp-close').on('click', function(e) {
    $(".consultant-online").addClass("flipOutY");
    setTimeout('$.magnificPopup.close();', 1100);
});




//открыть сео-бокс
$('.main-tab').on('click', function(e) {
    var dropTab = $(".main-tab-text");

    if( dropTab.is(':hidden') ) {
        $(this).addClass("tabOpen");
        dropTab.slideDown();
    }
    else {
        $(this).removeClass("tabOpen");
        dropTab.slideUp();    
    }
});    

//скролл в верх
$('.btn-top').on('click', function(e) {
    jQuery.scrollTo($(".topScroll"), 1000);
});  

/*ПЛЮС - МИНУС на странице order*/
$('.order-minus').on('click', function(e) {
  e.preventDefault(); 

  var colPr = parseInt($(".orderTop span").text());

  if(colPr == 1) {
    return false;
  }
  else {
    var allSum = parseInt($(".orderSum").text());
    var pricePr = parseInt($(".order-sum div").attr("data-price"));

    $(".orderSum").text(allSum-pricePr);
    $(".order-action-top span").text(colPr-1);
  }
  
});


$('.order-plus').on('click', function(e) {
  e.preventDefault(); 

  var colPr = parseInt($(".orderTop span").text());

  var allSum = parseInt($(".orderSum").text());
  var pricePr = parseInt($(".order-sum div").attr("data-price"));

  $(".order-action-top span").text(colPr+1);
  $(".orderSum").text(allSum+pricePr);

});

/*ПЛЮС - МИНУС на странице single*/
$('.single-minus').on('click', function(e) {
  e.preventDefault(); 

  var colPr = parseInt($(".singleTop span").text());

  if(colPr == 1) {
    return false;
  }
  else {
    var allSum = parseInt($(".singleSum").text());
    var pricePr = parseInt($(".singleSum").attr("data-price"));

    $(".allSum").text(allSum-pricePr);
    $(".order-action-top span").text(colPr-1);
  }
  
});


$('.single-plus').on('click', function(e) {
  e.preventDefault(); 

  var colPr = parseInt($(".singleTop span").text());

  var allSum = parseInt($(".singleSum").text());
  var pricePr = parseInt($(".singleSum").attr("data-price"));

  $(".order-action-top span").text(colPr+1);
  $(".allSum").text(allSum+pricePr);

});

/*Рейтинг звезды*/
$('.star-btn').on('click', function(e) {
  e.preventDefault(); 
  var colStar = $(this).attr("data-star");
  $(this).parent().removeAttr("class").addClass(colStar);
});

//рейтинг по ховеру
$(".st1").hover(
    function () {
        $(this).parent().addClass("starHover1");
    },
    function () {
        $(this).parent().removeClass("starHover1");
    }
); 
$(".st2").hover(
    function () {
        $(this).parent().addClass("starHover2");
    },
    function () {
        $(this).parent().removeClass("starHover2");
    }
); 
$(".st3").hover(
    function () {
        $(this).parent().addClass("starHover3");
    },
    function () {
        $(this).parent().removeClass("starHover3");
    }
);
$(".st4").hover(
    function () {
        $(this).parent().addClass("starHover4");
    },
    function () {
        $(this).parent().removeClass("starHover4");
    }
); 
$(".st5").hover(
    function () {
        $(this).parent().addClass("starHover5");
    },
    function () {
        $(this).parent().removeClass("starHover5");
    }
); 



//мобильное меню
$('.mobile-nav').on('click', function(eMenu) {
  eMenu.preventDefault();

  var dropNav = $(".menu__container");
  var ovH = $(".content").height();


  if($('.menuOpen').hasClass("active")) {

    $('.menuOpen').removeClass("active"); 
    
    $(".prCatMobile").fadeOut(); 
    $(".mainNavMobile").fadeIn(); 

    $('.mobile-nav').addClass("openNav").addClass("openNav1");

    $(".subMenuBox, .subMenu-2").fadeOut();

  }
  else if(dropNav.is(':hidden')) {

    $('.mobile-nav').addClass("openNav").addClass("openNav1");
    dropNav.fadeIn().css({"height":ovH+"px"});  

    $(".prCatMobile").fadeOut(); 
    $(".mainNavMobile").fadeIn();       

    $(".header-top").addClass("navOpen");
    $("footer").addClass("navOpen");
  }
  else {

      if($('.mobile-nav').hasClass("openNav2")) {
        $(".mainNavMobile").fadeIn();
        $(".prCatMobile").fadeOut();
        $('.mobile-nav').removeClass("openNav2").addClass("openNav1");      
      }
      else {
        $('.mobile-nav').removeClass("openNav").removeClass("openNav1");
        dropNav.fadeOut();
        setTimeout('$(".header-top").removeClass("navOpen"); $("footer").removeClass("navOpen");', 350);        
      }    
  }

eMenu.stopPropagation() 
});
$(".main-nav").on('click', function(eMenu){
    eMenu.stopPropagation()
});
$(".product-cat").on('click', function(eMenu){
    eMenu.stopPropagation()
});
$(".subMenu-2 li").on('click', function(eMenu){
    eMenu.stopPropagation()
});

$("body").on('click', function(){
    $('.mobile-nav').removeClass("openNav").removeClass("openNav1");
    $(".menu__container").fadeOut();
    $(".mobile-nav").show();
    $(".m2Lavel").hide();   
    $(".subMenu-2").fadeOut();
    setTimeout('$(".header-top").removeClass("navOpen"); $("footer").removeClass("navOpen");  $(".subMenuBox").hide();', 350); 
});

$('.menuOpen').on('click', function(e) {
    e.preventDefault();  
    
  var dropNav = $(".menu__container");
  var ovH = $(".content").height();  

  if($(this).hasClass("active")) {
    $(".prCatMobile").fadeOut();
    dropNav.fadeOut();
    $(this).removeClass("active");

    $(".subMenu-2").fadeOut();


    setTimeout('$(".header-top").removeClass("navOpen"); $("footer").removeClass("navOpen"); $(".subMenuBox").hide();', 350);  
  }
  else {
      dropNav.fadeIn().css({"height":ovH+"px"});

      $(".mainNavMobile").fadeOut();
      $(".prCatMobile").fadeIn();
      $(this).addClass("active");

      $(".mobile-nav").removeClass("openNav").removeClass("openNav2");

      $(".header-top").addClass("navOpen");
      $("footer").addClass("navOpen");
      $(".subMenuBox, .subMenu-2").fadeOut();
    $(".mobile-nav").show();
    $(".m2Lavel").hide();       
  }

 
            
}); 

//категории продукции на мобильном
$('.mobile-link').on('click', function(e) {
    e.preventDefault();  
    
    $(".mainNavMobile").fadeOut();
    $(".prCatMobile").fadeIn();
    $('.mobile-nav').removeClass("openNav1").addClass("openNav2");
            
}); 


//открыть субменю 2-го уровня
$('.link-sub').on('click', function(e) {
    e.preventDefault();  

    var subMenu = $(this).attr("data-sub");

    $(".prCatMobile").fadeOut();

    $(".subMenuBox").show();

    $(".subMenuBox").find("."+subMenu).fadeIn();


    if($(".menuOpen").hasClass("active")) {
      return false;
    }
    else {
      $(".mobile-nav").hide();
      $(".m2Lavel").show();      
    }
            
});   

//шаг назад со второго уровня меню
$('.m2Lavel').on('click', function(eMenu) {
    eMenu.preventDefault();  

    $(".mobile-nav").show();
    $(".m2Lavel").hide();  
    $(".subMenuBox, .subMenu-2").fadeOut();

    $(".prCatMobile").fadeIn();  

    eMenu.stopPropagation()        
});  

  //выставляем правильно текст от количества дней в счетчике
  //setTimeout('var colDay = $(".days").html(); if (colDay>4) {$(".days-txt").text("дней");} else if ((colDay>1) && (colDay<=4)) {$(".days-txt").text("дня");} else if (colDay==0) { $(".days-txt").text("дней");} else {$(".days-txt").text("день");}', 500);
/*
  var colDay = $(".days").html();
  if (colDay>4) {
    $(".days-txt").text("дней");
  }
  else if ((colDay>1) && (colDay<=4)) {
    $(".days-txt").text("дня");
  }  
  else if (colDay==0) {
    $(".days-txt").text("дней");
  }
  else {
    $(".days-txt").text("день");
  }
  */


//переключение вида товаров список/блок
$('.pt-l-box').on('click', function(e) {
    e.preventDefault();  
    
    if($(this).parent().hasClass("active")) {
      return false;
    }
    else {
      $(".list-view").find("li.active").removeClass("active");
      $(this).parent().addClass("active");

      //view-list - вид inline 
      //view-box - вид box 
      //получаем вид просмотра
      var methodView = $(this).attr("data-view");

      if (methodView == "view-list"){
        $(".section-slider").removeClass("view-box").addClass("view-list");                              
      }
      else {
        $(".section-slider").removeClass("view-list").addClass("view-box");
      }

      $('.pr-slider').slick('destroy');
      $('.pr-slider').on('init', function () {
          }).slick({
              infinite: true,
              arrows: true,
              prevArrow: ".slidePrev",
              nextArrow: ".slideNext",
              adaptiveHeight: true,
              dots: false       
        });        

    }//end else на проверку класса active 
                  
});  

//подбор товаров на мобильном
$('.open-accordion').on('click', function(e) {
    e.preventDefault();  

    var windowWidth2 = window.innerWidth;

    if(windowWidth2 <= 1023) {

      if($(this).hasClass("active")) {
        $(".podbor-accordion").slideUp();
        $(this).removeClass("active");
      }
      else {
        $(".podbor-accordion").slideDown();
        $(this).addClass("active");
      }      

    }
    else {
      return false;
    }


});  

//добавляем класс в зависимости от количества комплектов
if ($("body").hasClass("page-single-item")) {

  var complectLength = $(".complect-list li").length;
  
  if(complectLength == 3) {
    $(".complect-list").addClass("complect3");
  }
  else if (complectLength == 2) {
    $(".complect-list").addClass("complect2");
  }  
  else if (complectLength == 1) {
    $(".complect-list").addClass("complect1");
  }
  else {
    $(".complect-list").addClass("complect4");
  }
}

//табы контента
$('.tab-list li').on('click', function(e) {
    e.preventDefault();  

    

    if($(this).hasClass("active")) {
      return false;
    }
    else {
      var tab = $(this).attr("data-tab");
      $('.tab-list').find("li.active").removeClass("active");
      $(this).addClass("active");

      $('.tab-content .tab-box:not(.'+tab+')').hide();
      $('.tab-content .tab-box.'+tab).show();
    }


}); 

//закрыть блок Помочь с выбором?
$('.help-close a').on('click', function(e) {
    e.preventDefault();  
    $(".help-container").slideUp();
});  
$('.help-no').on('click', function(e) {
    e.preventDefault();  
    $(".help-container").slideUp();
});  


//слайдер

$('.home-slider').slick({
  infinite: true,
  arrows: true,
  dots: true 
});

$('.pr-slider').slick({
  infinite: true,
  arrows: true,
  prevArrow: ".slidePrev1",
  nextArrow: ".slideNext1",
  adaptiveHeight: true,
  dots: false  
});
 $('.pr-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var prBoxLeng = $(".pr-slider .slick-current").find(".product-content").length;

        if(parseInt(prBoxLeng)%2==0) {
            //если четное количество слайдов, то навигацию вверх не подымаем
            $(".section-slider").find(".slider-nav").css({'margin':0}); //четное
        }
        else {
          //а если не четное количество слайдов, удаляем стили добавленные ранее, т.к. в слайдах содержится разное количество слайдов, в одном может быть четное, а в другом нет
          $(".section-slider").find(".slider-nav").removeAttr("style");  //не четное
        }
}); 



$('.sItem1').slick({
  infinite: true,
  arrows: true,
  prevArrow: ".slidePrev2",
  nextArrow: ".slideNext2",
  adaptiveHeight: true,
  dots: false  
});
$('.sItem2').slick({
  infinite: true,
  arrows: true,
  prevArrow: ".slidePrev3",
  nextArrow: ".slideNext3",
  adaptiveHeight: true,
  dots: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        infinite: true,
        arrows: true,
        prevArrow: ".slidePrev3",
        nextArrow: ".slideNext3",
        adaptiveHeight: true,
        dots: false,
        slidesToShow: 2,
        slidesToScroll: 2        
      }
    },
    {
      breakpoint: 479,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1  
      }
    }     
  ]  
});

/*
  JS BASKET
*/


try {
  if(($('.header__cart').length) > 0) {
    $('#basketForm')[0].reset();
  }  
} catch (e) {}   

//изменение значений по кнопкам +/- в хедере
$('body').on('click', '.h-calc-minus, .h-calc-plus', function(e){
  e.preventDefault();
    var parentBox = $(this).closest(".h-list-item");
    var input = $(parentBox).find(".h-list-count");
    var newVal = parseInt($(input).val());

    if($(this).is(".h-calc-minus")) {
      if(newVal == 1) {
        return false;
      }
    }

    newVal = $(this).is(".h-calc-plus")
        ? newVal + 1
        : newVal - 1
    ;
    input.val(newVal);
    $(parentBox).find(".h-calc-val").text(newVal);

    var priceUnit = parseInt($(parentBox).find('.h-list-sum').attr('data-sum'));

    $(parentBox).find(".h-list-sum").val(priceUnit*newVal);
    $(parentBox).find(".h-pr-sum").text(priceUnit*newVal);

});

//удалить товар из хедера в корзине
$('body').on('click', '.h-list-del', function(e){
  e.preventDefault();
  $(this).closest('.h-list-item').remove();

  var countPrBasket = $('.h-cart-list li').length;
  $('.h-cart-col').text(countPrBasket);

  if(countPrBasket == 0) {
    $('.h-cart-col, .header__cart').hide();
  }
  
});


try {
  if(($('#basketFormPage').length) > 0) {
    $('#basketFormPage')[0].reset();
  }  
} catch (e) {}   
//изменение значений по кнопкам на странице корзины +/-
$('body').on('click', '.b-calc-minus, .b-calc-plus', function(e){
  e.preventDefault();
    var parentBox = $(this).closest(".basket-col");
    var input = $(parentBox).find(".b-col-count");
    var newVal = parseInt($(input).val());

    if($(this).is(".b-calc-minus")) {
      if(newVal == 1) {
        return false;
      }
    }

    newVal = $(this).is(".b-calc-plus")
        ? newVal + 1
        : newVal - 1
    ;
    input.val(newVal);
    $(parentBox).find(".b-col-val span").text(newVal);

    var priceUnit = parseInt($(parentBox).find('.b-col-sum').attr('data-sum'));

    $(parentBox).find(".b-col-sum").val(priceUnit*newVal);
    $(parentBox).find(".b-col-total .b-pr-sum").text(priceUnit*newVal);

    basketSum();

});

function basketSum() {
  var allPriceCounter = 0;

  $('.basket-col').each(function(){
    var itemPrice = $(this).find('.b-col-sum').val();
    allPriceCounter += parseInt(itemPrice);        
    $('.b-itog-sum').find('.b-pr-sum').text(allPriceCounter);
    $('.itogSum').val(allPriceCounter);
  });
    
}


//удалить товар корзине на странице
$('body').on('click', '.b-col-delet', function(e){
  e.preventDefault();
  $(this).closest('.basket-col').remove();
  setTimeout(function(){
    basketSum();
  }, 10);

  var countBasketCol = $('.basket-col').length;
  if(countBasketCol == 0) {
    $('.basket__itog').hide();
    $('.b-simple-text').show();

    $('.b-itog-sum').find('.b-pr-sum').text("0");
    $('.itogSum').val("0");    
  }
  

});




/*
  END JS BASKET
*/
    

});/*end document*/



function autoFun2() {
    var windowWidth = $(window).width();   

    var windowWidth2 = window.innerWidth;

    var docHeight = $(document).height();  


    setTimeout(function() {
        var prBoxLeng = $(".pr-slider .slick-current").find(".product-content").length;

        if(parseInt(prBoxLeng)%2==0) {
            //если четное количество слайдов, то навигацию вверх не подымаем
            $(".section-slider").find(".slider-nav").css({'margin':0}); //четное
        }
        else {
          //а если не четное количество слайдов, удаляем стили добавленные ранее, т.к. в слайдах содержится разное количество слайдов, в одном может быть четное, а в другом нет
          $(".section-slider").find(".slider-nav").removeAttr("style");  //не четное
        }

    },200);


    //угол изображения
    if((windowWidth2<1600) && (windowWidth2>=1366)) {//1440
        var podborW = $(".section-content").width();      
        var podborW_em = ((podborW*25)/100)/14;
        $(".podbor-corner").css({"borderWidth": "0 0 18.25em " +podborW_em+"em"});
    }
    else if((windowWidth2<1366) && (windowWidth2>=1200)) {
        var podborW = $(".section-content").width();
        var podborW_em = ((podborW*25)/100)/13;//12
        $(".podbor-corner").css({"borderWidth": "0 0 18.25em " +podborW_em+"em"});
    }  
    else if((windowWidth2<1200) && (windowWidth2>=640)) {
        var podborW = $(".section-content").width();
        var podborW_em = ((podborW*50)/100)/16;
        $(".podbor-corner").css({"borderWidth": "0 0 17.625em " +podborW_em+"em"});
    }   
    else if((windowWidth2<640) && (windowWidth2>=480)) {
        var podborW = $(".section-content").width();
        var podborW_em = ((podborW*50)/100)/14;
        $(".podbor-corner").css({"borderWidth": "0 0 17.625em " +podborW_em+"em"});
    }   
    else if((windowWidth2<480) && (windowWidth2>=300)) {
        var podborW = $(".section-content").width();
        var podborW_em = podborW/14;
        $(".podbor-corner").css({"borderWidth": "0 0 17.625em " +podborW_em+"em"});
    }                
    else {
        $(".podbor-corner").removeAttr('style')
    }
    
  
  $(".product-img, .lp-img").addClass("loader");


  if (windowWidth <=767 ){
    $(".callBox").fadeOut();
    $(".callModal").removeClass("active");
    $(".cat-menu").removeClass("active");
  }

  if(windowWidth2>=1200) {
    var dL1H = $(".dL1").height();
    var dL2H = $(".dL2").height();
    var dL3H = $(".dL3").height();
    var dL4H = $(".dL4").height();

    if(dL1H>dL2H) {
      var dlBottom = dL1H;
    }
    else {
      var dlBottom = dL2H;
    }    

    if(dL3H>dL4H) {
      var dlBottom1 = dL3H;
    }
    else {
      var dlBottom1 = dL4H;
    }

    if(dlBottom>dlBottom1) {
      var dlBottomAll = dlBottom;
    }
    else {
      var dlBottomAll = dlBottom1;
    }

    $(".dl-bottom").css({"height":+dlBottomAll+"px"});

  } 
  else {
    $(".dl-bottom").removeAttr("style");
  } 

  var titleHeight = $(".pageTitleBox").height();
  var iconHeight1 = $(".pt-icon-1").height();
  var iconHeight2 = $(".pt-icon-2").height();

  $(".pt-right").css({"height": titleHeight+"px"});
  $(".pt-icon-1").css({"margin": (titleHeight-iconHeight1)/2 +"px auto 0"});
  $(".pt-icon-2").css({"margin": (titleHeight-iconHeight2)/2 +"px auto 0"});

  //setTimeout('var titleHeight = $(".pageTitleBox").height(); var iconHeight1 = $(".pt-icon-1").height(); var iconHeight2 = $(".pt-icon-2").height(); $(".pt-right").css({"height": titleHeight+"px"}); $(".pt-icon-1").css({"margin": (titleHeight-iconHeight1)/2 +"px auto 0"}); $(".pt-icon-2").css({"margin": (titleHeight-iconHeight2)/2 +"px auto 0"});', 450);

  if (windowWidth2<1200) {

      if($(".section-slider").hasClass("view-list")) {

        $(".section-slider").removeClass("view-list").addClass("view-box");
        $('.pr-slider').slick('destroy');
        $('.pr-slider').on('init', function () {
            }).slick({
                infinite: true,
                arrows: true,
                prevArrow: ".slidePrev",
                nextArrow: ".slideNext",
                adaptiveHeight: true,
                dots: false       
          }); 

          $(".list-view").find("li.active").removeClass("active");
          $(".list-view .v-b").addClass("active");
      }

  }

  if (windowWidth2 >= 1200) {
    $(".open-accordion").removeClass("active");
    $(".podbor-accordion").removeAttr("style"); 
  }  


  //серываем меню открытое с левого блока
  if ( windowWidth <= 767) {

    if($(".menuOpen").hasClass("active")) {
      $(".prCatMobile").fadeOut();
      $(".menu__container").fadeOut();
      $(".menuOpen").removeClass("active");    
      setTimeout('$(".header-top").removeClass("navOpen"); $("footer").removeClass("navOpen");', 350);      
    }
      
  }





  if (windowWidth2 <= 1023) {
    var cInfo1 = $(".cInfo-1").height();
    var cInfo2 = $(".cInfo-2").height();
    var cInfo3 = $(".cInfo-3").height();
    var cInfo4 = $(".cInfo-4").height();

    if(cInfo1<cInfo2) {
      var cInfoH = cInfo2;
    }
    else {
      var cInfoH = cInfo1;
    }    

    if(cInfo3<cInfo4) {
      var cInfoH2 = cInfo4;
    }
    else {
      var cInfoH2 = cInfo3;
    }    

    if(cInfoH<cInfoH2) {
      var complectInfoH = cInfoH2;

      $(".complect-info").css({"height":complectInfoH+"px"});

    }
    else {
      var complectInfoH = cInfoH;
      $(".complect-info").css({"height":complectInfoH+"px"});
    }



  }
  else {
    $(".complect-info").removeAttr("style");
  }
//prVideo


    
}
window.addEventListener("load", autoFun2);
window.addEventListener("resize", autoFun2);