"use strict";

$(document).ready(function(){
  // NAV UNDERLINE
    let underlineMenuItems = document.querySelectorAll(".menu-mp .menu-mp-link");
    let nav = document.querySelector("nav");

    function pageIndicator (){
        if (nav.classList.contains("nav-mp-link")){
            underlineMenuItems[0].classList.add("active");
        } else if (nav.classList.contains("nav-news-link")){
            underlineMenuItems[1].classList.add("active");
        } else if (nav.classList.contains("nav-comp-link")){
            underlineMenuItems[2].classList.add("active");
        } else if (nav.classList.contains("nav-invest-link")){
            underlineMenuItems[3].classList.add("active");
        } else if (nav.classList.contains("nav-guide-link")){
            underlineMenuItems[4].classList.add("active");
        } else if (nav.classList.contains("nav-art-link")){
            underlineMenuItems[5].classList.add("active");
        } else if (nav.classList.contains("nav-cont-link")){
            underlineMenuItems[6].classList.add("active");
        } 
    }

    pageIndicator();

    // SPONSORS SLIDER
    $('.customer-logos').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });

  // NAV HAMBRUGER FUNCTION
    const menu = document.querySelector('.menu-mp');
    const menuItem = document.querySelectorAll('.menu-mp-link');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu-mp_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu-mp_active');
        });
    });

  // NAV FIXING TO SCROLL      
    window.onscroll = function() {myFunction();
    };

    let header = document.getElementById("myHeader");
    let headerNews = document.getElementById("myHeaderNews");
    let sticky = 0;
    
    headerPage();

    function headerPage(){
        if (header){
            sticky = header.offsetTop;
            return sticky;
        } else {
            sticky = headerNews.offsetTop;
            return sticky;
        }
    }
    
    function addHeader(){
        if (header) {
            header.classList.add("sticky");
        }else {
            headerNews.classList.add("sticky-news");
        }
    }
    function removeHeader(){
        if (header) {
            header.classList.remove("sticky");
        }else {
            headerNews.classList.remove("sticky-news");
        }
    }

    function myFunction() {
        if (window.pageYOffset > sticky) {
            addHeader();
        } else {
            removeHeader();
        }
    }

    // Smooth scroll and pageup

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('.pageup').on('click', function(){
        $("html,body").animate({scrollTop:0}, 800);
    });
   

    //PAGINATION NEWS PAGE

    let numberOfItems = $('#loop .list-group').length;
    let limitPerPage = 9;
    $('#loop .list-group:gt(' + (limitPerPage - 1) + ')' ).hide();
    let totalPages = Math.round(numberOfItems / limitPerPage);
    $(".pagi-news").append("<li id='previous-page'><a class='page-link' href='javascript:void(0)' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>");
    $(".pagi-news").append("<li class='page-item active'><a class='page-link' href='javascript:void(0)'>"+ 1 +"</a></li>");
    for (let i = 2; i <= totalPages; i++){
        $(".pagi-news").append("<li class='page-item'><a class='page-link' href='javascript:void(0)'>" + i + "</a></li>");
    }
    $(".pagi-news").append("<li id='next-page'><a class='page-link' href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li>");

     
    $(".pagi-news li.page-item").on("click", function() {
        if($(this).hasClass("active")){
            return false;
        } else {
            let currentPage = $(this).index();
            $(".pagi-news li").removeClass("active");
            $(this).addClass("active");
            $("#loop .list-group").hide();

            let grandTotal = limitPerPage * currentPage;
            for(let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $("#loop .list-group:eq(" + i + ")").show();
            }
        }
    });

    $("#next-page").on("click", function () {
        let currentPage = $(".pagi-news li.active").index();
        
        if (currentPage === totalPages){
            return false;
        } else {
            currentPage++;
            
            $(".pagi-news li").removeClass("active");
            $("#loop .list-group").hide();

            let grandTotal = limitPerPage * currentPage;

            for(let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $("#loop .list-group:eq(" + i + ")").show();
            }
            $(".pagi-news li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
        }
    });
    $("#previous-page").on("click", function () {
        let currentPage = $(".pagi-news li.active").index();
        
        if (currentPage === 1){
            return false;
        } else {
            currentPage--;
            
            $(".pagi-news li").removeClass("active");
            $("#loop .list-group").hide();

            let grandTotal = limitPerPage * currentPage;

            for(let i = grandTotal - limitPerPage; i < grandTotal; i++) {
                $("#loop .list-group:eq(" + i + ")").show();
            }
            $(".pagi-news li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
        }
    });


    //PAGINATION COMP PAGE
    let numberOfComp = $('#loop-comps .profile-cp').length;
    let limitPerPageComp = 10;
    $('#loop-comps .profile-cp:gt(' + (limitPerPageComp - 1) + ')' ).hide();
    let totalPagesComp = Math.round(numberOfComp / limitPerPageComp);

    $(".pagi-comps").append("<li id='previous-page-comp'><a class='page-link' href='javascript:void(0)' aria-label='Previous'><span aria-hidden='true'>&laquo;</span></a></li>");
    $(".pagi-comps").append("<li class='page-item active'><a class='page-link' href='javascript:void(0)'>"+ 1 +"</a></li>");
    for (let i = 2; i <= totalPagesComp; i++){
        $(".pagi-comps").append("<li class='page-item'><a class='page-link' href='javascript:void(0)'>" + i + "</a></li>");
    }
    $(".pagi-comps").append("<li id='next-page-comp'><a class='page-link' href='javascript:void(0)' aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li>");
   
    $(".pagi-comps li.page-item").on("click", function() {
        if($(this).hasClass("active")){
            return false;
        } else {
            let currentPage = $(this).index();
            $(".pagi-comps li").removeClass("active");
            $(this).addClass("active");
            $("#loop-comps .profile-cp").hide();

            let grandTotal = limitPerPageComp * currentPage;
            for(let i = grandTotal - limitPerPageComp; i < grandTotal; i++) {
                $("#loop-comps .profile-cp:eq(" + i + ")").show();
            }
        }
    });
    $("#next-page-comp").on("click", function () {
        let currentPage = $(".pagi-comps li.active").index();
        
        if (currentPage === totalPagesComp){
            return false;
        } else {
            currentPage++;
            
            $(".pagi-comps li").removeClass("active");
            $("#loop-comps .profile-cp").hide();

            let grandTotal = limitPerPageComp * currentPage;

            for(let i = grandTotal - limitPerPageComp; i < grandTotal; i++) {
                $("#loop-comps .profile-cp:eq(" + i + ")").show();
            }
            $(".pagi-comps li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
        }
    });
    $("#previous-page-comp").on("click", function () {
        let currentPage = $(".pagi-comps li.active").index();
        
        if (currentPage === 1){
            return false;
        } else {
            currentPage--;
            
            $(".pagi-comps li").removeClass("active");
            $("#loop-comps .profile-cp").hide();

            let grandTotal = limitPerPageComp * currentPage;

            for(let i = grandTotal - limitPerPageComp; i < grandTotal; i++) {
                $("#loop-comps .profile-cp:eq(" + i + ")").show();
            }
            $(".pagi-comps li.page-item:eq(" + (currentPage - 1) + ")").addClass('active');
        }
    });

    //var headerHtml = document.getElementById('header-temp');
	
});




