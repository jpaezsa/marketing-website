var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || 'Other';
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || 'Unknown';
  },
  searchString: function (data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    var rv = dataString.indexOf('rv:');
    if (this.versionSearchString === 'Trident' && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    }
  },

  dataBrowser: [
{string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome'},
{string: navigator.userAgent, subString: 'MSIE', identity: 'Explorer'},
{string: navigator.userAgent, subString: 'Trident', identity: 'Explorer'},
{string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox'},
{string: navigator.userAgent, subString: 'Safari', identity: 'Safari'},
{string: navigator.userAgent, subString: 'Opera', identity: 'Opera'}
]

};

BrowserDetect.init();

window.optly.mrkt.browser = BrowserDetect.browser;

window.optly.mrkt.browserVersion = BrowserDetect.version;

window.optly.mrkt.automatedTest = function(){

  var uiTest, stagingDomain;

  uiTest = window.optly.mrkt.utils.getURLParameter('uiTest') === 'true';

  stagingDomain = window.location.hostname !== 'www.optimizely.com';

  if(uiTest && stagingDomain){
    return true;
  } else {
    return false;
  }

};

window.optly.mrkt.inlineFormLabels = function(){

  if(w.optly.mrkt.browser !== 'Explorer'){

    $('form.inline-labels :input').each(function(index, elem) {

      var eId = $(elem).attr('id');

      var label = null;

      if (eId && (label = $(elem).parents('form').find('label[for='+eId+']')).length === 1) {

        $(elem).attr('placeholder', $(label).html());

        $(label).addClass('hide-label');

      }

    });

  }

};
