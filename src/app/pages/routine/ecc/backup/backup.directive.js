/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.routine.ecc')
      .directive('eccBackup', backup);

  /** @ngInject */
  function backup() {
    return {
      restrict: 'E',
      controller: 'eccBackupCtrl',
      templateUrl: 'app/pages/routine/ecc/backup/backup.html'
    };
  }
})();