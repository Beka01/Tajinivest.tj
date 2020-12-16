
   loadTemplates('layouts/header.html', 'header-container');
   loadTemplates('layouts/nav.html', 'header-main-menu');
   loadTemplates('layouts/contacts.html', 'contacts-section');
   loadTemplates('layouts/sponsors.html', 'sponsors-section');
   loadTemplates('layouts/partners.html', 'partners-section');
   loadTemplates('layouts/footer.html', 'main-footer');
   loadTemplates('layouts/registration.html', 'regcompform');
   loadTemplates('layouts/verifmodal.html', 'open-modal');
   loadTemplates('layouts/contacts-bottom.html', 'contact-bottom-section');
   loadTemplates('layouts/header-news.html', 'news-title-text-box');
   loadTemplates('layouts/header-activity.html', 'activity-title-text-box');
   loadTemplates('layouts/header-company.html', 'company-title-text-box');
   loadTemplates('layouts/header-invest.html', 'invest-title-text-box');
   loadTemplates('layouts/header-business.html', 'business-title-text-box');
   loadTemplates('layouts/header-article.html', 'article-title-text-box');
   loadTemplates('layouts/login.html', 'login-wrapper');

    function loadTemplates(url, id){
        window.lm.start("layouts: " + url);
        $.get(url, function(headerEl) {
            let headerContainer = document.getElementById(id);
            if(headerContainer){
               headerContainer.innerHTML = headerEl; 
            }
            window.lm.finish("layouts: " + url);
        });
        
    }

    

    


   

   

    


  

  



