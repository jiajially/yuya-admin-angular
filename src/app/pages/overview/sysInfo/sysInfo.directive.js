/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.overview')
      .directive('sysInfo', sysInfo);

  /** @ngInject */
  function sysInfo() {
    return {
      restrict: 'E',
      controller: 'sysInfoCtrl',
      templateUrl: 'app/pages/overview/sysInfo/sysInfo.html'
    };
  }
})();