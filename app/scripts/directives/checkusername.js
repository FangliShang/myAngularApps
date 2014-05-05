'use strict';
 
app.directive('checkUsername', function(Userservice) {
  var usernameRegexp = /^[^.$\[\]#\/\s]+$/;
 
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(viewValue) {
        if (usernameRegexp.test(viewValue)) {
              Userservice.findByUsername(viewValue).then(function(data){
                if(angular.isUndefined(data)){
                ctrl.$setValidity('taken', true);
                ctrl.$setValidity('invalid', true);
     
                return viewValue;
                } else {
                ctrl.$setValidity('taken', false);
                ctrl.$setValidity('invalid', true);
     
                return undefined;
              }
            });         
        } else {
          ctrl.$setValidity('taken', true);
          ctrl.$setValidity('invalid', false);
          return undefined;
          }
      });
    }
     
  };
});