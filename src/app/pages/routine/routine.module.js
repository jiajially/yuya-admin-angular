/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

    angular.module('BlurAdmin.pages.routine', [
        'BlurAdmin.pages.routine.ecc',
    ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('routine', {
                url: '/routine',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: '例行检查',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 0,
                },
            });
    }


})();
