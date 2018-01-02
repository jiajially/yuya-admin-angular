/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.material.system', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('material.system', {
          url: '/system',
          templateUrl: 'app/pages/material/system/system.html',
          title: '系统资料',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
