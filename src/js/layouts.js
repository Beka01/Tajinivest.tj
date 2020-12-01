
    $.get("layoutpage.html", function(headerEl) {
        const templElem = $(headerEl)[17];

        // header menu
        const headerTempEl = templElem.content;
        const headerInHtml = document.importNode(headerTempEl, true);
        if (document.getElementById('header-container') == null){
        } else {
            document.getElementById('header-container').appendChild(headerInHtml);
        }
        
    });

    $.get("layoutpage.html", function(navEl) {
        const templElem = $(navEl)[19];

         // nav menu
        const menuTempEl = templElem.content;
        const menuInHtml = document.importNode(menuTempEl, true);
        if (document.getElementById('header-main-menu') == null){
            } else {
                document.getElementById('header-main-menu').appendChild(menuInHtml);
            }
    });

    $.get("layoutpage.html", function(contactsEl) {
        const templElem = $(contactsEl)[21];

      // footer
        const contactsTempEl = templElem.content;
        const contactsInHtml = document.importNode(contactsTempEl, true);
        if (document.getElementById('contacts-section') == null){
            } else {
                document.getElementById('contacts-section').appendChild(contactsInHtml);
            }
    });


    $.get("layoutpage.html", function(sponsorsEl) {
        const templElem = $(sponsorsEl)[23];

      // sponsors
        const sponsorsTempEl = templElem.content;
        const sponsorsInHtml = document.importNode(sponsorsTempEl, true);
        if (document.getElementById('sponsors-section') == null){
        } else {
            document.getElementById('sponsors-section').appendChild(sponsorsInHtml);
        }
    });


    $.get("layoutpage.html", function(partnersEl) {
        const templElem = $(partnersEl)[25];

     //partners
        const partnersTempEl = templElem.content;
        const partnersInHtml = document.importNode(partnersTempEl, true);
        if (document.getElementById('partners-section') == null){
            } else {
                document.getElementById('partners-section').appendChild(partnersInHtml);
            }
    });

    $.get("layoutpage.html", function(footerEl) {
        const templElem = $(footerEl)[27];
        //console.log($(footerEl));
      
      
      // footer
        const footerTempEl = templElem.content;
        const footerInHtml = document.importNode(footerTempEl, true);
        if (document.getElementById('main-footer') == null){
            } else {
                document.getElementById('main-footer').appendChild(footerInHtml);
            }
    });

    $.get("layoutpage.html", function(registrationEl) {
        const templElem = $(registrationEl)[29];
        //console.log(templElem);

      // footer
        const registrationTempEl = templElem.content;
        const registrationinHtml = document.importNode(registrationTempEl, true);
        if (document.getElementById('regcompform') == null){
            } else {
                document.getElementById('regcompform').appendChild(registrationinHtml);
            }
    });

    $.get("layoutpage.html", function(verificationEl) {
        const templElem = $(verificationEl)[31];

      // footer
        const verificationTempEl = templElem.content;
        const verificationInHtml = document.importNode(verificationTempEl, true);
        if (document.getElementById('open-modal') == null){
            } else {
                document.getElementById('open-modal').appendChild(verificationInHtml);
            }
    });

    $.get("layoutpage.html", function(newsTitleSectionEl) {
        const templElem = $(newsTitleSectionEl)[33];

      // footer
        const newsTitleSectionTempEl = templElem.content;
        const newsTitleSectionInHtml = document.importNode(newsTitleSectionTempEl, true);
        if (document.getElementById('news-title-text-box') == null){
            } else {
                document.getElementById('news-title-text-box').appendChild(newsTitleSectionInHtml);
            }
    });

    $.get("layoutpage.html", function(activityTitleSectionEl) {
        const templElem = $(activityTitleSectionEl)[35];

      // footer
        const activityTitleSectionTempEl = templElem.content;
        const activityTitleSectionInHtml = document.importNode(activityTitleSectionTempEl, true);
        if (document.getElementById('activity-title-text-box') == null){
            } else {
                document.getElementById('activity-title-text-box').appendChild(activityTitleSectionInHtml);
            }
    });

    $.get("layoutpage.html", function(companyTitleSectionEl) {
        const templElem = $(companyTitleSectionEl)[37];

      // footer
        const companyTitleSectionTempEl = templElem.content;
        const companyTitleSectionInHtml = document.importNode(companyTitleSectionTempEl, true);
        if (document.getElementById('company-title-text-box') == null){
            } else {
                document.getElementById('company-title-text-box').appendChild(companyTitleSectionInHtml);
            }
    });

    $.get("layoutpage.html", function(investTitleSectionEl) {
        const templElem = $(investTitleSectionEl)[39];

      // footer
        const investTitleSectionTempEl = templElem.content;
        const investTitleSectionInHtml = document.importNode(investTitleSectionTempEl, true);
        if (document.getElementById('invest-title-text-box') == null){
            } else {
                document.getElementById('invest-title-text-box').appendChild(investTitleSectionInHtml);
            }
    });

    $.get("layoutpage.html", function(businessTitleSectionEl) {
        const templElem = $(businessTitleSectionEl)[41];

      // footer
        const businessTitleSectionTempEl = templElem.content;
        const businessTitleSectionInHtml = document.importNode(businessTitleSectionTempEl, true);
        if (document.getElementById('business-title-text-box') == null){
            } else {
                document.getElementById('business-title-text-box').appendChild(businessTitleSectionInHtml);
            }
    });

    $.get("layoutpage.html", function(articleTitleSectionEl) {
        const templElem = $(articleTitleSectionEl)[43];

      // footer
        const articleTitleSectionTempEl = templElem.content;
        const articleTitleSectionInHtml = document.importNode(articleTitleSectionTempEl, true);
        if (document.getElementById('article-title-text-box') == null){
            } else {
                document.getElementById('article-title-text-box').appendChild(articleTitleSectionInHtml);
            }
    });

    


   

   

    


  

  



