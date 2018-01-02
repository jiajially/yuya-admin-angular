/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.work.problem')
      .controller('ProblemCtrl', ProblemCtrl);

  /** @ngInject */
  function ProblemCtrl($scope, $sce,$element, layoutPaths, baConfig) {
      $scope.someUrl = $sce.trustAsResourceUrl('http://service.yuya-info.com/mantis2');

      $scope.jumpTo = function (programe) {
          window.location.href=$sce.trustAsResourceUrl('http://service.yuya-info.com/'+programe);
      };



  }

})();
