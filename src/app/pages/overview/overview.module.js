/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.overview', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('overview', {
          url: '/overview',
          templateUrl: 'app/pages/overview/overview.html',
          title: '总览',
          sidebarMeta: {
            icon: 'ion-ios-pie-outline',
            order: 0,
          },
        });
  }

})();
