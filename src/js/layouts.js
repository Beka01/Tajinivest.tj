
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

    


   

   

    


  

  



