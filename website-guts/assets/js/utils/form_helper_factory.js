window.optly.mrkt.form = window.optly.mrkt.form || {};

window.optly.mrkt.form.HelperFactory = function(scopeObj) {
  function Const() {
    this.formElm = document.getElementById(scopeObj.formId);

    if(scopeObj.dialogId) {
      this.dialogElm = document.getElementById(scopeObj.dialogId);
    }
    
    if(this.formElm.getElementsByClassName('options').length > 0) {
      this.optionsErrorElm = this.formElm.getElementsByClassName('options')[0].querySelector('p:last-child');
    }
    
    if(scopeObj.characterMessageSelector) {
      this.characterMessageElm = this.formElm.querySelector( scopeObj.characterMessageSelector );
    }

    if(scopeObj.init) {
      this[ scopeObj.init ]();
    }

    this.bodyClass = document.body.classList;
    this.inputs = Array.prototype.slice.call( this.formElm.getElementsByTagName('input') );

    this.inputs.push(this.formElm.querySelector('button[type="submit"]'));

    this.focusin();
  }

  // Remove the error classes when the user focuses on an input
  Const.prototype.focusin = function(){
    $.each(this.inputs, function(index, input) {
      if  (!!input && input.type !== 'submit') {
        $(input).on('focus', function(e) {
          var $target = $(e.target);
          $target.removeClass('error-show oform-error-show');
          $('.' + $target.attr('name') + '-related').removeClass('oform-error-show error-show');
        });
      }
    });
  };

  var defaultHelpers = {
    showOptionsError: function (message){
      if(message) {
        this.optionsErrorElm.innerHTML = message;
      }
      if(!document.body.classList.contains('error-state')) {
        document.body.classList.add('error-state');
      }
      if( !this.optionsErrorElm.classList.contains('error-show') ) {
        this.optionsErrorElm.classList.add('error-show');
      }
    },
    
    customErrorMessage: function (elm, message) {
      if(message) {
        elm.innerHTML = message;
      } else {
        elm.innerHTML = 'Required';
      }
    },

    showErrorDialog: function(message) {
      window.optly.mrkt.errorQ.push([
        'logError',
        {
          error: message ? message : 'We\'ve encoutered an unexpected error.'
        }
      ]);
    },

    addErrors: function(elmArr) {
      if(!document.body.classList.contains('error-state')) {
        document.body.classList.add('error-state');
      }
      $.each(elmArr, function(i, elm) {
        if( !elm.classList.contains('error-show') ) {
          elm.classList.add('error-show');
        }
      });
    },

    removeErrors: function(elmArr, retainBodyClass) {
      if( arguments.length === 0 || (!retainBodyClass && document.body.classList.contains('error-state')) ) {
        document.body.classList.remove('error-state');
      }
<<<<<<< HEAD
      $.each(elmArr, function(i, elm) {
        if( elm.classList.contains('error-show') ) {
          elm.classList.remove('error-show');
        }
      });
    },
=======
    },

    parseResponse: function(e) {
      var resp,
        responseSuccess = true,
        message = 'An unexpected error occurred. Please contact us if the problem persists.';

      try {
        resp = JSON.parse(e.target.responseText);
      } catch(err) {
        var action = this.formElm.getAttribute('action');
        window.analytics.track(action, {
          category: 'api error',
          label: 'response contains invalid JSON: ' + err
        });
      }

      if(e.target && e.target.status !== 200) {
        if(resp && resp.error) {
          message = resp.error;
        } 

        w.analytics.track(this.formElm.getAttribute('action'), {
          category: 'api error',
          label: 'status not 200: ' + e.target.status
        });

        responseSuccess = false;

      }

      if(responseSuccess) {
        // accounts for if there is a parse error we still want to continue with success logic
        // use an empty object for boolean logic and in case subsequent logic calls methods on the response
        return resp || {};
      } else {
        this.showOptionsError(message);
        this.processingRemove({callee: 'load'});

        return responseSuccess;
      }

    },

    redirectHelper: function(options) {
      if(window.optly.mrkt.automatedTest()) {
        if(options.bodyClass) {
          document.body.classList.add(options.bodyClass);
        }
        // iterate through data attributes and apply them to the body
        if(options.bodyData) {
          for(var dataAttr in options.bodyData) {
            document.body.dataset[dataAttr] = options.bodyData[dataAttr];
          }
        }
      } else {
        window.setTimeout(function() {
          window.location = options.redirectPath;
        }, 500);
      }
    }
>>>>>>> 125343ff64303bfc50204d39a70332046b59b43b
  
  };

  var processingHelpers = {

    handleDisable: function(disableState) {
      var inputs = this.inputs;

      if(inputs.indexOf(null) !== -1) {
        inputs.splice(inputs.indexOf(null), 1);
      }
      
      if(disableState === 'add') {
        $.each(inputs, function(i, input) {
          input.setAttribute('disabled', '');
        });
      } else if (disableState === 'remove') {
        $.each(inputs, function(i, input) {
          input.removeAttribute('disabled');
        });
      }
      
    },

    processingAdd: function(argsObj) {
      if( !this.bodyClass.contains('processing-state') ) {
        this.bodyClass.add('processing-state'); 
      }

      if(!argsObj || !argsObj.omitDisabled) {
        this.handleDisable('add');
      }

      return true;
    },

    processingRemove: function(argsObj) {
      if( this.bodyClass.contains('processing-state') ) {
        if(( argsObj && argsObj.callee === 'done' && ( this.bodyClass.contains('oform-error') || this.bodyClass.contains('error-state') ) ) || argsObj.callee == 'load' || argsObj.callee == 'error') {
          this.bodyClass.remove('processing-state');
          if(!argsObj || !argsObj.retainDisabled) {
            this.handleDisable('remove');
          }
        }
      }

      return true;
    }
  };

  $.extend(Const.prototype, processingHelpers, defaultHelpers, scopeObj.prototype);

  return new Const();

};
