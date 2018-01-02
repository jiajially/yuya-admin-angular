/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.routine.ecc', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('routine.ecc', {
          url: '/ecc',
          templateUrl: 'app/pages/routine/ecc/ecc.html',
          title: 'ECC系统',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
