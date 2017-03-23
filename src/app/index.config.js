(function() {
  'use strict';

  angular
    .module('spaapp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $provide) {
    // Enable log
    $logProvider.debugEnabled(true);
    
    $provide.decorator('$exceptionHandler',['$delegate',function($delegate){
        return function(exception, cause){
            $delegate(exception, cause);
            alert(exception.message);
        }
    }]);
    
    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
