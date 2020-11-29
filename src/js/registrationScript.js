"use strict";
let sectors = [];
let countries = [];
let cities = [];
let registrationValidateMessages = {};

function loadValidationMessages(form) {
  $.get('locale/registrationValidate.json' , function(ans){
    registrationValidateMessages = ans;
    bindFormValidate(form);
  });
}

function bindFormValidate (form){
  $(form).off('click');
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      address: {
        required: true,
        minlength: 8
      },
      selectarea: {
        min: 0
      },
      selectcountry: {
        min: 0
      },
      // city: {
      //   min: 0
      // },
      phone: {
        required: true
      },
      tel: {
        required: true
      },
      password: {
        required: true,
        minlength: 6
      },
      repassword: {
        required: true,
        equalTo: "#regcomppass"
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: registrationValidateMessages.name.required[window.currentLocale],
        minlength: registrationValidateMessages.name.minlength[window.currentLocale]
      },
      address: {
        required: "Вы не указали адрес вашей компании",
        minlength: "В адресе должно быть не меньше восьми символов"
      },

      selectarea: {
        min: "Выберите область деятельности вашей компании"
      },
      // city: {
      //   min: "Выберите город в которой ваша компания зарегистрирована"
      // },
      selectcountry: {
        min: "Выберите страну в которой ваша компания зарегистрирована"
      },
      phone: {
        required: "Укажите рабочий номер телефона"
      },
      tel: {
        required: "Укажите номер телефона для привязки аккаунта"
      },
      password: {
        required: "Введите пароль",
        minlength: "Пароль должен быть не менее 6 символов"
      },
      repassword: {
        required: "Повторите введенный пароль",
        equalTo: "Пароли не совпадают"
      },
      email: {
        required: "Укажите свою электронную почту",
        email: "Неправильно введен адрес почты"
      }
    }
  });
}

$(document).ready(function () {

  const database = firebase.database();
  const rootRef = database.ref('main-sectors');
  const rootCountries = database.ref('countries');

  

  // GET DATA FOR SECTORS SELECT FORM
  function getData() {
    rootRef.once("value").then(function (sectorsData) { // получили все данные с базы
      sectorsData.forEach(function (sector) { // проходим по каждому сектору
        sectors[sector.key] = sector.val();

      });
    });

    // GET DATA FOR COUNTRIES SELECT FORM
    rootCountries.once("value").then(function (countriesData) { // получили все данные с базы
      countriesData.forEach(function (country) { // проходим по каждой стране
        countries[country.key] = Object.assign(
          {},
          country.child('name').val(),
          { id: country.child('countryId').val(), cities: country.child('cities').val() }
        );

      });
    }).then(() => {
      createPage();
    });
  }

  getData();

  function createPage() {
    setSectors();
    setCountries();
  }
  // APPEND FIREBASE DATA FOR SECTORS SELECT FORM TO THE HTML 
  function setSectors() {
    $(".sectors-reg").empty();
    sectors.sort(function(a, b){
      return a[window.currentLocale] < b[window.currentLocale] ? -1 : 1;
    });
    sectors.forEach((sector, sectorId) => {
      const sectorOption = `<option id="sector${sectorId}" value="${sectorId}">${sector[window.currentLocale]}</option>`;
      $(".sectors-reg").append(sectorOption);
    });
  }


  // APPEND FIREBASE DATA FOR COUNTRIES SELECT FORM TO THE HTML
  function setCountries() {
    let countryListEl = $(".country-reg-select");
    const tajikistanId = 211;
    countryListEl.empty();
    countries.sort(function(a, b){
      return a[window.currentLocale] < b[window.currentLocale] ? -1 : 1;
    });
    countries.forEach((country, index) => {
      const selected = country.id === tajikistanId ? ` selected=selected` : "";
      const countryOption = `<option id="country-sel${index}" value="${country.id}">${country[window.currentLocale]}</option>`;
      
      countryListEl.append(countryOption);
      
    });

    countryListEl.val(tajikistanId).trigger('change');
  }

  $('#regcountry').on('change', function (event) {
    //console.log('event', event.target.value);
    const countryId = +event.target.value;
    const country = countries.find((country) => country.id === countryId);

    if (country.cities !== null) {
      $('#city-select').empty();
      country.cities.sort(function(a, b){
        return a[window.currentLocale] < b[window.currentLocale] ? -1 : 1;
      });
      country.cities.forEach((city, index) => {
        const cityOption = `
          <option id="${city[window.currentLocale]}-${index}" value="${index}">${city[window.currentLocale]}</option>
        `;
        $('#city-select').append(cityOption);
        
      });
      $('#city-input').hide();
      $('#city-select').show();
    } else {
      $('#city-select').empty();
      $('#city-select').hide();
      $('#city-input').show();
    }
  });

  window.tippy('#regcompemail', {
    content: 'Укажите действующую почту, так как на нее будет отправлен код подтверждения для дальнейшей верификации.',
    animation: 'fade'
  });

  window.tippy('#regcompphone', {
    content: 'В формате: + код страны, код города, номер. Например +992 37 221 87 32',
    animation: 'fade'
  });

  window.tippy('#regname', {
    content: 'Пожалуйста заполните форму в следующем порядке: организационно-правовая форма субъекта; официальное наименование предприятия. Например ООО "Душанбе" или ГУП "Таджинвест."',
    animation: 'fade',
  });
  window.tippy('#logo_file', {
    content: 'Загрузите логотип вашей компании, вы также можете загрузить логитип позже через вашу администраторскую панель'
  });


  // PHONE COUNTRY CODES PLUGIN CONNECT
  let input = document.querySelector("#phone");
  window.intlTelInput(input, {
    // allowDropdown: false,
    // autoHideDialCode: false,
    // autoPlaceholder: "off",
    // dropdownContainer: document.body,
    // excludeCountries: ["us"],
    // formatOnDisplay: false,

    geoIpLookup: function (callback) {
      $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
        var countryCode = (resp && resp.country) ? resp.country : "";
        callback(countryCode);
      });
    },

    //hiddenInput: "full_number",
    defaultCountry: "auto",
    //localizedCountries: { 'tj': 'Tajikistan' },
    // nationalMode: false,
    // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
    // placeholderNumberType: "MOBILE",
    preferredCountries: ['tj'],
    separateDialCode: true,
    utilsScript: "../js/phone-script/utils.js",
  });

  // REGISTRATION FORM VALIDATOR
  loadValidationMessages('#regcompform form');
  
  


  // FIREBASE AUTH FUNCTION 
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if ($('#regcompform form').valid()) {
      // get user info from registration form
      console.log('validate');
      // INPUT COMPANY NAME
      const companyNameRu = signupForm['regname-ru'].value;
      const companyNameEn = signupForm['regname-en'].value;
      const companyNameTj = signupForm['regname-tj'].value;

      // INPUT COMPANY ADDRESS
      const companyAddressRu = signupForm['regaddress-ru'].value;
      const companyAddressEn = signupForm['regaddress-en'].value;
      const companyAddressTj = signupForm['regaddress-tj'].value;

      const companyCountry = signupForm['regcountry'].options[signupForm['regcountry'].selectedIndex].innerText;
      const companyCountryId = signupForm['regcountry'].value;
      const companyCity = signupForm['city-select'].value;
      const companyCityName = signupForm['city-select'].options[signupForm['city-select'].selectedIndex].innerText;
      const companyCityInput = signupForm['city-input'].value;

      // INPUT COMPANY DESCRIPTION
      const companyDescrRu = signupForm['regcompdescr-ru'].value;
      const companyDescrEn = signupForm['regcompdescr-en'].value;
      const companyDescrTj = signupForm['regcompdescr-tj'].value;
      const transToRuss = signupForm['allow-ru'].checked ? 1 : 0;
      const transToEng = signupForm['allow-en'].checked ? 1 : 0;
      const transToTaj = signupForm['allow-tj'].checked ? 1 : 0;
      //const companyArea = signupForm['regcomparea'].options[signupForm['regcomparea'].selectedIndex];
      const companyAreaId = signupForm['regcomparea'].value;
      const companyWeb = signupForm['regcompweb'].value;
      const companyInsta = signupForm['regcompinsta'].value;
      const companyFsb = signupForm['regcompfacebook'].value;
      const companyRegPhone = signupForm['phone'].value;
      const companyFax = signupForm['regcompfax'].value;
      const companyPhone = signupForm['regcompphone'].value;
      const companyContactName = signupForm['regcontname'].value;
      const email = signupForm['regcompemail'].value;
      const password = signupForm['regcomppass'].value;
      let logoFile =  signupForm['logo_file'].files[0]; //change 
     
      
      

        /*Maximum allowed size in bytes
        5MB Example
        Change first operand(multiplier) for your needs*/
        const maxAllowedSize = 240 * 1024;
        if (logoFile.size > maxAllowedSize) {
          const inputLogoFile = $(signupForm['logo_file']);
          const parentContainer = inputLogoFile.parent();
          const labelError = parentContainer.find('label.error');
          labelError.show();
          labelError.html('Слишком большой файл');
          inputLogoFile.addClass('error');
          return;
        }
        
        
      firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {

        firebase.firestore().doc(`users/${cred.user.uid}`).set({
          companyNameRu: companyNameRu,
          companyNameEn: companyNameEn,
          companyNameTj: companyNameTj,
          companyAddressRu: companyAddressRu,
          companyAddressEn: companyAddressEn,
          companyAddressTj: companyAddressTj,
          companyCountry: companyCountry,
          companyCountryId: companyCountryId,
          companyCity: companyCity,
          companyCityName: companyCityName,
          companyCityInput: companyCityInput,
          companyDescrRu: companyDescrRu,
          companyDescrEn: companyDescrEn,
          companyDescrTj: companyDescrTj,
          transToRuss: transToRuss,
          transToEng: transToEng,
          transToTaj: transToTaj,
          //companyArea: companyArea,
          companyAreaId: companyAreaId,
          companyWeb: companyWeb,
          companyInsta: companyInsta,
          companyFsb: companyFsb,
          companyRegPhone: companyRegPhone,
          companyFax: companyFax,
          companyPhone: companyPhone,
          companyContactName: companyContactName,
          companyUid: cred.user.uid,
          companyEmail: cred.user.email,
          companyLogoId: null
        });

        let userVerify = cred.user.uid;
        /* const metadata = {
          contentType: file.type
        };
        */
        //delete later
        const metadata = { contentType: logoFile.type};
        const ref = firebase.storage().ref();   //ref to the storage
        const name = 'Users company logo/' + userVerify; //name of folder to save
        const task = ref.child(name).put(logoFile, metadata);

        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                //after getting the ref from the uploaded pic update user
                firebase.firestore().doc(`users/${cred.user.uid}`).update({ 
                  
                  companyLogoId: url   });
           });
      
        // user update the logo id
        userVerificationLink();
      });


      $('#regcompform').fadeOut('fast');
      $(this).find('.modal-reg-wrapper').trigger('reset');
      $(this).find('label.error').hide();
      $(".error").removeClass("error");
      $('.overlay-reg, #open-modal').fadeIn('slow');

    } else {
      
        if ($('#city-input').length == 0){
          const inputCity = $('#city-input');
          const parentContainer = inputCity.parent();
          const labelError = parentContainer.find('label.error');
          labelError.show();
          labelError.html('Укажите город в которой ваша компания зарегистрирована');
          inputCity.addClass('error');
          return;
        }
      console.log('Not validate');
    
    }

  });

  function userVerificationLink() {
    let userVerify = firebase.auth().currentUser;

    userVerify.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }


  $('[data-modal=compreg]').on('click', () => {
    $('.overlay-reg, #regcompform').fadeIn('slow');
    setCountries();
    setSectors();
  });

  //Close btn block
  $('#reg-close-btn').on('click', () => {
    $('.overlay-reg, #regcompform').fadeOut('fast');
    $(this).find('.modal-reg-wrapper').trigger('reset');
    $(this).find('label.error').hide();
    $(".error").removeClass("error");
  });
  $('.modal-act').on('click', () => {
    $('.overlay-reg, #open-modal').fadeOut('fast');
    $(this).find('.modal-reg-wrapper').trigger('reset');
    $(this).find('label.error').hide();
    $(".error").removeClass("error");
  });

  

  
  //  function
  
});




