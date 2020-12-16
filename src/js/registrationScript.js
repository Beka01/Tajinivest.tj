"use strict";
let sectors = [];
let countries = [];
let cities = [];
let registrationValidateMessages = {};
let registerValidator;
var tellInput;

function loadValidationMessages(form) {
  $.get('locale/registrationValidate.json' , function(ans){
    registrationValidateMessages = ans;
    bindFormValidate(form);
  });
}

function bindFormValidate (form){
  if(registerValidator){
    registerValidator.destroy();
  }
  registerValidator = $(form).validate({
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
        required: true,
      },
      selectcountry: {
        min: 0
      },
      cityinput: {
        required: true,
        minlength: 2
       },
      phone: {
        required: true,
        number: true,
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
      contactperson: {
        required: true,
        minlength: 3
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
        required: registrationValidateMessages.address.required[window.currentLocale],
        minlength: registrationValidateMessages.address.minlength[window.currentLocale]
      },

      selectarea: {
        required: "Выберите область деятельности вашей компании"
      },
      cityinput: {
        required: registrationValidateMessages.cityinput.required[window.currentLocale],
        minlength: registrationValidateMessages.cityinput.minlength[window.currentLocale]
      },
      selectcountry: {
        min: "Выберите страну в которой ваша компания зарегистрирована"
      },
      phone: {
        required: registrationValidateMessages.phone.required[window.currentLocale],
        number: registrationValidateMessages.phone.number[window.currentLocale]
      },
      tel: {
        required: "Укажите номер телефона для привязки аккаунта"
      },
      password: {
        required: registrationValidateMessages.password.required[window.currentLocale],
        minlength: registrationValidateMessages.password.minlength[window.currentLocale]
      },
      repassword: {
        required: registrationValidateMessages.repassword.required[window.currentLocale],
        equalTo: registrationValidateMessages.repassword.equalTo[window.currentLocale]
      },
      contactperson: {
        required: registrationValidateMessages.contactperson.required[window.currentLocale],
        minlength: registrationValidateMessages.contactperson.minlength[window.currentLocale]
      },
      email: {
        required: registrationValidateMessages.email.required[window.currentLocale],
        email: registrationValidateMessages.email.email[window.currentLocale]
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
    $(".sectors-reg").append(`<option value="">Выберите опцию</option>`);
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
    const countryId = +event.target.value;
    const country = countries.find((country) => country.id === countryId);

    if (country && country.cities !== null) {
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

  const emailTippyLocale = {
    'ru': 'Укажите действующую почту, так как на нее будет отправлен код подтверждения для дальнейшей верификации',
    'en': 'Enter a valid email address, as a confirmation code will be sent to it for further verification',
    'tj': 'Суроғаи почтаи электронии дурустро ворид кунед, зеро коди тасдиқ барои тасдиқи иловагӣ ба он фиристода мешавад'
  };
  window.tippy('#regcompemail', {
    content: emailTippyLocale[currentLocale],
    animation: 'fade'
  });

  const phoneTippyLocale = {
    'ru': 'В формате: + код страны, код города, номер. Например +992 37 221 87 32',
    'en': 'In the format: + country code, city code, number. For example +992 37 221 87 32',
    'tj': 'Дар формат: + коди кишвар, коди шаҳр, рақам. Масалан +992 37 221 87 32'
  };
  window.tippy('#regcompphone', {
    content: phoneTippyLocale[currentLocale],
    animation: 'fade'
  });

  const nameTippyLocale = {
    'ru': 'Пожалуйста заполните форму в следующем порядке: организационно-правовая форма субъекта; официальное наименование предприятия. Например ООО "Душанбе" или ГУП "Таджинвест."',
    'en': 'Please fill out the form in the following order: organizational and legal form of the entity; the official name of the enterprise. For example, LLC "Dushanbe" or State Unitary Enterprise "Tajinvest."',
    'tj': 'Лутфан варақаро бо тартиби зерин пур кунед: шакли ташкилию ҳуқуқии субъект; номи расмии корхона. Масалан, ҶДММ "Душанбе" ё Корхонаи Воҳиди Давлатии "Тоҷинвест"'
  };
  window.tippy('#regname', {
    content: nameTippyLocale[currentLocale],
    animation: 'fade'
  });

  const logoTippyLocale = {
    'ru': 'Загрузите логотип вашей компании, вы также можете загрузить логитип позже через вашу администраторскую панель',
    'en': 'Upload your company logo, you can also upload your logo later via your admin panel',
    'tj': 'Логотипи ширкати худро бор кунед, шумо метавонед инчунин баъдтар тавассути панели администратори худ логотипи худро бор кунед'
  };
  window.tippy('#logo_file', {
    content: logoTippyLocale[currentLocale],
    animation: 'fade'
  });


  // PHONE COUNTRY CODES PLUGIN CONNECT
  let input = document.querySelector("#phone");
  tellInput = window.intlTelInput(input, {
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
      const companyCityInput = signupForm['city-input'].value;
      const companyCityName = companyCityInput ? companyCityInput 
      : signupForm['city-select'].options[signupForm['city-select'].selectedIndex].innerText;
      
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
      const companyRegPhone = tellInput.getNumber();
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
        if (logoFile && logoFile.size > maxAllowedSize) {
          const inputLogoFile = $(signupForm['logo_file']);
          const parentContainer = inputLogoFile.parent();
          const labelError = parentContainer.find('label.error');
          labelError.show();
          labelError.html('Слишком большой файл');
          inputLogoFile.addClass('error');
          return;
        }
        
      let registerError = "";
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
          companyLogoFile: null
        });

        let userVerify = cred.user.uid;
        /* const metadata = {
          contentType: file.type
        };
        */
        //delete later
        if(logoFile){
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
        }
        
      
        // user update the logo id
        userVerificationLink();
        $('#regcompform').fadeOut('fast');
        $(this).find('.modal-reg-wrapper').trigger('reset');
        $(this).find('label.error').hide();
        $(".error").removeClass("error");
        $('.overlay-reg, #open-modal').fadeIn('slow');
      }).catch(function(error){
        registerError = error.message;
        if(error.code == "auth/email-already-in-use"){
         alert("Пользователь уже есть");
        } else {
          alert(error.message);
        }
      });

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




