/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.routine.ecc')
      .directive('eccDatabase', database);

  /** @ngInject */
  function database() {
    return {
      restrict: 'E',
      controller: 'eccDatabaseCtrl',
      templateUrl: 'app/pages/routine/ecc/database/database.html'
    };
  }
})();