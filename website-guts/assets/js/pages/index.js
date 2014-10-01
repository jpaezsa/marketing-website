window.optly.mrkt.index = {};

window.optly.mrkt.index.testItOut = function(editURL){

  //send user to the editor
  window.location = '/edit?url=' + editURL;

};

$('input[type="text"]').focus();

$('#test-it-out-form').submit(function(e){

  var inputVal = $('test-it-out-url').val();

  if( inputVal ){

      window.optly.mrktEng.index.testItOut( inputVal );

  } else {

    $('input[type="text"]').focus();

  }

  e.preventDefault();

});


var touchHomeFormHelperInst = window.optly.mrkt.form.createAccount({formId: 'touch-homepage-create-account-form'});

var touchHomeForm = new Oform({
  selector: '#touch-homepage-create-account-form',
  customValidation: {
    password1: function(elm) {
      return touchHomeFormHelperInst.password1Validate(elm);
    },
    password2: function(elm) {
      return touchHomeFormHelperInst.password2Validate(elm);
    }
  }
});

touchHomeForm.on('before', function() {
  //set the hidden input value
  touchHomeFormHelperInst.formElm.querySelector('[name="hidden"]').value = 'touched';
  touchHomeFormHelperInst.processingAdd();
  return true;
});

touchHomeForm.on('validationerror', w.optly.mrkt.Oform.validationError);

touchHomeForm.on('validationerror', function(elm) {
  w.optly.mrkt.Oform.validationError(elm);
  touchHomeFormHelperInst.showOptionsError('Please Correct Form Errors');
});


touchHomeForm.on('load', function(e){
  touchHomeFormHelperInst.load(e);
  touchHomeFormHelperInst.processingRemove({callee: 'load'});
});

touchHomeForm.on('done', function(){
  touchHomeFormHelperInst.processingRemove({callee: 'done'});
}.bind(touchHomeFormHelperInst));
