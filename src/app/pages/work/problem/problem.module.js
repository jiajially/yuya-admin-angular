/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.work.problem', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('work.problem', {
          url: '/problem',
          templateUrl: 'app/pages/work/problem/problem.html',
          title: '问题处理',
          controller:'ProblemCtrl',
          sidebarMeta: {
            order: 500,
          },
        });
  }

})();
