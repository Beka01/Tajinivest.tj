"use strict";
const DEFAULT_LOCALE = 'ru';
var currentLocale = localStorage.getItem('locale') || DEFAULT_LOCALE;
let validationMessages = {};

$(document).ready(function () {
localize();

function localize(){
   
    // MENU HEADER
    $.get('locale/menu/' + currentLocale + '.json', function(ans){
        localizeMenu(ans);
       
    }).fail( function (){
        $.get('locale/menu/' + DEFAULT_LOCALE + '.json', function(ans){
            localizeMenu(ans);
        });
    });

    // FOOTER
    $.get('locale/footer/' + currentLocale + '.json', function(ans){
        localizeFooter(ans);
    }).fail( function (){
        $.get('locale/footer/' + DEFAULT_LOCALE + '.json', function(ans){
            localizeFooter(ans);
        });
    });

    //REGISTRATION
    $.get('locale/registration/' + currentLocale + '.json', function(ans){
        locRegJson(ans);
    }).fail( function (){
        $.get('locale/registration/' + DEFAULT_LOCALE + '.json', function(ans){
            locRegJson(ans);
        });
    });
    
    localeRegistration();  
    checkBoxSwitcher();
    
   
}

$('.lang-choose a').on('click', function(e){
    const thisel = $(this);
    currentLocale = thisel.data('lang');
    localStorage.setItem('locale', currentLocale);
    localize();
    window.loadValidationMessages('#regcompform form');
    e.preventDefault();
    return false;
}); 
// MENU HEADER
function localizeMenu(menu){
    for (let m of menu.links){
        $('.menu-mp a[href='+m.url.replace('\.', '\\.')+']').text(m.name);
    }
    for (let t in menu.texts){
        $('#' + t).text(menu.texts[t]);
    }
}
// FOOTER
function localizeFooter(footer){
    for (let m of footer.links){
        $('.footer_lists_map a[href='+ m.url.replace('\.', '\\.') +']').text(m.name);
    }
    for (let t in footer.texts){
        $('#' + t).text(footer.texts[t]);
    }
    for (let t of footer.attrs){
        $('#' + t.id).attr(t.attr, t.value);
    }
}
// REGISTRATION LOCALIZATION
function locRegJson(registration){
    for (let t of registration.attrs){
        $('#' + t.id).attr(t.attr, t.value);
    }
    for (let t in registration.texts){
        $('#' + t).html(registration.texts[t]);
    }
}

function localeRegistration(){
    // REG TITLE
    $('.modal-reg-header [data-lang]').hide();
    $('.modal-reg-header [data-lang =' + currentLocale + ']').show();

    // INPUT COMPANY NAME
    $('.company_name [data-lang]').hide();
    $('.company_name [data-lang =' + currentLocale + ']').show();

    // INPUT COMPANY ADDRESS
    $('.company_address [data-lang]').hide();
    $('.company_address [data-lang =' + currentLocale + ']').show();

    // INPUT COMPANY DESCRIPTION
    $('.company_description [data-lang]').hide();
    $('.company_description [data-lang =' + currentLocale + ']').show();

}
function checkBoxSwitcher(){
    if(window.currentLocale == "ru"){
      $("#chbox-tj").show();
      $("#chbox-en").show();
      $("#chbox-ru").hide();
    } else if(window.currentLocale == "en") {
      $("#chbox-tj").show();
      $("#chbox-ru").show();
      $("#chbox-en").hide();
    }else if(window.currentLocale == "tj") {
      $("#chbox-en").show();
      $("#chbox-ru").show();
      $("#chbox-tj").hide();
    }
  } 

//Validation form text translation function
// function validTextCompName(){
//     const cNameRu = "Вы не указали название вашей компании";
//     const cNameEn = "You have not provided your company name";
//     const cNameTj = "Шумо номи ширкати худро ворид накардед";

//     if(window.currentLocale == "ru"){
//         return cNameRu;
//     } else if (window.currentLocale == "en") {
//         return cNameEn;
//     } else if (window.currentLocale == "tj"){
//         return cNameTj;
//     }
// }

// function fillValidationMessages() {
//     $.get('locale/validate/' + currentLocale + '.json' , function(ans){
//        window.validationMessages = (ans);
//        window.validateForms('#regcompform form');
       
//     }).fail( function (){
//         $.get('locale/validate/' + DEFAULT_LOCALE + '.json', function(ans){
//             window.validationMessages = (ans);
//             window.validateForms('#regcompform form');
//         });
//     });
// }
});