/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.overview')
      .directive('customScript', customScript);

  /** @ngInject */
  function customScript() {
    return {
      restrict: 'E',
      controller: 'customScriptCtrl',
      controllerAs:'vm',
      templateUrl: 'app/pages/overview/customScript/customScript.html'
    };
  }
})();