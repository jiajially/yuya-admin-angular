/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.pages.work', [
        'BlurAdmin.pages.work.problem',
        'BlurAdmin.pages.work.record',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('work', {
                url: '/work',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: '工作管理',
                sidebarMeta: {
                    icon: 'ion-android-desktop',
                    order: 2,
                },
            });
    }


})();
