/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.pages.material', [
        'BlurAdmin.pages.material.system',
        'BlurAdmin.pages.material.online',
        'BlurAdmin.pages.material.local',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('material', {
                url: '/material',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: '技术文档',
                sidebarMeta: {
                    icon: 'ion-ios-book-outline',
                    order: 1,
                },
            });
    }


})();
