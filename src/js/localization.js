"use strict";
const DEFAULT_LOCALE = 'ru';
var currentLocale = localStorage.getItem('locale') || DEFAULT_LOCALE;

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
   
}

$('.lang-choose a').on('click', function(e){
    const thisel = $(this);
    currentLocale = thisel.data('lang');
    localStorage.setItem('locale', currentLocale);
    localize();
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
