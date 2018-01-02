/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.work.record', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('work.record', {
          url: '/record',
          templateUrl: 'app/pages/work/record/record.html',
          title: '工作记录',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
