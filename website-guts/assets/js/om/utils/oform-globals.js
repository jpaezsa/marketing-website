w.optly.mrkt.Oform = {};

w.optly.mrkt.Oform.before = function(){

  $('body').addClass('oform-processing');

  return true;

};

w.optly.mrkt.Oform.validationError = function(element){

  w.optly.mrkt.formHadError = true;

  var elementValue = $(element).val();

  var elementHasValue = elementValue ? 'has value' : 'no value';

  w.analytics.track($(element).closest('form').attr('id') + ' ' + element.getAttribute('name') + ' error submit', {

    category: 'form error',

    label: elementHasValue,

    value: elementValue.length

  }, {

    integrations: {

      Marketo: false

    }

  });

};

w.optly.mrkt.Oform.trackLead = function(data, returnData){

  var propertyName,
  reportingObject,
  source,
  response,
  token;

  source = w.optly.mrkt.source;

  response = JSON.parse(returnData.XHR.responseText);

  if(response.token){

    token = response.token;

  } else if(response.munchkin_token){

    token = response.munchkin_token;

  } else {

    token = '';

  }

  reportingObject = {
    utm_Campaign__c: source.utm.campaign || '',
    utm_Content__c: source.utm.content || '',
    utm_Medium__c: source.utm.medium || '',
    utm_Source__c: source.utm.source || '',
    utm_Keyword__c: source.utm.keyword || '',
    otm_Campaign__c: source.otm.campaign || '',
    otm_Content__c: source.otm.content || '',
    otm_Medium__c: source.otm.medium || '',
    otm_Source__c: source.otm.source || '',
    otm_Keyword__c: source.otm.keyword || '',
    GCLID__c: source.gclid || '',
    Signup_Platform__c: source.signupPlatform || '',
    Email: response.email ? response.email : '',
    FirstName: response.first_name || '',
    LastName: response.last_name || '',
    Phone: response.phone_number || '',
    Web__c: $('input[type="checkbox"][name="web"]').is(':checked') + '',
    Mobile_Web__c: $('input[type="checkbox"][name="mobile_web"]').is(':checked') + '',
    iOS__c: $('input[type="checkbox"][name="ios"]').is(':checked') + '',
    Android__c: $('input[type="checkbox"][name="android"]').is(':checked') + ''
  };

  $.cookie('sourceCookie',
  source.utm.campaign + '|||' +
  source.utm.content + '|||' +
  source.utm.medium + '|||' +
  source.utm.source + '|||' +
  source.utm.keyword + '|||' +
  source.otm.campaign + '|||' +
  source.otm.content + '|||' +
  source.otm.medium + '|||' +
  source.otm.source + '|||' +
  source.otm.keyword + '|||' +
  source.signup_platform + '|||');

  for(propertyName in data){
    reportingObject[propertyName] = data[propertyName]; //jshint ignore:line
  }

  w.analytics.identify(response.unique_user_id, reportingObject, {
    integrations: {
      'Marketo': true
    }
  });

  /* legacy reporting - to be deprecated */

  w.analytics.track('/account/create/success', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      'Marketo': false
    }
  });

  w.Munchkin.munchkinFunction('visitWebPage', {
    url: '/account/create/success'
  });

  w.analytics.track('/account/signin', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      'Marketo': false
    }
  });
  /*
  temporarily commented out to decrease marketo queue
  w.Munchkin.munchkinFunction('visitWebPage', {
  url: '/event/account/signin'
  });
  w.Munchkin.munchkinFunction('visitWebPage', {
  url: '/event/customer/signedin'
  });
  */
  w.Munchkin.munchkinFunction('visitWebPage', {
    url: '/event/plan/null'
  });

  /* new reporting */

  w.analytics.track('account created', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      Marketo: false
    }
  });
  w.analytics.track('account signin', {
    category: 'account',
    label: window.optly.mrkt.utils.trimTrailingSlash(w.location.pathname)
  }, {
    integrations: {
      Marketo: false
    }
  });

};
