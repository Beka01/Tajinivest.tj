let currentLocale = 'ru';
const DEFAULT_LOCALE = 'ru';


localize();

function localize(){
    $.get('locale/menu/' + currentLocale + '.json', function(ans){
        //const menu = JSON.parse(ans);
        localizeMenu(ans);
       
    }).fail( function (){
        $.get('locale/menu/' + DEFAULT_LOCALE + '.json', function(ans){
            //const menu = JSON.parse(ans);
            localizeMenu(ans);
        });
    });
}

$('.lang-choose a').on('click', function(e){
    const thisel = $(this);
    currentLocale = thisel.data('lang');
    localize();
    e.preventDefault();
    return false;
}); 

function localizeMenu(menu){
    for (let m of menu){
        console.log(m.url, m.name);
        $('.menu-mp a[href='+m.url.replace('\.', '\\.')+']').text(m.name);
        console.log($('.menu-mp a[href='+m.url.replace('\.', '\\.')+']'));
    }
}