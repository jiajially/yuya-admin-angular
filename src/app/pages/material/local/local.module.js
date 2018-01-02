/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.material.local', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('material.local', {
          url: '/local',
          templateUrl: 'app/pages/material/local/local.html',
          title: '本地资料',
          controller:'localCtrl',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
