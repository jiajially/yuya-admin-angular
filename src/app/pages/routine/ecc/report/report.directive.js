/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.routine.ecc')
      .directive('eccReport', report);

  /** @ngInject */
  function report() {
    return {
      restrict: 'E',
      controller: 'eccReportCtrl',
      templateUrl: 'app/pages/routine/ecc/report/report.html'
    };
  }
})();